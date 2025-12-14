"use client";

type Props = {
  result: string | null;
};

export default function VisionResult({ result }: Props) {
  if (!result) return null;

  return (
    <div className="mt-6 p-4 border rounded bg-gray-50">
      <h3 className="font-semibold mb-2">Vision Result</h3>
      <pre className="whitespace-pre-wrap text-sm">{result}</pre>
    </div>
  );
}
