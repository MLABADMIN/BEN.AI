"use client";

import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from "../ai-elements/reasoning";

type MessageReasoningProps = {
  isLoading: boolean;
  reasoning: string;
};

export function MessageReasoning({
  isLoading,
  reasoning,
}: MessageReasoningProps) {
  return (
    <Reasoning
      data-testid="message-reasoning"
      defaultOpen={false}
      isStreaming={isLoading}
    >
      <ReasoningTrigger
        getThinkingMessage={(isStreaming, duration) => {
          if (isStreaming) {
            return <p>BEN.AI is working</p>;
          }

          if (duration === undefined || duration === 0) {
            return <p>View reasoning details</p>;
          }

          return <p>View reasoning details — {duration}s</p>;
        }}
      />
      <ReasoningContent>{reasoning}</ReasoningContent>
    </Reasoning>
  );
}
