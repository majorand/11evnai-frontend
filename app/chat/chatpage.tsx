"use client";

import { useSearchParams } from "next/navigation";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import Protected from "./components/Protected";

export default function ChatPage() {
  const params = useSearchParams();
  const chatId = params.get("chat");

  return (
    <Protected>
      <div className="flex h-[85vh] border rounded-lg overflow-hidden">
        <Sidebar />
        {chatId ? (
          <div className="flex-1">
            <ChatWindow chatId={Number(chatId)} />
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            Select a chat or create a new one.
          </div>
        )}
      </div>
    </Protected>
  );
}
