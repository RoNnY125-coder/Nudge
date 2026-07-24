"use client";

import { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { CheckCircle2, ShieldCheck, Sparkles, Sliders } from "lucide-react";

const SYMPTOMS = [
  "Tired",
  "Headache",
  "Low mood",
  "Can't focus",
  "Tight chest",
  "Gut discomfort",
  "Trouble sleeping",
  "Anxious",
  "Irritable",
  "Low energy",
  "Nausea",
  "Neck tension",
];

export default function DailyCheckinSection() {
  const [selectedTags, setSelectedTags] = useState(["Tired", "Low mood", "Trouble sleeping"]);
  const [energyLevel, setEnergyLevel] = useState(4);

  // 3D Perspective Tilt for the App UI Mockup Card
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <section id="checkin" className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column Copy */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#E8E2D5] border border-[#DCD5C5] text-xs font-semibold text-[#6E8F6C] uppercase tracking-wider">
            Daily check-in
          </div>

          <h2 className="font-serif-display text-4xl sm:text-5xl font-bold text-[#1E2A22] leading-tight">
            One question.
            <br />
            <span className="text-[#6E8F6C]">Real answers.</span>
          </h2>

          <p className="text-lg text-[#6B6F68] leading-relaxed">
            Understanding your health shouldn't feel like taking an exam. A simple
            60-second check-in gives you instant clarity on how your body is doing.
          </p>

          <div className="space-y-4 pt-2">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-[#6E8F6C]/20 flex items-center justify-center text-[#6E8F6C] shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <p className="text-[#1E2A22] font-medium">
                Symptom patterns recognised in as few as 3 check-ins
              </p>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-[#6E8F6C]/20 flex items-center justify-center text-[#6E8F6C] shrink-0 mt-0.5">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <p className="text-[#1E2A22] font-medium">
                Completely private — nothing shared, nothing diagnosed
              </p>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-[#6E8F6C]/20 flex items-center justify-center text-[#6E8F6C] shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4" />
              </div>
              <p className="text-[#1E2A22] font-medium">
                The more you check in, the clearer your picture becomes
              </p>
            </div>
          </div>
        </div>

        {/* Right Column Interactive 3D App UI Mockup Card */}
        <div
          className="lg:col-span-6 perspective-1000 flex justify-center"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <motion.div
            style={{ rotateX, rotateY }}
            className="w-full max-w-lg glass-card p-6 sm:p-8 rounded-3xl shadow-2xl border border-white/80 space-y-6"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#E2DCD0] pb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#D98F6E]" />
                <div className="w-3 h-3 rounded-full bg-[#6E8F6C]" />
                <div className="w-3 h-3 rounded-full bg-[#14251C]" />
              </div>
              <span className="text-xs font-semibold text-[#6B6F68] uppercase tracking-wider">
                Daily Check-in
              </span>
            </div>

            <h3 className="font-serif-display text-2xl font-bold text-[#1E2A22]">
              How are you feeling today?
            </h3>

            {/* Symptom Tag Grid */}
            <div className="flex flex-wrap gap-2.5">
              {SYMPTOMS.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "bg-[#6E8F6C] text-white shadow-sm scale-105"
                        : "bg-[#FAF7F0] text-[#1E2A22] border border-[#E2DCD0] hover:bg-[#E8E2D5]"
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>

            {/* Overall Energy Slider */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between text-xs font-semibold text-[#1E2A22]">
                <span className="flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-[#6E8F6C]" />
                  Overall energy
                </span>
                <span className="text-[#6E8F6C] font-bold text-sm">
                  {energyLevel}/10
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={energyLevel}
                onChange={(e) => setEnergyLevel(Number(e.target.value))}
                className="w-full h-2 bg-[#E2DCD0] rounded-lg appearance-none cursor-pointer accent-[#6E8F6C]"
              />
              <div className="flex justify-between text-[11px] font-medium text-[#6B6F68]">
                <span>Depleted</span>
                <span>Energized</span>
              </div>
            </div>

            {/* Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 rounded-2xl bg-[#14251C] text-white text-sm font-semibold hover:bg-[#6E8F6C] transition-colors shadow-md flex items-center justify-center gap-2"
            >
              Get my nudge
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
