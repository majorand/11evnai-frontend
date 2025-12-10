"use client";

import { useEffect, useState, useRef } from "react";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import PersonalitySelector from "./PersonalitySelector";
import { backend } from "../../lib/api";

export default function ChatWindow({ chatId }: { chatId: number }) {
  const [messages, setMessages] = useState<any[]>([]);
  const [personality, setPersonality] = useState<number | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const loadHistory = async () => {
    const res = await backend(`/chat/history?chat_id=${chatId}`);
    const data = await res.json();
    setMessages(data.messages);
  };

  const addMsg = (content: string, sender: "user" | "ai" = "user") => {
    setMessages((m) => [...m, { content, sender }]);
  };

  useEffect(() => {
    loadHistory();
  }, [chatId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-3 border-b bg-white flex justify-between items-center">
        <h2 className="font-semibold">Chat {chatId}</h2>
        <PersonalitySelector onSelect={setPersonality} />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {messages.map((m, i) => (
          <MessageBubble key={i} sender={m.sender} content={m.content} />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <ChatInput chatId={chatId} onSend={addMsg} />
    </div>
  );
}
