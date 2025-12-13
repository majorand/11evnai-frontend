"use client";

import { useSearchParams } from "next/navigation";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import Protected from "../components/Protected";

export default function ChatPage() {
  const searchParams = useSearchParams();
  const chatId = searchParams.get("id");

  return (
    <Protected>
      <div className="flex h-screen">
        <Sidebar />
        <ChatWindow chatId={chatId} />
      </div>
    </Protected>
  );
}
