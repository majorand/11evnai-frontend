"use client";

import { useState } from "react";
import { backend } from "../../lib/api";

export default function VideoToolPanel({
  file,
  setResult,
}: {
  file: File | null;
  setResult: (url: string) => void;
}) {
  const [start, setStart] = useState("0");
  const [end, setEnd] = useState("5");

  if (!file) return null;

  const runSimpleTool = async (endpoint: string, extra?: any) => {
    const form = new FormData();
    form.append("file", file);
    if (extra) {
      Object.entries(extra).forEach(([k, v]) => form.append(k, v));
    }

    const res = await backend(`/video/${endpoint}`, {
      method: "POST",
      body: form,
    });

    const blob = await res.blob();
    setResult(URL.createObjectURL(blob));
  };

  return (
    <div className="mt-6 space-y-6">
      {/* Trimming */}
      <div className="bg-white p-4 rounded border shadow">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Trim Video</h3>
        <div className="flex gap-4">
          <input
            value={start}
            onChange={(e) => setStart(e.target.value)}
            className="border p-2 rounded"
            type="number"
            placeholder="Start (sec)"
          />
          <input
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            className="border p-2 rounded"
            type="number"
            placeholder="End (sec)"
          />

          <button
            onClick={() => runSimpleTool("trim", { start, end })}
            className="bg-brand text-white px-4 py-2 rounded"
          >
            Trim
          </button>
        </div>
      </div>

      {/* Effects */}
      <div className="bg-white p-4 rounded border shadow">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Effects</h3>
        <div className="flex gap-4 flex-wrap">
          <button
            onClick={() => runSimpleTool("effect", { effect: "invert" })}
            className="bg-brand text-white px-4 py-2 rounded"
          >
            Invert Colors
          </button>
          <button
            onClick={() => runSimpleTool("effect", { effect: "blackwhite" })}
            className="bg-brand text-white px-4 py-2 rounded"
          >
            Black & White
          </button>
          <button
            onClick={() => runSimpleTool("effect", { effect: "mirror" })}
            className="bg-brand text-white px-4 py-2 rounded"
          >
            Mirror
          </button>
        </div>
      </div>

      {/* Lip Sync */}
      <div className="bg-white p-4 rounded border shadow">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Lip Sync</h3>

        <button
          className="bg-brand text-white px-4 py-2 rounded"
          onClick={() => {
            const input = document.createElement("input");
            input.type = "file";
            input.accept = "audio/*";

            input.onchange = async () => {
              if (!input.files?.[0]) return;
              const audio = input.files[0];

              const form = new FormData();
              form.append("video", file);
              form.append("audio", audio);

              const res = await backend("/video/lipsync", {
                method: "POST",
                body: form,
              });

              const blob = await res.blob();
              setResult(URL.createObjectURL(blob));
            };

            input.click();
          }}
        >
          Upload Audio & Run Lip Sync
        </button>
      </div>
    </div>
  );
}
