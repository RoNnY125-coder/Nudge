"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";

function MorphingSphere({ mouse }) {
  const meshRef = useRef(null);

  useFrame(() => {
    if (meshRef.current) {
      // Lerped cursor rotation only — no time-based rotation to save CPU
      meshRef.current.rotation.x +=
        (mouse.current.y * 0.3 - meshRef.current.rotation.x) * 0.04;
      meshRef.current.rotation.y +=
        (mouse.current.x * 0.3 - meshRef.current.rotation.y) * 0.04;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.35}>
      <mesh ref={meshRef} scale={1.2}>
        <sphereGeometry args={[1, 48, 48]} />
        {/* Lower poly count for performance */}
        <MeshDistortMaterial
          color="#6E8F6C"
          emissive="#1E3427"
          roughness={0.3}
          metalness={0.1}
          distort={0.3}
          speed={1.5}
          clearcoat={0.6}
          clearcoatRoughness={0.25}
        />
      </mesh>
    </Float>
  );
}

export default function Hero3DCanvas({ mouse }) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  // Only mount the Canvas when section is visible (IntersectionObserver)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: "100px" }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-[430px] sm:h-[500px] lg:h-[580px] relative overflow-visible"
    >
      {isVisible && (
        <Canvas
          camera={{ position: [0, 0, 5.5], fov: 45 }}
          frameloop="always"
          gl={{ antialias: true, powerPreference: "high-performance" }}
        >
          <ambientLight intensity={1.4} />
          <directionalLight position={[5, 5, 5]} intensity={1.8} color="#F3EFE6" />
          <directionalLight position={[-5, -3, -2]} intensity={1} color="#D98F6E" />
          <pointLight position={[0, 4, 3]} intensity={1.2} color="#7FA07A" />
          <MorphingSphere mouse={mouse} />
        </Canvas>
      )}
    </div>
  );
}
