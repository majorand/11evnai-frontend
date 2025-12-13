"use client";

import { useEffect, useState } from "react";
import { backend } from "../../lib/api";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const [chats, setChats] = useState([]);
  const router = useRouter();

  const loadChats = async () => {
    const res = await backend("/chat/list");
    const data = await res.json();
    setChats(data.chats);
  };

  useEffect(() => {
    loadChats();
  }, []);

  const newChat = async () => {
    const res = await backend("/chat/new", { method: "POST" });
    const data = await res.json();
    router.push(`/chat?chat=${data.chat_id}`);
  };

  return (
    <aside className="w-64 bg-white border-r p-4 overflow-y-auto">
      <button
        onClick={newChat}
        className="w-full bg-brand text-white py-2 rounded mb-4 font-semibold"
      >
        + New Chat
      </button>

      <div className="space-y-2">
        {chats.map((c: any) => (
          <div
            key={c.id}
            className="p-3 bg-gray-100 rounded cursor-pointer hover:bg-gray-200"
            onClick={() => router.push(`/chat?chat=${c.id}`)}
          >
            {c.title || "Untitled Chat"}
          </div>
        ))}
      </div>
    </aside>
  );
}
