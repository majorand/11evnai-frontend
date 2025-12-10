"use client";

import { useEffect, useState } from "react";

export default function VideoTaskList() {
  const [tasks, setTasks] = useState([]);
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    async function load() {
      const res = await fetch(`${BACKEND_URL}/video/list/demo-user`);
      const data = await res.json();
      setTasks(data);
    }
    load();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-indigo-600 mb-6">📂 My Videos</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tasks.map((t: any) => (
          <div
            key={t.task_id}
            className="border p-4 rounded shadow hover:shadow-lg transition"
          >
            <p className="font-semibold">{t.prompt}</p>
            <p className="text-sm text-gray-500 mb-2">Status: {t.status}</p>

            {t.video_url ? (
              <video src={t.video_url} controls className="w-full rounded" />
            ) : (
              <div className="h-40 bg-gray-200 rounded animate-pulse" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
