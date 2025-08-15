"use client";

import Image from "next/image";
import { useChat } from "./chat-provider";

export default function Textbox() {
  const { input, setInput, send, isLoading } = useChat();

  const handleSend = () => {
    send();
    // Force scroll after sending
    setTimeout(() => {
      const chatContainer = document.querySelector(".overflow-auto");
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    }, 100);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="relative bottom-0 max-w-4xl mx-auto">
      <textarea
        className="w-full bg-white/15 backdrop-blur-md text-white rounded-2xl h-32 border-none outline-none resize-none pr-14 p-4 placeholder:text-white/70 text-sm sm:text-base focus:bg-white/20 transition-colors"
        placeholder="Ketik pesan Anda di sini..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
      />
      <button
        type="button"
        onClick={handleSend}
        disabled={!input.trim() || isLoading}
        aria-label="Kirim"
        className="absolute right-3 bottom-3 bg-primary-dark hover:bg-primary-dark disabled:bg-gray-400 disabled:cursor-not-allowed rounded-full p-2 text-white transition-colors"
      >
        <Image src="/icons/send.svg" alt="Kirim" width={20} height={20} />
      </button>
    </div>
  );
}
