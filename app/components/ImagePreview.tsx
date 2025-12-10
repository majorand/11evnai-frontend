"use client";

export default function ImagePreview({
  original,
  result,
}: {
  original: File | null;
  result: string | null;
}) {
  if (!original) return null;

  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h3 className="text-lg font-semibold mb-2 text-gray-700">Original</h3>
        <img
          src={URL.createObjectURL(original)}
          className="rounded-lg shadow max-h-96 mx-auto"
        />
      </div>

      {result && (
        <div>
          <h3 className="text-lg font-semibold mb-2 text-brand">Result</h3>
          <img
            src={result}
            className="rounded-lg shadow max-h-96 mx-auto border-2 border-brand"
          />

          <a
            href={result}
            download="11evnai_image.png"
            className="mt-3 block text-center bg-brand text-white py-2 rounded"
          >
            Download Image
          </a>
        </div>
      )}
    </div>
  );
}
