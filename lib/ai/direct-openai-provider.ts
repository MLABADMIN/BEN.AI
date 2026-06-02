import type {
  LanguageModelV3,
  LanguageModelV3CallOptions,
  LanguageModelV3Content,
  LanguageModelV3FinishReason,
  LanguageModelV3StreamPart,
  LanguageModelV3Usage,
} from "@ai-sdk/provider";

const OPENAI_CHAT_COMPLETIONS_URL =
  "https://api.openai.com/v1/chat/completions";
const DEFAULT_OPENAI_MODEL = "gpt-4o-mini";

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
        .map((item: any) =>
          item.type === "text" ? item.text : "[tool content]"
        )
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

      const content = message.content
        .map(partToText)
        .filter(Boolean)
        .join("\n");

      if (message.role === "assistant") {
        return { role: "assistant" as const, content };
      }

      return { role: "user" as const, content };
    })
    .filter((message) => message.content.trim().length > 0);
}

function buildRequestBody(
  options: LanguageModelV3CallOptions,
  stream: boolean
) {
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

export function createDirectOpenAIModel(): LanguageModelV3 {
  const modelId = directOpenAIModelId();

  return {
    specificationVersion: "v3",
    provider: "openai-direct",
    modelId,
    supportedUrls: {},
    async doGenerate(options) {
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
    },
    async doStream(options) {
      const requestBody = buildRequestBody(options, true);
      const response = await fetchOpenAI(requestBody, options.abortSignal);
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      const textId = "openai-text";

      if (!reader) {
        throw new Error("OpenAI stream response did not include a body");
      }

      let buffer = "";
      let metadataSent = false;
      let finishReason: LanguageModelV3FinishReason = {
        unified: "stop",
        raw: undefined,
      };
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
                    controller.enqueue({
                      type: "text-delta",
                      id: textId,
                      delta,
                    });
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
          } catch (error) {
            controller.enqueue({ type: "error", error });
            controller.error(error);
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
