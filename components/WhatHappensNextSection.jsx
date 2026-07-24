"use client";

import { motion } from "framer-motion";
import { HeartHandshake, BookOpen, MessageCircleHeart, Lock } from "lucide-react";

export default function WhatHappensNextSection() {
  const cards = [
    {
      badge: "Most popular",
      title: "Self Care",
      description: "Gentle practices based on what you're feeling right now.",
      bg: "bg-[#6E8F6C] text-white",
      badgeStyle: "bg-white/20 text-white",
      icon: HeartHandshake,
    },
    {
      badge: "Science-based",
      title: "Learn More",
      description: "Understand the signals your body sends and why they matter.",
      bg: "bg-[#D98F6E] text-white",
      badgeStyle: "bg-white/20 text-white",
      icon: BookOpen,
    },
    {
      badge: "Free first session",
      title: "Talk to Someone",
      description: "Connect with a trained listener when you need a real ear.",
      bg: "bg-white text-[#1E2A22] border border-[#E2DCD0]",
      badgeStyle: "bg-[#6E8F6C]/10 text-[#6E8F6C]",
      icon: MessageCircleHeart,
    },
  ];

  return (
    <section id="stories" className="py-24 px-4 md:px-8 max-w-7xl mx-auto space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#E8E2D5] border border-[#DCD5C5] text-xs font-semibold text-[#6E8F6C] uppercase tracking-wider">
          What happens next
        </div>
        <h2 className="font-serif-display text-4xl sm:text-5xl font-bold text-[#1E2A22] leading-tight">
          Your nudge points you somewhere real.
        </h2>
        <p className="text-lg text-[#6B6F68] leading-relaxed">
          Based on what you're feeling, we suggest one of three gentle next steps.
          No overwhelm.
        </p>
      </div>

      {/* 3 Interactive Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={idx}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className={`${card.bg} p-8 rounded-3xl space-y-6 shadow-lg relative flex flex-col justify-between overflow-hidden group cursor-pointer`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${card.badgeStyle}`}
                  >
                    {card.badge}
                  </span>
                  <Icon className="w-6 h-6 opacity-80 group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="font-serif-display text-3xl font-bold">
                  {card.title}
                </h3>
                <p className="text-sm leading-relaxed opacity-90">
                  {card.description}
                </p>
              </div>

              <div className="pt-4 flex items-center font-semibold text-sm gap-2">
                <span>Explore options</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Centered Privacy Lock Note */}
      <div className="text-center pt-4">
        <p className="inline-flex items-center gap-2 text-xs font-medium text-[#6B6F68] bg-[#E8E2D5]/60 px-4 py-2 rounded-full border border-[#DCD5C5]">
          <Lock className="w-3.5 h-3.5 text-[#6E8F6C]" />
          Your data never leaves your device. Nudge never diagnoses.
        </p>
      </div>
    </section>
  );
}
