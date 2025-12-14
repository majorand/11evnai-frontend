"use client";

type Props = {
  original: File;
  result: string | null;
};

export default function ImagePreview({ original, result }: Props) {
  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h3 className="font-semibold mb-2">Original</h3>
        <img
          src={URL.createObjectURL(original)}
          className="rounded shadow max-h-96"
        />
      </div>

      {result && (
        <div>
          <h3 className="font-semibold mb-2">Result</h3>
          <img
            src={result}
            className="rounded shadow max-h-96 border-2 border-brand"
          />
          <a
            href={result}
            download
            className="block mt-3 text-center bg-brand text-white py-2 rounded"
          >
            Download
          </a>
        </div>
      )}
    </div>
  );
}
