"use client";

export default function AudioUploadBox({
  onUpload,
}: {
  onUpload: (file: File) => void;
}) {
  return (
    <div className="border rounded p-6 bg-white text-center">
      <input
        type="file"
        accept="audio/*"
        className="hidden"
        id="audioFileInput"
        onChange={(e) => {
          if (e.target.files?.[0]) onUpload(e.target.files[0]);
        }}
      />

      <label
        htmlFor="audioFileInput"
        className="cursor-pointer text-brand font-medium"
      >
        Click to upload audio file
      </label>
    </div>
  );
}
