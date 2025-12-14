"use client";

import { useState } from "react";
import { backend } from "../../lib/api";

type ChatInputProps = {
  chatId: number;
  onSend: (content: string, sender?: "user" | "ai") => void;
};

export default function ChatInput({ chatId, onSend }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  async function send() {
    if (!message.trim() || sending) return;

    const content = message;
    setMessage("");
    setSending(true);

    onSend(content, "user");

    const formData = new FormData();
    formData.append("message", content);
    formData.append("chat_id", String(chatId));

    try {
      const res = await backend("/chat/send", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data?.reply) {
        onSend(data.reply, "ai");
      }
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="flex gap-2 p-3 border-t">
      <input
        className="flex-1 border rounded px-3 py-2"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message…"
        onKeyDown={(e) => e.key === "Enter" && send()}
      />
      <button
        onClick={send}
        disabled={sending}
        className="px-4 py-2 bg-black text-white rounded disabled:opacity-50"
      >
        Send
      </button>
    </div>
  );
}
