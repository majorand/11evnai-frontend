"use client";

type Props = {
  onUpload: (file: File) => void;
};

export default function ImageUploadBox({ onUpload }: Props) {
  return (
    <div className="border-2 border-dashed rounded-lg p-6 text-center">
      <input
        type="file"
        accept="image/*"
        className="hidden"
        id="image-upload"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onUpload(file);
        }}
      />
      <label
        htmlFor="image-upload"
        className="cursor-pointer text-brand font-semibold"
      >
        Click to upload an image
      </label>
    </div>
  );
}
