"use client";

import { useSearchParams } from "next/navigation";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import Protected from "./components/Protected";

export default function ChatPage() {
  const searchParams = useSearchParams();
  const chatIdParam = searchParams.get("id");

  const chatId =
    chatIdParam && !Number.isNaN(Number(chatIdParam))
      ? Number(chatIdParam)
      : null;

  return (
    <Protected>
      <div className="flex h-screen">
        <Sidebar />
        {chatId !== null ? (
          <ChatWindow chatId={chatId} />
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a chat
          </div>
        )}
      </div>
    </Protected>
  );
}
