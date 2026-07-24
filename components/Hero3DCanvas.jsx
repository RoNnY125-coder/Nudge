"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";

function MorphingSphere({ mouse }) {
  const meshRef = useRef(null);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      
      // Cursor lerped rotation
      const targetRotX = mouse.current.y * 0.35;
      const targetRotY = mouse.current.x * 0.35 + time * 0.15;

      meshRef.current.rotation.x += (targetRotX - meshRef.current.rotation.x) * 0.05;
      meshRef.current.rotation.y += (targetRotY - meshRef.current.rotation.y) * 0.05;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
      <mesh ref={meshRef} scale={1.25}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color="#6E8F6C"
          emissive="#1E3427"
          roughness={0.25}
          metalness={0.15}
          distort={0.32}
          speed={2}
          clearcoat={0.8}
          clearcoatRoughness={0.2}
        />
      </mesh>
    </Float>
  );
}

export default function Hero3DCanvas({ mouse }) {
  return (
    <div className="w-full h-[450px] sm:h-[520px] lg:h-[600px] relative flex items-center justify-center overflow-visible">
      <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 5, 5]} intensity={2} color="#F3EFE6" />
        <directionalLight position={[-5, -3, -2]} intensity={1.2} color="#D98F6E" />
        <pointLight position={[0, 4, 3]} intensity={1.5} color="#7FA07A" />
        <MorphingSphere mouse={mouse} />
      </Canvas>
    </div>
  );
}
