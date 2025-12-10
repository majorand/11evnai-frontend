"use client";

export default function SettingToggle({
  label,
  enabled,
  onChange,
}: {
  label: string;
  enabled: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div
      className="flex justify-between items-center bg-white p-4 rounded shadow border mb-3 cursor-pointer"
      onClick={() => onChange(!enabled)}
    >
      <div className="text-gray-700 font-medium">{label}</div>

      <div
        className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
          enabled ? "bg-brand" : "bg-gray-300"
        }`}
      >
        <div
          className={`bg-white w-4 h-4 rounded-full shadow transform transition ${
            enabled ? "translate-x-6" : ""
          }`}
        />
      </div>
    </div>
  );
}
