"use client";

import { backend } from "../../lib/api";

export default function ImageToolPanel({
  file,
  setResult,
}: {
  file: File | null;
  setResult: (url: string) => void;
}) {
  if (!file) return null;

  const runTool = async (
    endpoint: string,
    extra?: Record<string, string>
  ) => {
    const form = new FormData();
    form.append("file", file);

    if (extra) {
      Object.entries(extra).forEach(([key, value]) => {
        form.append(key, String(value)); // ✅ TS-safe
      });
    }

    const res = await backend(`/images/${endpoint}`, {
      method: "POST",
      body: form,
    });

    const blob = await res.blob();
    setResult(URL.createObjectURL(blob));
  };

  return (
    <div className="flex flex-wrap gap-4 mt-6">
      <button
        onClick={() => runTool("remove-bg")}
        className="bg-brand text-white px-4 py-2 rounded"
      >
        Remove Background
      </button>

      <button
        onClick={() => runTool("face-enhance")}
        className="bg-brand text-white px-4 py-2 rounded"
      >
        Enhance Face
      </button>

      <button
        onClick={() => runTool("upscale")}
        className="bg-brand text-white px-4 py-2 rounded"
      >
        Upscale to 4K
      </button>

      <button
        onClick={() => {
          const prompt = window.prompt("Enter img2img prompt:");
          if (prompt) runTool("img2img", { prompt });
        }}
        className="bg-brand text-white px-4 py-2 rounded"
      >
        Image → Image
      </button>

      <button
        onClick={() => {
          const prompt = window.prompt("Describe what to inpaint/outpaint:");
          if (!prompt) return;

          const maskInput = document.createElement("input");
          maskInput.type = "file";
          maskInput.accept = "image/*";

          maskInput.onchange = async () => {
            if (!maskInput.files?.[0]) return;

            const form = new FormData();
            form.append("file", file);
            form.append("mask", maskInput.files[0]);
            form.append("prompt", prompt);

            const res = await backend("/images/inpaint", {
              method: "POST",
              body: form,
            });

            const blob = await res.blob();
            setResult(URL.createObjectURL(blob));
          };

          maskInput.click();
        }}
        className="bg-brand text-white px-4 py-2 rounded"
      >
        Inpainting / Outpainting
      </button>
    </div>
  );
}
