"use client";

import { useState } from "react";
import { backend } from "@/lib/api";

type Props = {
  file: File;
  setResult: (url: string) => void;
};

export default function ImageToolPanel({ file, setResult }: Props) {
  const [loading, setLoading] = useState(false);

  const runTool = async () => {
    setLoading(true);

    const form = new FormData();
    form.append("file", file);

    const res = await backend("/images/generate", {
      method: "POST",
      body: form,
    });

    const data = await res.json();
    setResult(data.url);
    setLoading(false);
  };

  return (
    <div className="flex gap-4">
      <button
        onClick={runTool}
        disabled={loading}
        className="bg-brand text-white px-4 py-2 rounded"
      >
        {loading ? "Processing..." : "Generate Image"}
      </button>
    </div>
  );
}
