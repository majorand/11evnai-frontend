"use client";

import ChatInput from "../components/ChatInput";
import { useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);

  return (
    <div className="max-w-3xl mx-auto mt-10 space-y-4">
      <div className="border rounded p-4 min-h-[400px] space-y-3">
        {messages.map((m, i) => (
          <div
            key={i}
            className={m.role === "user" ? "text-right" : "text-left"}
          >
            <span className="inline-block px-3 py-2 rounded bg-gray-200">
              {m.content}
            </span>
          </div>
        ))}
      </div>

      <ChatInput
        onSend={(msg, reply) =>
          setMessages((prev) => [
            ...prev,
            { role: "user", content: msg },
            { role: "assistant", content: reply },
          ])
        }
      />
    </div>
  );
}
