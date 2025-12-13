"use client";

import { useState } from "react";
import { backend } from "../../lib/api";

export default function ChatInput({
  onSend,
}: {
  onSend: (msg: string, reply: string) => void;
}) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const send = async () => {
    if (!message.trim()) return;

    setLoading(true);

    const res = await backend("/chat/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();

    onSend(message, data.reply);
    setMessage("");
    setLoading(false);
  };

  return (
    <div className="flex gap-2">
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-1 border rounded px-3 py-2"
        placeholder="Say something…"
      />
      <button
        onClick={send}
        disabled={loading}
        className="bg-black text-white px-4 rounded"
      >
        {loading ? "…" : "Send"}
      </button>
    </div>
  );
}
