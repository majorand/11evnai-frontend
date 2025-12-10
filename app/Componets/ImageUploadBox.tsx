"use client";

import { useState } from "react";

export default function ImageUploadBox({
  onUpload,
}: {
  onUpload: (file: File) => void;
}) {
  const [dragging, setDragging] = useState(false);

  const handleDrop = (e: any) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) onUpload(file);
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition ${
        dragging ? "border-brand bg-brand/10" : "border-gray-400 bg-white"
      }`}
      onClick={() => document.getElementById("visionFileInput")?.click()}
    >
      <input
        id="visionFileInput"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          if (e.target.files?.[0]) onUpload(e.target.files[0]);
        }}
      />

      <p className="text-gray-600 text-lg">
        Drag & drop an image here, or <span className="text-brand">click to upload</span>
      </p>
    </div>
  );
}
