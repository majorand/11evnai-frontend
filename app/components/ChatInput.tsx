"use client";

import { useState } from "react";
import { backend } from "../../lib/api";

type Sender = "user" | "ai";

export default function ChatInput({
  chatId,
  onSend,
}: {
  chatId: number;
  onSend: (msg: string, sender: Sender) => void;
}) {
  const [message, setMessage] = useState("");

  const sendMsg = async () => {
    if (!message.trim()) return;

    // optimistic user message
    onSend(message, "user");

    const formData = new FormData();
    formData.append("message", message);
    formData.append("chat_id", String(chatId)); // ✅ FIX

    const res = await backend("/chat/send", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data?.reply) {
      onSend(data.reply, "ai");
    }

    setMessage("");
  };

  return (
    <div className="flex items-center p-4 bg-white border-t">
      <input
        className="flex-1 border px-4 py-2 rounded mr-3"
        placeholder="Ask 11evnai anything…"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMsg()}
      />

      <button
        className="bg-brand text-white px-4 py-2 rounded font-semibold"
        onClick={sendMsg}
      >
        Send
      </button>
    </div>
  );
}
