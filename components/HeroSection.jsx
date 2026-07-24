"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Hero3DCanvas from "./Hero3DCanvas";
import { ArrowRight, Sparkles, Heart } from "lucide-react";

export default function HeroSection() {
  const mouse = useRef({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { innerWidth, innerHeight } = window;
    mouse.current.x = (e.clientX / innerWidth) * 2 - 1;
    mouse.current.y = -(e.clientY / innerHeight) * 2 + 1;
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative min-h-[90vh] pt-32 pb-16 px-4 md:px-8 max-w-7xl mx-auto flex flex-col justify-center overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-6 items-center">
        {/* Left Column Text & CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-6 space-y-6 z-10"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#E8E2D5] border border-[#DCD5C5] text-xs font-semibold text-[#4B6B4A]">
            <span className="w-2 h-2 rounded-full bg-[#6E8F6C] animate-ping" />
            Free · No account needed
          </div>

          {/* Headline */}
          <h1 className="font-serif-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#1E2A22] leading-[1.08]">
            A gentle{" "}
            <span className="text-[#6E8F6C] italic font-serif">check-in,</span>
            <br />
            <span className="text-[#6E8F6C]">every day.</span>
          </h1>

          {/* Subtext */}
          <p className="text-lg md:text-xl text-[#6B6F68] max-w-xl leading-relaxed font-normal">
            Nudge helps you notice what your body is telling you — without panic,
            without jargon, without diagnosis.
          </p>

          {/* Dual CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <motion.a
              href="#checkin"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-4 rounded-full bg-[#14251C] text-white text-base font-semibold hover:bg-[#6E8F6C] transition-colors shadow-lg shadow-[#14251C]/10 flex items-center gap-2"
            >
              Start checking in
              <ArrowRight className="w-4.5 h-4.5" />
            </motion.a>

            <motion.a
              href="#how-it-works"
              whileHover={{ x: 4 }}
              className="px-6 py-4 text-[#1E2A22] font-semibold text-base flex items-center gap-2 hover:text-[#6E8F6C] transition-colors"
            >
              See how it works
              <span className="text-lg">→</span>
            </motion.a>
          </div>

          {/* Social Proof */}
          <div className="flex items-center gap-4 pt-6 border-t border-[#E2DCD0]/80">
            <div className="flex -space-x-2.5">
              <div className="w-9 h-9 rounded-full bg-[#6E8F6C] border-2 border-[#F3EFE6] flex items-center justify-center text-white text-xs font-bold shadow-sm">
                JD
              </div>
              <div className="w-9 h-9 rounded-full bg-[#D98F6E] border-2 border-[#F3EFE6] flex items-center justify-center text-white text-xs font-bold shadow-sm">
                SK
              </div>
              <div className="w-9 h-9 rounded-full bg-[#14251C] border-2 border-[#F3EFE6] flex items-center justify-center text-white text-xs font-bold shadow-sm">
                AL
              </div>
            </div>
            <p className="text-sm font-medium text-[#1E2A22]">
              <span className="font-bold text-[#6E8F6C]">2,400+</span> people checked in this week
            </p>
          </div>
        </motion.div>

        {/* Right Column 3D Canvas Sphere + Clean Floating Glass Cards */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-6 relative flex items-center justify-center"
        >
          {/* 3D Canvas Morphing Sphere */}
          <Hero3DCanvas mouse={mouse} />

          {/* Floating Glass Card 1 (Top Left) */}
          <div className="absolute top-6 left-2 sm:left-0 glass-card p-4 rounded-2xl animate-float-slow max-w-[210px] pointer-events-none hidden sm:block">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-6 rounded-full bg-[#6E8F6C]/20 flex items-center justify-center text-[#6E8F6C]">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-bold text-[#1E2A22]">Mental Wellbeing</span>
            </div>
            <p className="text-xs text-[#6B6F68] font-medium">Low energy · Mood · Focus</p>
          </div>

          {/* Floating Glass Card 2 (Bottom Right) */}
          <div className="absolute bottom-8 right-2 sm:right-0 glass-card p-4 rounded-2xl animate-float-reverse max-w-[210px] pointer-events-none hidden sm:block">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-6 rounded-full bg-[#D98F6E]/20 flex items-center justify-center text-[#D98F6E]">
                <Heart className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-bold text-[#1E2A22]">Physical Signals</span>
            </div>
            <p className="text-xs text-[#6B6F68] font-medium">Pain · Sleep · Digestion</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
