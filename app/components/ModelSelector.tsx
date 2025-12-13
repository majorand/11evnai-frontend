"use client";

export default function ModelSelector({
  value,
  onChange,
}: {
  value: string;
  onChange: (model: string) => void;
}) {
  const models = [
    { id: "gpt-4.1", name: "OpenAI GPT-4.1" },
    { id: "gpt-o3-mini", name: "OpenAI GPT-o3-mini" },
    { id: "gemini-pro", name: "Google Gemini Pro" },
    { id: "claude-3-opus", name: "Claude 3 Opus" },
    { id: "11evnai-auto", name: "11evnai Auto-Select" },
  ];

  return (
    <div className="bg-white p-4 rounded shadow border">
      <h3 className="text-lg font-semibold text-gray-700 mb-2">AI Model</h3>

      <select
        className="border p-2 rounded w-full"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {models.map((m) => (
          <option key={m.id} value={m.id}>
            {m.name}
          </option>
        ))}
      </select>
    </div>
  );
}
