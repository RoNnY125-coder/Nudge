"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function MiniGlossySphere() {
  const meshRef = useRef(null);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      meshRef.current.rotation.y = time * 0.4;
      meshRef.current.rotation.x = Math.sin(time * 0.2) * 0.15;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.4}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.3, 64, 64]} />
        <meshPhysicalMaterial
          color="#6E8F6C"
          roughness={0.15}
          metalness={0.1}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          transmission={0.4}
          thickness={0.5}
        />
      </mesh>
    </Float>
  );
}

export default function YoureNotAloneSection() {
  const sectionRef = useRef(null);
  const barsRef = useRef([]);
  const [counts, setCounts] = useState({ heard: 0, time: 0, total: 0 });

  const chartData = [
    { label: "Tired / low energy", percentage: 72 },
    { label: "Trouble sleeping", percentage: 58 },
    { label: "Can't focus", percentage: 45 },
    { label: "Anxious", percentage: 63 },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Bar fills on scroll
      barsRef.current.forEach((bar, idx) => {
        if (!bar) return;
        const targetWidth = chartData[idx].percentage;
        gsap.fromTo(
          bar,
          { width: "0%" },
          {
            width: `${targetWidth}%`,
            duration: 1.2,
            delay: idx * 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
            },
          }
        );
      });

      // Count up numbers on scroll
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 70%",
        onEnter: () => {
          gsap.to(
            {},
            {
              duration: 2,
              ease: "power1.out",
              onUpdate: function () {
                const progress = this.progress();
                setCounts({
                  heard: Math.floor(progress * 94),
                  time: (progress * 3).toFixed(0),
                  total: (progress * 12).toFixed(0),
                });
              },
            }
          );
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="science"
      ref={sectionRef}
      className="py-28 bg-[#14251C] text-[#F3EFE6] relative overflow-hidden"
    >
      {/* Background Ambient Drifting Particle Mesh */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#6E8F6C] via-transparent to-transparent blur-3xl animate-pulse" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#1E3427] border border-[#2D4A39] text-xs font-semibold text-[#7FA07A] uppercase tracking-wider">
            You're not alone
          </div>
          <h2 className="font-serif-display text-4xl sm:text-5xl font-bold text-[#F3EFE6] leading-tight">
            Right now, thousands of people feel exactly what you feel.
          </h2>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: 3D Glossy Sphere with Overlay */}
          <div className="lg:col-span-4 relative h-64 lg:h-80 flex items-center justify-center">
            <Canvas camera={{ position: [0, 0, 4.8], fov: 45 }}>
              <ambientLight intensity={1.5} />
              <directionalLight position={[3, 3, 3]} intensity={2} color="#7FA07A" />
              <pointLight position={[-3, -3, -1]} intensity={1} color="#D98F6E" />
              <MiniGlossySphere />
            </Canvas>

            {/* Badge Overlay */}
            <div className="absolute glass-card-dark px-5 py-3 rounded-2xl text-center shadow-xl border border-white/10">
              <span className="block text-2xl font-bold text-[#7FA07A]">2,400+</span>
              <span className="text-xs text-[#F3EFE6]/80 font-medium">
                people felt the same this week
              </span>
            </div>
          </div>

          {/* Middle: Horizontal Bar Chart */}
          <div className="lg:col-span-5 glass-card-dark p-6 sm:p-8 rounded-3xl space-y-5 border border-white/10">
            <h3 className="font-serif-display text-xl font-bold text-[#F3EFE6]">
              Commonly reported signals
            </h3>
            <div className="space-y-4">
              {chartData.map((item, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold text-[#F3EFE6]/90">
                    <span>{item.label}</span>
                    <span className="text-[#7FA07A]">{item.percentage}%</span>
                  </div>
                  <div className="h-2.5 bg-[#1E3427] rounded-full overflow-hidden">
                    <div
                      ref={(el) => (barsRef.current[idx] = el)}
                      className="h-full bg-gradient-to-r from-[#7FA07A] to-[#4B6B4A] rounded-full w-0"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Stat Card with Animated Count-Up Numbers */}
          <div className="lg:col-span-3 glass-card-dark p-6 sm:p-8 rounded-3xl space-y-6 border border-white/10 text-center lg:text-left">
            <div>
              <span className="font-serif-display text-4xl font-bold text-[#7FA07A]">
                {counts.heard}%
              </span>
              <p className="text-xs text-[#F3EFE6]/80 font-medium mt-1">
                felt heard after their nudge
              </p>
            </div>

            <div className="border-t border-white/10 pt-4">
              <span className="font-serif-display text-4xl font-bold text-[#D98F6E]">
                {counts.time}min
              </span>
              <p className="text-xs text-[#F3EFE6]/80 font-medium mt-1">
                avg check-in time
              </p>
            </div>

            <div className="border-t border-white/10 pt-4">
              <span className="font-serif-display text-4xl font-bold text-[#F3EFE6]">
                {counts.total}k+
              </span>
              <p className="text-xs text-[#F3EFE6]/80 font-medium mt-1">
                check-ins this month
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
