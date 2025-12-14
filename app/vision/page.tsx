"use client";

import { useState } from "react";
import Protected from "@/app/components/Protected";
import ImageUploadBox from "@/app/components/ImageUploadBox";
import VisionResult from "@/app/components/VisionResult";
import { backend } from "@/lib/api";

export default function VisionPage() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const runVision = async () => {
    if (!file) return;

    setLoading(true);
    const form = new FormData();
    form.append("file", file);

    const res = await backend("/vision/analyze", {
      method: "POST",
      body: form,
    });

    const data = await res.json();
    setResult(data.result);
    setLoading(false);
  };

  return (
    <Protected>
      <div className="max-w-4xl mx-auto mt-10 space-y-6">
        <h1 className="text-2xl font-bold">Vision Analysis</h1>

        <ImageUploadBox
          onUpload={(f) => {
            setFile(f);
            setResult(null);
          }}
        />

        {file && (
          <button
            onClick={runVision}
            disabled={loading}
            className="bg-brand text-white px-4 py-2 rounded"
          >
            {loading ? "Analyzing..." : "Analyze Image"}
          </button>
        )}

        <VisionResult result={result} />
      </div>
    </Protected>
  );
}
