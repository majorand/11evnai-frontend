"use client";

import { useState } from "react";
import Protected from "../components/Protected";
import ImageUploadBox from "../components/ImageUploadBox";
import ImageToolPanel from "../components/ImageToolPanel";
import ImagePreview from "../components/ImagePreview";

export default function ImagesPage() {
  const [file, setFile] = useState<File | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);

  return (
    <Protected>
      <div className="max-w-5xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold">Image Tools</h1>

        <ImageUploadBox onSelect={setFile} />

        {file && (
          <ImageToolPanel
            file={file}
            onResult={(url) => setResultUrl(url)}
          />
        )}

        {resultUrl && <ImagePreview src={resultUrl} />}
      </div>
    </Protected>
  );
}
