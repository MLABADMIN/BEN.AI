"use client";

import { MessageCircleIcon, Minimize2Icon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useActiveChat } from "@/hooks/use-active-chat";
import {
  initialArtifactData,
  useArtifact,
  useArtifactSelector,
} from "@/hooks/use-artifact";
import type { Attachment, ChatMessage } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Artifact } from "./artifact";
import { ChatHeader } from "./chat-header";
import { DataStreamHandler } from "./data-stream-handler";
import { submitEditedMessage } from "./message-editor";
import { Messages } from "./messages";
import { MultimodalInput } from "./multimodal-input";
import { MyLifeOSPreview } from "./my-life-os-preview";

export function ChatShell() {
  const {
    chatId,
    messages,
    setMessages,
    sendMessage,
    status,
    stop,
    regenerate,
    addToolApprovalResponse,
    input,
    setInput,
    visibilityType,
    isReadonly,
    isLoading,
    votes,
    currentModelId,
    setCurrentModelId,
    showCreditCardAlert,
    setShowCreditCardAlert,
  } = useActiveChat();

  const [editingMessage, setEditingMessage] = useState<ChatMessage | null>(
    null
  );
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [isComposerMinimised, setIsComposerMinimised] = useState(true);
  const isArtifactVisible = useArtifactSelector((state) => state.isVisible);
  const { setArtifact } = useArtifact();

  const stopRef = useRef(stop);
  stopRef.current = stop;

  const prevChatIdRef = useRef(chatId);
  useEffect(() => {
    if (prevChatIdRef.current !== chatId) {
      prevChatIdRef.current = chatId;
      stopRef.current();
      setArtifact(initialArtifactData);
      setEditingMessage(null);
      setAttachments([]);
      setIsComposerMinimised(true);
    }
  }, [chatId, setArtifact]);

  const shouldShowPreview = messages.length === 0 && !isArtifactVisible;

  useEffect(() => {
    if (!shouldShowPreview) {
      setIsComposerMinimised(false);
    }
  }, [shouldShowPreview]);

  return (
    <>
      <div className="flex h-dvh w-full flex-row overflow-hidden bg-[#030303] text-yellow-50">
        <div
          className={cn(
            "flex min-w-0 flex-col bg-black transition-[width] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
            isArtifactVisible ? "w-[40%]" : "w-full"
          )}
        >
          <ChatHeader
            chatId={chatId}
            isReadonly={isReadonly}
            selectedVisibilityType={visibilityType}
          />

          <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden border-yellow-500/20 bg-[radial-gradient(circle_at_15%_0%,rgba(234,179,8,0.14),transparent_32%),linear-gradient(180deg,#090909,#030303)] md:rounded-tl-[16px] md:border-t md:border-l">
            <div className="pointer-events-none absolute top-6 right-8 size-24 rounded-full border border-yellow-500/10 shadow-[0_0_70px_rgba(234,179,8,0.14)]" />
            <div className="pointer-events-none absolute right-16 bottom-28 h-px w-36 rotate-[-18deg] bg-gradient-to-r from-transparent via-yellow-500/25 to-transparent" />
            {shouldShowPreview && <MyLifeOSPreview />}
            <Messages
              addToolApprovalResponse={addToolApprovalResponse}
              chatId={chatId}
              isArtifactVisible={isArtifactVisible}
              isLoading={isLoading}
              isReadonly={isReadonly}
              messages={messages}
              onEditMessage={(msg) => {
                const text = msg.parts
                  ?.filter((p) => p.type === "text")
                  .map((p) => p.text)
                  .join("");
                setInput(text ?? "");
                setEditingMessage(msg);
                setIsComposerMinimised(false);
              }}
              regenerate={regenerate}
              selectedModelId={currentModelId}
              setMessages={setMessages}
              status={status}
              votes={votes}
            />

            {!isReadonly && shouldShowPreview && isComposerMinimised ? (
              <div className="pointer-events-none sticky bottom-0 z-10 flex w-full justify-center bg-gradient-to-t from-black via-black/80 to-transparent px-3 pt-8 pb-4">
                <button
                  className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-yellow-500/30 bg-black/90 px-4 py-2 font-semibold text-sm text-yellow-50 shadow-[0_18px_60px_rgba(0,0,0,0.45),0_0_38px_rgba(234,179,8,0.16)] transition hover:border-yellow-400/70 hover:bg-yellow-500/10"
                  onClick={() => setIsComposerMinimised(false)}
                  type="button"
                >
                  <MessageCircleIcon className="size-4 text-yellow-300" />
                  Open BEN.AI chat
                </button>
              </div>
            ) : (
              <div className="sticky bottom-0 z-10 mx-auto flex w-full max-w-4xl flex-col gap-2 border-yellow-500/10 border-t bg-gradient-to-t from-black via-black/95 to-transparent px-2 pt-3 pb-3 md:px-4 md:pb-4">
                {!isReadonly && shouldShowPreview && (
                  <div className="flex justify-end">
                    <button
                      className="inline-flex items-center gap-2 rounded-full border border-yellow-500/20 bg-black/65 px-3 py-1.5 font-medium text-[11px] text-yellow-100/75 transition hover:border-yellow-400/55 hover:bg-yellow-500/10 hover:text-yellow-50"
                      onClick={() => setIsComposerMinimised(true)}
                      type="button"
                    >
                      <Minimize2Icon className="size-3.5" />
                      Minimise chat
                    </button>
                  </div>
                )}
                {!isReadonly && (
                  <MultimodalInput
                    attachments={attachments}
                    chatId={chatId}
                    editingMessage={editingMessage}
                    input={input}
                    isLoading={isLoading}
                    messages={messages}
                    onCancelEdit={() => {
                      setEditingMessage(null);
                      setInput("");
                    }}
                    onModelChange={setCurrentModelId}
                    selectedModelId={currentModelId}
                    selectedVisibilityType={visibilityType}
                    sendMessage={
                      editingMessage
                        ? async () => {
                            const msg = editingMessage;
                            setEditingMessage(null);
                            await submitEditedMessage({
                              message: msg,
                              text: input,
                              setMessages,
                              regenerate,
                            });
                            setInput("");
                          }
                        : sendMessage
                    }
                    setAttachments={setAttachments}
                    setInput={setInput}
                    setMessages={setMessages}
                    status={status}
                    stop={stop}
                  />
                )}
              </div>
            )}
          </div>
        </div>

        <Artifact
          addToolApprovalResponse={addToolApprovalResponse}
          attachments={attachments}
          chatId={chatId}
          input={input}
          isReadonly={isReadonly}
          messages={messages}
          regenerate={regenerate}
          selectedModelId={currentModelId}
          selectedVisibilityType={visibilityType}
          sendMessage={sendMessage}
          setAttachments={setAttachments}
          setInput={setInput}
          setMessages={setMessages}
          status={status}
          stop={stop}
          votes={votes}
        />
      </div>

      <DataStreamHandler />

      <AlertDialog
        onOpenChange={setShowCreditCardAlert}
        open={showCreditCardAlert}
      >
        <AlertDialogContent className="border-yellow-500/25 bg-black text-yellow-50">
          <AlertDialogHeader>
            <AlertDialogTitle>Connect BEN.AI chat</AlertDialogTitle>
            <AlertDialogDescription className="text-yellow-100/65">
              BEN.AI can use Vercel AI Gateway or a direct provider key such as
              OpenAI. The current deployment is asking for Gateway activation,
              so chat needs the owner to connect billing/API access or switch the
              route to a direct OpenAI key before visitors can use live replies.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-yellow-500/20 bg-black text-yellow-50 hover:bg-yellow-500/10">
              Stay here
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-yellow-400 text-black hover:bg-yellow-300"
              onClick={() => {
                window.open(
                  "https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai%3Fmodal%3Dadd-credit-card",
                  "_blank"
                );
              }}
            >
              Open Gateway setup
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
