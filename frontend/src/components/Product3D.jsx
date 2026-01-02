// frontend/src/components/Product3d.jsx
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import React, { Suspense } from "react";

function Model({ textureUrl, shape = "sphere" }) {
  let texture;

  try {
    texture = useTexture(textureUrl || "");
  } catch (e) {
    console.warn("Texture failed to load:", e);
    texture = null;
  }

  return (
    <mesh>
      {shape === "sphere" ? (
        <sphereGeometry args={[1.8, 32, 32]} />
      ) : (
        <planeGeometry args={[4, 5]} />
      )}

      <meshStandardMaterial
        map={texture}
        color={!texture ? "#ccc" : "white"} // fallback color
        metalness={0.1}
        roughness={0.5}
      />
    </mesh>
  );
}

export default function Product3D({ textureUrl, shape = "sphere" }) {
  return (
    <div className="w-full h-[450px] rounded shadow overflow-hidden bg-gray-200">
      <Canvas camera={{ position: [3, 3, 3] }}>

        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />

        {/* Load model safely */}
        <Suspense fallback={null}>
          <Model textureUrl={textureUrl} shape={shape} />
        </Suspense>

        <OrbitControls />
      </Canvas>
    </div>
  );
}
