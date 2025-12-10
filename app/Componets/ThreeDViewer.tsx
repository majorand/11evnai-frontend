"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage, useGLTF } from "@react-three/drei";

export default function ThreeDViewer({ url }: { url: string }) {
  function Model() {
    const gltf = useGLTF(url);
    return <primitive object={gltf.scene} />;
  }

  if (!url) return null;

  return (
    <div className="mt-6 h-[500px] rounded-lg border shadow overflow-hidden">
      <Canvas camera={{ position: [3, 3, 3] }}>
        <Stage>
          <Model />
        </Stage>
        <OrbitControls />
      </Canvas>
    </div>
  );
}
