"use client";

import { useState } from "react";
import { backend } from "../../lib/api";

export default function ThreeDFromImagePanel({
  setModelUrl,
}: {
  setModelUrl: (url: string) => void;
}) {
  const [file, setFile] = useState<File | null>(null);

  const upload = async () => {
    if (!file) return;

    const form = new FormData();
    form.append("file", file);

    const res = await backend("/3d/image", {
      method: "POST",
      body: form,
    });

    const blob = await res.blob();
    setModelUrl(URL.createObjectURL(blob));
  };

  return (
    <div className="bg-white p-6 rounded border shadow mt-8">
      <h3 className="text-xl font-semibold text-brand mb-3">
        Generate 3D from Image
      </h3>

      {!file && (
        <input
          type="file"
          accept="image/*"
          className="p-3 border rounded"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
      )}

      {file && (
        <div className="mt-3">
          <img
            src={URL.createObjectURL(file)}
            className="max-h-48 rounded-lg shadow mb-3"
          />

          <button
            onClick={upload}
            className="bg-brand text-white px-4 py-2 rounded"
          >
            Generate 3D Model
          </button>
        </div>
      )}
    </div>
  );
}
