"use client";

import { useState } from "react";
import Protected from "../components/Protected";
import ImageUploadBox from "../components/ImageUploadBox";
import ImageToolPanel from "../components/ImageToolPanel";
import ImagePreview from "../components/ImagePreview";

export default function ImagesPage() {
  const [file, setFile] = useState<File | null>(null);

  return (
    <Protected>
      <div className="max-w-5xl mx-auto mt-10 space-y-6">
        <h1 className="text-2xl font-bold">Image Tools</h1>

        <ImageUploadBox onUpload={setFile} />

        {file && (
          <>
            <ImageToolPanel file={file} />
            <ImagePreview file={file} />
          </>
        )}
      </div>
    </Protected>
  );
}

