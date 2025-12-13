"use client";

type ThreeDViewerProps = {
  url: string;
};

export default function ThreeDViewer({ url }: ThreeDViewerProps) {
  return (
    <div className="w-full h-[400px] flex items-center justify-center border rounded-lg bg-gray-100">
      <div className="text-center space-y-2">
        <p className="font-semibold text-gray-700">3D Preview</p>
        <p className="text-sm text-gray-500">
          3D viewer temporarily disabled for production build.
        </p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline text-sm"
        >
          Open model file
        </a>
      </div>
    </div>
  );
}
