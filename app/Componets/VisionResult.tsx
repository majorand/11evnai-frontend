export default function VisionResult({
  title,
  result,
}: {
  title: string;
  result: string | null;
}) {
  if (!result) return null;

  return (
    <div className="bg-white p-6 rounded-lg border shadow mt-6">
      <h3 className="text-xl font-semibold text-brand mb-2">{title}</h3>
      <pre className="whitespace-pre-wrap text-gray-700">{result}</pre>
    </div>
  );
}
