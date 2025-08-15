"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type Role = "user" | "bot";
export type ChatMessage = {
  id: string;
  role: Role;
  content: string;
  ts: number;
};

interface ChatContextShape {
  messages: ChatMessage[];
  input: string;
  isLoading: boolean;
  setInput: (v: string) => void;
  send: (text?: string) => Promise<void>;
  clear: () => void;
}

const ChatContext = createContext<ChatContextShape | null>(null);

function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

async function callChatAPI(message: string): Promise<string> {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });
  if (!res.ok) {
    throw new Error("Failed to send message");
  }
  const data = await res.json();
  return data.message as string;
}

export function ChatProvider({
  children,
  initialQuery,
  autoSend,
}: {
  children: React.ReactNode;
  initialQuery?: string | null;
  autoSend?: boolean;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState<string>(initialQuery ?? "");
  const [isLoading, setIsLoading] = useState(false);

  const clear = useCallback(() => setMessages([]), []);

  const send = useCallback(
    async (text?: string) => {
      const content = (text ?? input).trim();
      if (!content || isLoading) return;

      const userMsg: ChatMessage = {
        id: uid(),
        role: "user",
        content,
        ts: Date.now(),
      };
      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setIsLoading(true);

      try {
        const reply = await callChatAPI(content);
        const botMsg: ChatMessage = {
          id: uid(),
          role: "bot",
          content: reply,
          ts: Date.now(),
        };
        setMessages((prev) => [...prev, botMsg]);
      } catch (err) {
        const botErr: ChatMessage = {
          id: uid(),
          role: "bot",
          content: "Maaf, terjadi kesalahan. Silakan coba lagi.",
          ts: Date.now(),
        };
        setMessages((prev) => [...prev, botErr]);
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    },
    [input, isLoading]
  );

  // Auto-send support (?send=1) only if initialQuery exists
  useEffect(() => {
    if (autoSend && initialQuery && initialQuery.trim()) {
      // delay to allow mount
      setTimeout(() => {
        send(initialQuery);
      }, 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoSend, initialQuery]);

  const value = useMemo(
    () => ({ messages, input, isLoading, setInput, send, clear }),
    [messages, input, isLoading, send, clear]
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be used within ChatProvider");
  return ctx;
}
