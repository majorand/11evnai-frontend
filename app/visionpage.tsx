"use client";

import { useState } from "react";
import ImageUploadBox from "./components/ImageUploadBox";
import VisionResult from "./components/VisionResult";
import { backend } from "../lib/api";
import Protected from "./components/Protected";

export default function VisionPage() {
  const [file, setFile] = useState<File | null>(null);
  const [resultCaption, setCaption] = useState<string | null>(null);
  const [resultOCR, setOCR] = useState<string | null>(null);
  const [resultDoc, setDoc] = useState<string | null>(null);

  const uploadImage = (f: File) => {
    setFile(f);
    setCaption(null);
    setOCR(null);
    setDoc(null);
  };

  const process = async (endpoint: string, setter: any) => {
    if (!file) return;
    const form = new FormData();
    form.append("file", file);

    const res = await backend(`/vision/${endpoint}`, {
      method: "POST",
      body: form,
    });
    const data = await res.json();
    setter(data.caption || data.text || data.analysis);
  };

  return (
    <Protected>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-brand mb-6">Vision Tools</h1>

        {!file && <ImageUploadBox onUpload={uploadImage} />}

        {file && (
          <div className="mb-6">
            <img
              src={URL.createObjectURL(file)}
              className="rounded-lg shadow max-h-80 mx-auto"
            />
          </div>
        )}

        {file && (
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => process("caption", setCaption)}
              className="bg-brand text-white px-4 py-2 rounded"
            >
              Generate Caption
            </button>

            <button
              onClick={() => process("ocr", setOCR)}
              className="bg-brand text-white px-4 py-2 rounded"
            >
              Run OCR
            </button>

            <button
              onClick={() => process("document", setDoc)}
              className="bg-brand text-white px-4 py-2 rounded"
            >
              Analyze Document
            </button>
          </div>
        )}

        <VisionResult title="Caption" result={resultCaption} />
        <VisionResult title="OCR Result" result={resultOCR} />
        <VisionResult title="Document Analysis" result={resultDoc} />
      </div>
    </Protected>
  );
}
