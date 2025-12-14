"use client";

import { useState, useEffect } from "react";

export default function VideoGeneratorPage() {
  const [prompt, setPrompt] = useState("");
  const [taskId, setTaskId] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("idle");
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [polling, setPolling] = useState(false);
  const [progress, setProgress] = useState(0);

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  // -------------------------------
  // Pre-made templates
  // -------------------------------
  const templates = [
    {
      title: "TikTok Trend",
      prompt: "Fast-paced, upbeat TikTok style video with smooth transitions, text overlays and a trendy aesthetic. Bright lighting and punchy music style.",
    },
    {
      title: "Cinematic Movie Shot",
      prompt: "A cinematic, dramatic 4K video shot with depth of field, dynamic lighting, emotional tone, and film grain.",
    },
    {
      title: "Product Ad",
      prompt: "A clean, modern product commercial with macro close-ups, studio lighting, smooth camera rotates, and minimalist backgrounds.",
    },
    {
      title: "YouTube Short",
      prompt: "High-energy short video with subtitles, fast cuts, zoom effects, punchy storytelling and bright visuals.",
    },
  ];

  // -------------------------------
  // Create Video Task
  // -------------------------------
  async function generateVideo(customPrompt?: string) {
    setStatus("creating");
    setProgress(0);

    const finalPrompt = customPrompt || prompt;

    const res = await fetch(`${BACKEND_URL}/video/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: "demo-user",
        prompt: finalPrompt,
        model: "gpt-4o-generative-video",
      }),
    });

    const data = await res.json();
    setTaskId(data.task_id);
    setStatus("processing");
    setPolling(true);
  }

  // -------------------------------
  // Poll Task Status + Animated Progress
  // -------------------------------
  useEffect(() => {
    if (!polling || !taskId) return;

    const interval = setInterval(async () => {
      const res = await fetch(`${BACKEND_URL}/video/status/${taskId}`);
      const data = await res.json();

      setStatus(data.status);

      // Fake progress animation until done
      setProgress((prev) => {
        if (prev >= 95) return 95;
        return prev + Math.random() * 5;
      });

      if (data.status === "completed") {
        setVideoUrl(data.video_url);
        setPolling(false);
        setProgress(100);
      }

      if (data.status === "failed") {
        setPolling(false);
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [polling, taskId]);

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6 text-indigo-600">
        🎥 11EVNAI Video Creator
      </h1>

      {/* Prompt box */}
      <textarea
        className="w-full border border-gray-300 rounded p-3 mb-4 shadow-sm"
        rows={4}
        placeholder="Describe the video you want to generate..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded shadow"
        onClick={() => generateVideo()}
        disabled={!prompt || status === "creating" || status === "processing"}
      >
        {status === "creating" ? "Starting..." : "Generate Video"}
      </button>

      {/* Template section */}
      <h2 className="text-xl font-bold mt-6 mb-3">✨ Templates</h2>
      <div className="grid grid-cols-2 gap-3">
        {templates.map((t) => (
          <div
            key={t.title}
            className="p-3 border rounded shadow cursor-pointer hover:bg-gray-100"
            onClick={() => generateVideo(t.prompt)}
          >
            <h3 className="font-semibold">{t.title}</h3>
            <p className="text-sm text-gray-500">{t.prompt.slice(0, 50)}...</p>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      {status === "processing" && (
        <div className="mt-6">
          <p className="text-yellow-600 font-medium">⏳ Generating your video…</p>
          <div className="w-full bg-gray-200 rounded-full h-3 mt-2 overflow-hidden">
            <div
              className="bg-indigo-600 h-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Completed Video */}
      {videoUrl && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Your Video</h2>
          <video src={videoUrl} controls className="w-full rounded shadow-lg" />
        </div>
      )}
    </div>
  );
}
