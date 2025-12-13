"use client";

import { useState } from "react";
import { backend } from "../../lib/api";

export default function ThreeDGeneratePanel({
  setModelUrl,
}: {
  setModelUrl: (url: string) => void;
}) {
  const [prompt, setPrompt] = useState("");

  const generate = async () => {
    if (!prompt.trim()) return;

    const form = new FormData();
    form.append("prompt", prompt);

    const res = await backend("/3d/text", {
      method: "POST",
      body: form,
    });

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    setModelUrl(url);
  };

  return (
    <div className="bg-white p-6 rounded border shadow mt-8">
      <h3 className="text-xl font-semibold text-brand mb-3">
        Generate 3D Model from Text
      </h3>

      <textarea
        className="w-full border p-3 rounded mb-3"
        placeholder="Describe the 3D object you want..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button
        onClick={generate}
        className="bg-brand text-white px-4 py-2 rounded"
      >
        Generate 3D Model
      </button>
    </div>
  );
}
