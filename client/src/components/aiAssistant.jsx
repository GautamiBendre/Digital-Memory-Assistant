import { useEffect, useRef, useState } from "react";
import {
  MdClose,
  MdSend,
  MdSmartToy,
  MdDeleteOutline,
  MdMinimize,
  MdRefresh,
} from "react-icons/md";

const API_URL = "http://localhost:5000/api/chatbot";

/*
  ============================================================
  INLINE TEXT FORMATTER
  ============================================================
*/

const renderInlineText = (text) => {
  const parts = text.split(
    /(\*\*[^*]+\*\*|https?:\/\/[^\s)\]]+)/g
  );

  return parts.map((part, index) => {
    if (!part) return null;

    // Bold text
    if (
      part.startsWith("**") &&
      part.endsWith("**")
    ) {
      return (
        <strong key={index}>
          {part.slice(2, -2)}
        </strong>
      );
    }

    // URL
    if (
      part.startsWith("http://") ||
      part.startsWith("https://")
    ) {
      const cleanUrl = part.replace(/[.,;:]+$/, "");

      return (
        <a
          key={index}
          href={cleanUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-violet-600 underline underline-offset-2 hover:text-violet-800"
        >
          {cleanUrl}
        </a>
      );
    }

    return (
      <span key={index}>
        {part}
      </span>
    );
  });
};

/*
  ============================================================
  CLEAN GEMINI RESPONSE
  ============================================================
*/

const cleanMessage = (message) => {
  if (!message) return "";

  return message
    // Convert markdown links into plain URLs
    .replace(
      /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g,
      "$2"
    )

    // Remove accidental brackets around URLs
    .replace(
      /\[?(https?:\/\/[^\s\]]+)\]?/g,
      "$1"
    )

    // Remove empty markdown headings
    .replace(/###\s*$/gm, "")

    .trim();
};

/*
  ============================================================
  MESSAGE CONTENT
  ============================================================
*/

const MessageContent = ({ content }) => {
  const cleanedContent = cleanMessage(content);

  const lines = cleanedContent.split("\n");

  return (
    <div className="space-y-1.5 text-[13px] leading-6 text-slate-700">
      {lines.map((line, index) => {
        const trimmedLine = line.trim();

        // Empty line
        if (!trimmedLine) {
          return (
            <div
              key={index}
              className="h-1"
            />
          );
        }

        // Heading
        if (trimmedLine.startsWith("### ")) {
          return (
            <h3
              key={index}
              className="mt-3 text-[13px] font-bold text-slate-900 first:mt-0"
            >
              {renderInlineText(
                trimmedLine.replace(
                  /^###\s*/,
                  ""
                )
              )}
            </h3>
          );
        }

        // Bullet point
        if (
          trimmedLine.startsWith("- ") ||
          trimmedLine.startsWith("• ")
        ) {
          return (
            <div
              key={index}
              className="flex items-start gap-2"
            >
              <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />

              <span className="min-w-0">
                {renderInlineText(
                  trimmedLine.replace(
                    /^[-•]\s*/,
                    ""
                  )
                )}
              </span>
            </div>
          );
        }

        // Numbered list
        const numberedMatch =
          trimmedLine.match(
            /^(\d+)\.\s+(.*)$/
          );

        if (numberedMatch) {
          return (
            <div
              key={index}
              className="flex items-start gap-2"
            >
              <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-violet-100 text-[10px] font-bold text-violet-700">
                {numberedMatch[1]}
              </span>

              <span className="min-w-0">
                {renderInlineText(
                  numberedMatch[2]
                )}
              </span>
            </div>
          );
        }

        // Normal paragraph
        return (
          <p key={index}>
            {renderInlineText(trimmedLine)}
          </p>
        );
      })}
    </div>
  );
};

/*
  ============================================================
  MEMORYVAULT ASSISTANT
  ============================================================
*/

export default function MemoryVaultAssistant() {
  const [isOpen, setIsOpen] = useState(false);

  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "assistant",
      content:
        "Hi! I'm MemoryVault Assistant 👋\n\nI can help you with your stored documents, expiry dates, renewals, required documents and Indian document processes.",
    },
  ]);

  const [input, setInput] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef(null);

  const inputRef = useRef(null);

  /*
    ==========================================================
    OPEN ASSISTANT FROM QUICK ACTIONS
    ==========================================================
  */

  useEffect(() => {
    const openAssistant = () => {
      setIsOpen(true);
    };

    window.addEventListener(
      "open-memoryvault-assistant",
      openAssistant
    );

    return () => {
      window.removeEventListener(
        "open-memoryvault-assistant",
        openAssistant
      );
    };
  }, []);

  /*
    ==========================================================
    AUTO SCROLL
    ==========================================================
  */

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [
    messages,
    isLoading,
    isOpen,
  ]);

  /*
    ==========================================================
    AUTO FOCUS
    ==========================================================
  */

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  /*
    ==========================================================
    SEND MESSAGE
    ==========================================================
  */

  const sendMessage = async (
    messageText = input
  ) => {
    const message = messageText.trim();

    if (!message || isLoading) {
      return;
    }

    const userMessage = {
      id: Date.now(),
      role: "user",
      content: message,
    };

    setMessages((current) => [
      ...current,
      userMessage,
    ]);

    setInput("");
    setIsLoading(true);

    try {
      const token =
        localStorage.getItem("token");

      if (!token) {
        throw new Error(
          "Your session has expired. Please log in again."
        );
      }

      const response = await fetch(
        API_URL,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            message,
          }),
        }
      );

      const data =
        await response.json();

      if (
        !response.ok ||
        !data.success
      ) {
        throw new Error(
          data.message ||
            "Unable to get a response from the assistant."
        );
      }

      const assistantMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content:
          data.reply ||
          "I couldn't generate a response right now.",
      };

      setMessages((current) => [
        ...current,
        assistantMessage,
      ]);
    } catch (error) {
      console.error(
        "MemoryVault Assistant Error:",
        error
      );

      setMessages((current) => [
        ...current,
        {
          id: Date.now() + 1,
          role: "error",
          content:
            error.message ||
            "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  /*
    ==========================================================
    KEYBOARD HANDLER
    ==========================================================
  */

  const handleKeyDown = (event) => {
    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();

      sendMessage();
    }
  };

  /*
    ==========================================================
    CLEAR CHAT
    ==========================================================
  */

  const clearChat = () => {
    setMessages([
      {
        id: Date.now(),
        role: "assistant",
        content:
          "Chat cleared. How can I help you with your documents? 😊",
      },
    ]);
  };

  /*
    ==========================================================
    SUGGESTIONS
    ==========================================================
  */

  const suggestions = [
    "What documents do I have?",
    "Which documents need attention?",
    "Which document should I renew first?",
  ];

  return (
    <>
      {/* ====================================================
          FLOATING ROBOT BUTTON
          ==================================================== */}

      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-[100] flex h-14 w-14 items-center justify-center rounded-full bg-violet-600 text-white shadow-lg shadow-violet-200 transition-all duration-200 hover:-translate-y-1 hover:bg-violet-700 hover:shadow-xl"
          aria-label="Open MemoryVault Assistant"
          title="MemoryVault Assistant"
        >
          <MdSmartToy className="text-2xl" />
        </button>
      )}

      {/* ====================================================
          CHAT WINDOW
          ==================================================== */}

      {isOpen && (
        <div className="fixed bottom-5 right-5 z-[100] flex h-[min(680px,calc(100vh-40px))] w-[min(420px,calc(100vw-32px))] flex-col overflow-hidden rounded-2xl border border-[#E8E1F3] bg-white shadow-2xl shadow-violet-200/40">
          {/* ==================================================
              HEADER
              ================================================== */}

          <div className="flex shrink-0 items-center justify-between bg-violet-600 px-4 py-3.5 text-white">
            <div className="flex min-w-0 items-center gap-3">
              <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15">
                <MdSmartToy className="text-xl" />

                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-violet-600 bg-emerald-400" />
              </div>

              <div className="min-w-0">
                <h2 className="truncate text-sm font-bold">
                  MemoryVault Assistant
                </h2>

                <p className="mt-0.5 text-[10px] text-violet-100">
                  Your document & renewal assistant
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {/* Clear */}
              <button
                type="button"
                onClick={clearChat}
                title="Clear chat"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-violet-100 transition hover:bg-white/10 hover:text-white"
              >
                <MdDeleteOutline className="text-lg" />
              </button>

              {/* Minimize */}
              <button
                type="button"
                onClick={() =>
                  setIsOpen(false)
                }
                title="Minimize"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-violet-100 transition hover:bg-white/10 hover:text-white"
              >
                <MdMinimize className="text-lg" />
              </button>

              {/* Close */}
              <button
                type="button"
                onClick={() =>
                  setIsOpen(false)
                }
                title="Close"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-violet-100 transition hover:bg-white/10 hover:text-white"
              >
                <MdClose className="text-lg" />
              </button>
            </div>
          </div>

          {/* ==================================================
              CHAT BODY
              ================================================== */}

          <div className="min-h-0 flex-1 overflow-y-auto bg-[#FBF9FF] px-4 py-4">
            {/* Suggested questions */}

            {messages.length === 1 && (
              <div className="mb-5">
                <p className="mb-3 text-center text-[11px] font-medium text-slate-400">
                  Try asking
                </p>

                <div className="space-y-2">
                  {suggestions.map(
                    (suggestion) => (
                      <button
                        key={suggestion}
                        type="button"
                        onClick={() =>
                          sendMessage(
                            suggestion
                          )
                        }
                        disabled={isLoading}
                        className="w-full rounded-xl border border-[#EAE4F4] bg-white px-3 py-2.5 text-left text-[11px] font-medium text-slate-600 shadow-sm transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {suggestion}
                      </button>
                    )
                  )}
                </div>
              </div>
            )}

            {/* Messages */}

            <div className="space-y-4">
              {messages.map(
                (message) => {
                  const isUser =
                    message.role ===
                    "user";

                  const isError =
                    message.role ===
                    "error";

                  return (
                    <div
                      key={message.id}
                      className={`flex ${
                        isUser
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`flex max-w-[88%] items-end gap-2 ${
                          isUser
                            ? "flex-row-reverse"
                            : "flex-row"
                        }`}
                      >
                        {/* Assistant avatar */}

                        {!isUser && (
                          <div
                            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                              isError
                                ? "bg-red-100 text-red-500"
                                : "bg-violet-100 text-violet-600"
                            }`}
                          >
                            {isError ? (
                              <MdRefresh className="text-base" />
                            ) : (
                              <MdSmartToy className="text-base" />
                            )}
                          </div>
                        )}

                        {/* Message */}

                        <div
                          className={`rounded-2xl px-3.5 py-3 shadow-sm ${
                            isUser
                              ? "rounded-br-md bg-violet-600 text-white"
                              : isError
                                ? "rounded-bl-md border border-red-100 bg-red-50"
                                : "rounded-bl-md border border-[#EAE4F4] bg-white"
                          }`}
                        >
                          {isUser ? (
                            <p className="whitespace-pre-wrap text-[13px] leading-5 text-white">
                              {
                                message.content
                              }
                            </p>
                          ) : (
                            <MessageContent
                              content={
                                message.content
                              }
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  );
                }
              )}

              {/* ==================================================
                  LOADING
                  ================================================== */}

              {isLoading && (
                <div className="flex items-end gap-2">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-100 text-violet-600">
                    <MdSmartToy className="text-base" />
                  </div>

                  <div className="rounded-2xl rounded-bl-md border border-[#EAE4F4] bg-white px-4 py-3 shadow-sm">
                    <div className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-violet-400 [animation-delay:-0.3s]" />

                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-violet-400 [animation-delay:-0.15s]" />

                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-violet-400" />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* ==================================================
              INPUT
              ================================================== */}

          <div className="shrink-0 border-t border-[#ECE8F7] bg-white p-3">
            <div className="flex items-end gap-2 rounded-2xl border border-[#E5DFF0] bg-[#FCFAFF] p-2 transition focus-within:border-violet-300 focus-within:ring-2 focus-within:ring-violet-100">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(event) =>
                  setInput(
                    event.target.value
                  )
                }
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                rows={1}
                placeholder="Ask about your documents..."
                className="max-h-24 min-h-[40px] flex-1 resize-none border-none bg-transparent px-2 py-2 text-[13px] text-slate-700 outline-none placeholder:text-slate-400 disabled:cursor-not-allowed"
              />

              <button
                type="button"
                onClick={() =>
                  sendMessage()
                }
                disabled={
                  !input.trim() ||
                  isLoading
                }
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-600 text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-violet-200"
                aria-label="Send message"
              >
                <MdSend className="text-lg" />
              </button>
            </div>

            <p className="mt-2 text-center text-[9px] text-slate-400">
              MemoryVault Assistant • Press
              Enter to send
            </p>
          </div>
        </div>
      )}
    </>
  );
}