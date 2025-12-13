"use client";

import { useState } from "react";
import { backend } from "../../lib/api";

export default function VideoGeneratePanel({
  setResult,
}: {
  setResult: (url: string) => void;
}) {
  const [prompt, setPrompt] = useState("");
  const [duration, setDuration] = useState("5");

  const generate = async (provider: "openai" | "veo") => {
    const form = new FormData();
    form.append("prompt", prompt);
    form.append("duration", duration);

    const res = await backend(
      `/video/generate/${provider === "openai" ? "openai" : "veo"}`,
      { method: "POST", body: form }
    );

    const blob = await res.blob();
    setResult(URL.createObjectURL(blob));
  };

  return (
    <div className="bg-white p-6 rounded border shadow mt-8">
      <h3 className="text-xl font-semibold mb-4 text-brand">Generate New Video</h3>

      <textarea
        className="w-full border p-3 rounded mb-3"
        placeholder="Describe the video you want to generate..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <input
        className="border p-2 rounded w-32 mb-4"
        type="number"
        min={1}
        max={30}
        placeholder="Duration (sec)"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
      />

      <div className="flex gap-4">
        <button
          onClick={() => generate("openai")}
          className="bg-brand text-white px-4 py-2 rounded"
        >
          OpenAI Video
        </button>

        <button
          onClick={() => generate("veo")}
          className="bg-brand text-white px-4 py-2 rounded"
        >
          Google VEO 3
        </button>
      </div>
    </div>
  );
}
