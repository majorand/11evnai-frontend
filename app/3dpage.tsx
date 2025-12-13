"use client";

import { useState } from "react";
import Protected from "./components/Protected";
import ThreeDViewer from "../components/ThreeDViewer";
import ThreeDGeneratePanel from "../components/ThreeDGeneratePanel";
import ThreeDFromImagePanel from "../components/ThreeDFromImagePanel";

export default function ThreeDPage() {
  const [modelUrl, setModelUrl] = useState<string | null>(null);

  return (
    <Protected>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-brand mb-6">3D AI Tools</h1>

        <ThreeDGeneratePanel setModelUrl={setModelUrl} />

        <ThreeDFromImagePanel setModelUrl={setModelUrl} />

        {modelUrl && (
          <>
            <h2 className="text-xl font-semibold mt-8 mb-3">3D Viewer</h2>
            <ThreeDViewer url={modelUrl} />
            <a
              href={modelUrl}
              download="11evnai_3d_model.glb"
              className="mt-3 block text-center bg-brand text-white py-2 rounded shadow"
            >
              Download 3D Model
            </a>
          </>
        )}
      </div>
    </Protected>
  );
}
