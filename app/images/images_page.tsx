"use client";

import { useState } from "react";
import Protected from "@/app/components/Protected";
import ImageUploadBox from "@/app/components/ImageUploadBox";
import ImageToolPanel from "@/app/components/ImageToolPanel";
import ImagePreview from "@/app/components/ImagePreview";

export default function ImagesPage() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<string | null>(null);

  return (
    <Protected>
      <div className="max-w-5xl mx-auto mt-10 space-y-6">
        <h1 className="text-2xl font-bold">Image Generation</h1>

        <ImageUploadBox
          onUpload={(f) => {
            setFile(f);
            setResult(null);
          }}
        />

        {file && (
          <>
            <ImageToolPanel file={file} setResult={setResult} />
            <ImagePreview original={file} result={result} />
          </>
        )}
      </div>
    </Protected>
  );
}
