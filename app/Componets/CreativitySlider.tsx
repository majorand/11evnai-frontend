"use client";

export default function CreativitySlider({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="bg-white p-4 rounded shadow border mt-4">
      <h3 className="text-lg font-semibold text-gray-700 mb-1">Creativity</h3>
      <p className="text-sm text-gray-500 mb-3">
        Higher = more creative, lower = more precise.
      </p>

      <input
        type="range"
        min="0"
        max="1"
        step="0.05"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
      />
    </div>
  );
}
