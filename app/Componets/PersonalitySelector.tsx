"use client";

import { useEffect, useState } from "react";
import { backend } from "../../lib/api";

export default function PersonalitySelector({
  onSelect,
}: {
  onSelect: (id: number | null) => void;
}) {
  const [personas, setPersonas] = useState([]);

  useEffect(() => {
    backend("/personalities/list").then(async (r) => {
      const data = await r.json();
      setPersonas(data.personalities);
    });
  }, []);

  return (
    <select
      className="border p-2 rounded text-sm"
      onChange={(e) =>
        onSelect(e.target.value === "" ? null : Number(e.target.value))
      }
    >
      <option value="">Default Personality</option>
      {personas.map((p: any) => (
        <option key={p.id} value={p.id}>
          {p.name}
        </option>
      ))}
    </select>
  );
}
