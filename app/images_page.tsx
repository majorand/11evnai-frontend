"use client";

import { useState } from "react";
import Protected from "../components/Protected";
import ImageUploadBox from "../components/ImageUploadBox";
import ImageToolPanel from "../components/ImageToolPanel";
import ImagePreview from "../components/ImagePreview";

export default function ImagesPage() {
  const [file, setFile] = useState<File | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);

  const handleUpload = (f: File) => {
    setFile(f);
    setResultUrl(null);
  };

  return (
    <Protected>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-brand mb-6">Image AI Tools</h1>

        {!file && <ImageUploadBox onUpload={handleUpload} />}

        <ImageToolPanel file={file} setResult={setResultUrl} />

        <ImagePreview original={file} result={resultUrl} />
      </div>
    </Protected>
  );
}
