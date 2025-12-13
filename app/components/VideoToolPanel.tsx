"use client";

import { useState } from "react";
import { backend } from "../../lib/api";

type VideoToolPanelProps = {
  endpoint: string;
  extra?: Record<string, unknown>;
};

export default function VideoToolPanel({ endpoint, extra }: VideoToolPanelProps) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!file) return;

    setLoading(true);

    const form = new FormData();
    form.append("file", file);

    if (extra) {
      Object.entries(extra).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          form.append(key, String(value));
        }
      });
    }

    await backend(`/video/${endpoint}`, {
      method: "POST",
      body: form,
    });

    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <input
        type="file"
        accept="video/*"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
      />

      <button
        onClick={handleSubmit}
        disabled={!file || loading}
        className="px-4 py-2 bg-black text-white rounded disabled:opacity-50"
      >
        {loading ? "Uploading..." : "Upload Video"}
      </button>
    </div>
  );
}
