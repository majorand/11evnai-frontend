"use client";

export default function VideoPreview({ file }: { file: File | null }) {
  if (!file) return null;

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-2">Preview</h3>
      <video
        controls
        className="w-full rounded-lg shadow max-h-[400px]"
        src={URL.createObjectURL(file)}
      />
    </div>
  );
}
