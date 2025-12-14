"use client";

type ImageUploadBoxProps = {
  onUpload: (file: File) => void;
};

export default function ImageUploadBox({ onUpload }: ImageUploadBoxProps) {
  return (
    <div className="border-dashed border-2 rounded-lg p-6 text-center">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onUpload(file);
        }}
      />
    </div>
  );
}

