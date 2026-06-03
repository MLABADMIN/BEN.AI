import type {
  LanguageModelV3,
  LanguageModelV3CallOptions,
  LanguageModelV3Content,
  LanguageModelV3FinishReason,
  LanguageModelV3StreamPart,
  LanguageModelV3Usage,
} from "@ai-sdk/provider";

const OPENAI_CHAT_COMPLETIONS_URL = "https://api.openai.com/v1/chat/completions";
const DEFAULT_OPENAI_MODEL = "gpt-4o-mini";
const FALLBACK_MODEL_ID = "ben-ai-setup-mode";

type OpenAIChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

type OpenAIUsage = {
  prompt_tokens?: number;
  completion_tokens?: number;
  total_tokens?: number;
};

type OpenAIChatCompletion = {
  id?: string;
  model?: string;
  choices?: Array<{
    message?: { content?: string | null };
    finish_reason?: string | null;
  }>;
  usage?: OpenAIUsage;
};

type OpenAIStreamChunk = {
  id?: string;
  model?: string;
  choices?: Array<{
    delta?: { content?: string | null };
    finish_reason?: string | null;
  }>;
  usage?: OpenAIUsage;
};

function directOpenAIModelId() {
  return (
    process.env.OPENAI_CHAT_MODEL ||
    process.env.OPENAI_MODEL ||
    DEFAULT_OPENAI_MODEL
  );
}

function toUsage(usage?: OpenAIUsage): LanguageModelV3Usage {
  return {
    inputTokens: {
      total: usage?.prompt_tokens,
      noCache: undefined,
      cacheRead: undefined,
      cacheWrite: undefined,
    },
    outputTokens: {
      total: usage?.completion_tokens,
      text: usage?.completion_tokens,
      reasoning: undefined,
    },
    raw: usage
      ? {
          prompt_tokens: usage.prompt_tokens,
          completion_tokens: usage.completion_tokens,
          total_tokens: usage.total_tokens,
        }
      : undefined,
  };
}

function fallbackUsage(text: string): LanguageModelV3Usage {
  return {
    inputTokens: {
      total: undefined,
      noCache: undefined,
      cacheRead: undefined,
      cacheWrite: undefined,
    },
    outputTokens: {
      total: text.length,
      text: text.length,
      reasoning: undefined,
    },
    raw: { mode: FALLBACK_MODEL_ID },
  };
}

function normaliseFinishReason(
  reason?: string | null
): LanguageModelV3FinishReason {
  if (reason === "length") {
    return { unified: "length", raw: reason };
  }
  if (reason === "content_filter") {
    return { unified: "content-filter", raw: reason };
  }
  if (reason === "tool_calls" || reason === "function_call") {
    return { unified: "tool-calls", raw: reason };
  }
  if (reason === "error") {
    return { unified: "error", raw: reason };
  }
  return { unified: "stop", raw: reason ?? undefined };
}

function partToText(part: any) {
  if (typeof part === "string") {
    return part;
  }

  if (part.type === "text" || part.type === "reasoning") {
    return part.text;
  }

  if (part.type === "file") {
    return part.filename
      ? `[File attached: ${part.filename} (${part.mediaType})]`
      : `[File attached: ${part.mediaType}]`;
  }

  if (part.type === "tool-call") {
    return `[Tool requested: ${part.toolName}]`;
  }

  if (part.type === "tool-result") {
    const output = part.output;
    if (output.type === "text") {
      return output.value;
    }
    if (output.type === "json") {
      return JSON.stringify(output.value);
    }
    if (output.type === "content") {
      return output.value
        .map((item: any) => (item.type === "text" ? item.text : "[tool content]"))
        .join("\n");
    }
    return `[Tool result: ${output.type}]`;
  }

  return "";
}

function promptToOpenAIChatMessages(
  prompt: LanguageModelV3CallOptions["prompt"]
): OpenAIChatMessage[] {
  return prompt
    .map((message) => {
      if (message.role === "system") {
        return { role: "system" as const, content: message.content };
      }

      const content = message.content.map(partToText).filter(Boolean).join("\n");

      if (message.role === "assistant") {
        return { role: "assistant" as const, content };
      }

      return { role: "user" as const, content };
    })
    .filter((message) => message.content.trim().length > 0);
}

function latestUserMessage(prompt: LanguageModelV3CallOptions["prompt"]) {
  const messages = promptToOpenAIChatMessages(prompt);
  return [...messages].reverse().find((message) => message.role === "user")?.content ?? "";
}

function setupModeReply(prompt: LanguageModelV3CallOptions["prompt"]) {
  const userText = latestUserMessage(prompt).toLowerCase();
  const topic = userText.includes("travel")
    ? "travel"
    : userText.includes("business")
      ? "business"
      : userText.includes("learn") || userText.includes("course")
        ? "learning"
        : userText.includes("wealth") || userText.includes("money")
          ? "wealth"
          : userText.includes("community")
            ? "community"
            : "MLAB";

  const nextStep =
    topic === "travel"
      ? "Tell me the destination or the kind of trip you are thinking about."
      : topic === "business"
        ? "Tell me the idea or task you want to turn into a plan."
        : topic === "learning"
          ? "Tell me the skill or subject you want to build."
          : topic === "wealth"
            ? "Tell me whether you want budgeting, saving, offers, rewards, or planning support."
            : topic === "community"
              ? "Tell me whether this is about support, events, citizenship, belonging, or the MLAB network."
              : "Choose one lane: Travel, Learning, Business, Wealth, or Community.";

  return `I am BEN.AI and I am online in setup mode.\n\nFull AI chat needs an active OpenAI key or Vercel AI Gateway credits. Until that is connected, I can still guide users calmly through the MLAB lanes and explain what to do next without showing a broken error.\n\nFor ${topic}, the next useful step is: ${nextStep}\n\nI will keep this simple: one step at a time.`;
}

function buildRequestBody(options: LanguageModelV3CallOptions, stream: boolean) {
  return {
    model: directOpenAIModelId(),
    messages: promptToOpenAIChatMessages(options.prompt),
    stream,
    temperature: options.temperature,
    top_p: options.topP,
    presence_penalty: options.presencePenalty,
    frequency_penalty: options.frequencyPenalty,
    max_completion_tokens: options.maxOutputTokens,
    stop: options.stopSequences,
    ...(options.responseFormat?.type === "json" && {
      response_format: { type: "json_object" },
    }),
    ...(stream && { stream_options: { include_usage: true } }),
  };
}

async function fetchOpenAI(body: unknown, signal?: AbortSignal) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not configured");
  }

  const response = await fetch(OPENAI_CHAT_COMPLETIONS_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
    signal,
  });

  if (!response.ok) {
    const details = await response.text().catch(() => "");
    throw new Error(
      `OpenAI chat completion failed (${response.status}): ${details}`
    );
  }

  return response;
}

function sseLinesFromChunk(chunk: string) {
  return chunk
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("data: "))
    .map((line) => line.slice(6));
}

export function createSetupModeModel(): LanguageModelV3 {
  return {
    specificationVersion: "v3",
    provider: "ben-ai-setup",
    modelId: FALLBACK_MODEL_ID,
    supportedUrls: {},
    async doGenerate(options) {
      const text = setupModeReply(options.prompt);
      const content: LanguageModelV3Content[] = [{ type: "text", text }];
      return {
        content,
        finishReason: { unified: "stop", raw: "setup-mode" },
        usage: fallbackUsage(text),
        request: { body: { mode: FALLBACK_MODEL_ID } },
        response: {
          id: `setup-${Date.now()}`,
          modelId: FALLBACK_MODEL_ID,
          timestamp: new Date(),
          headers: {},
          body: { mode: FALLBACK_MODEL_ID },
        },
        warnings: [],
      };
    },
    async doStream(options) {
      const text = setupModeReply(options.prompt);
      const textId = "ben-ai-setup-text";
      const stream = new ReadableStream<LanguageModelV3StreamPart>({
        start(controller) {
          controller.enqueue({ type: "stream-start", warnings: [] });
          controller.enqueue({
            type: "response-metadata",
            id: `setup-${Date.now()}`,
            timestamp: new Date(),
            modelId: FALLBACK_MODEL_ID,
          });
          controller.enqueue({ type: "text-start", id: textId });
          controller.enqueue({ type: "text-delta", id: textId, delta: text });
          controller.enqueue({ type: "text-end", id: textId });
          controller.enqueue({
            type: "finish",
            usage: fallbackUsage(text),
            finishReason: { unified: "stop", raw: "setup-mode" },
          });
          controller.close();
        },
      });

      return {
        stream,
        request: { body: { mode: FALLBACK_MODEL_ID } },
        response: { headers: {} },
      };
    },
  };
}

export function createDirectOpenAIModel(): LanguageModelV3 {
  const modelId = directOpenAIModelId();

  return {
    specificationVersion: "v3",
    provider: "openai-direct",
    modelId,
    supportedUrls: {},
    async doGenerate(options) {
      try {
        const requestBody = buildRequestBody(options, false);
        const response = await fetchOpenAI(requestBody, options.abortSignal);
        const json = (await response.json()) as OpenAIChatCompletion;
        const text = json.choices?.[0]?.message?.content ?? "";
        const content: LanguageModelV3Content[] = [{ type: "text", text }];

        return {
          content,
          finishReason: normaliseFinishReason(json.choices?.[0]?.finish_reason),
          usage: toUsage(json.usage),
          request: { body: requestBody },
          response: {
            id: json.id,
            modelId: json.model ?? modelId,
            timestamp: new Date(),
            headers: Object.fromEntries(response.headers.entries()),
            body: json,
          },
          warnings: [],
        };
      } catch (_) {
        return createSetupModeModel().doGenerate(options);
      }
    },
    async doStream(options) {
      const requestBody = buildRequestBody(options, true);

      let response: Response;
      try {
        response = await fetchOpenAI(requestBody, options.abortSignal);
      } catch (_) {
        return createSetupModeModel().doStream(options);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      const textId = "openai-text";

      if (!reader) {
        return createSetupModeModel().doStream(options);
      }

      let buffer = "";
      let metadataSent = false;
      let finishReason: LanguageModelV3FinishReason = { unified: "stop", raw: undefined };
      let usage: OpenAIUsage | undefined;

      const stream = new ReadableStream<LanguageModelV3StreamPart>({
        async start(controller) {
          controller.enqueue({ type: "stream-start", warnings: [] });
          controller.enqueue({ type: "text-start", id: textId });

          try {
            while (true) {
              const { done, value } = await reader.read();
              if (done) {
                break;
              }

              buffer += decoder.decode(value, { stream: true });
              const events = buffer.split("\n\n");
              buffer = events.pop() ?? "";

              for (const event of events) {
                for (const line of sseLinesFromChunk(event)) {
                  if (line === "[DONE]") {
                    continue;
                  }

                  const chunk = JSON.parse(line) as OpenAIStreamChunk;

                  if (!metadataSent) {
                    metadataSent = true;
                    controller.enqueue({
                      type: "response-metadata",
                      id: chunk.id,
                      timestamp: new Date(),
                      modelId: chunk.model ?? modelId,
                    });
                  }

                  const delta = chunk.choices?.[0]?.delta?.content;
                  if (delta) {
                    controller.enqueue({ type: "text-delta", id: textId, delta });
                  }

                  const chunkFinishReason = chunk.choices?.[0]?.finish_reason;
                  if (chunkFinishReason) {
                    finishReason = normaliseFinishReason(chunkFinishReason);
                  }

                  if (chunk.usage) {
                    usage = chunk.usage;
                  }
                }
              }
            }

            controller.enqueue({ type: "text-end", id: textId });
            controller.enqueue({
              type: "finish",
              usage: toUsage(usage),
              finishReason,
            });
            controller.close();
          } catch (_) {
            const fallback = setupModeReply(options.prompt);
            controller.enqueue({ type: "text-delta", id: textId, delta: fallback });
            controller.enqueue({ type: "text-end", id: textId });
            controller.enqueue({
              type: "finish",
              usage: fallbackUsage(fallback),
              finishReason: { unified: "stop", raw: "setup-mode" },
            });
            controller.close();
          }
        },
      });

      return {
        stream,
        request: { body: requestBody },
        response: { headers: Object.fromEntries(response.headers.entries()) },
      };
    },
  };
}
