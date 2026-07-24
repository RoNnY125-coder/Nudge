"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShieldAlert, SearchX, LineChart } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function WhyNudgeSection() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: ShieldAlert,
      title: "Symptoms get dismissed",
      description:
        "We dismiss symptoms and stay distracted until we can't. Nudge normalises checking in.",
      accent: "bg-[#6E8F6C]/10 text-[#6E8F6C]",
    },
    {
      icon: SearchX,
      title: "Googling makes it worse",
      description:
        "Search anxiety is real. Nudge replaces doom-scrolling with calm, context-aware guidance.",
      accent: "bg-[#D98F6E]/10 text-[#D98F6E]",
    },
    {
      icon: LineChart,
      title: "Patterns go unnoticed",
      description:
        "Your body sends the same signal ten Tuesdays in a row before you connect the dots. We do it for you.",
      accent: "bg-[#14251C]/10 text-[#14251C]",
    },
  ];

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="py-24 px-4 md:px-8 max-w-7xl mx-auto"
    >
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#E8E2D5] border border-[#DCD5C5] text-xs font-semibold text-[#6E8F6C] uppercase tracking-wider">
          Why Nudge exists
        </div>
        <h2 className="font-serif-display text-4xl sm:text-5xl font-bold text-[#1E2A22] leading-tight">
          Most people ignore their body until it demands attention.
        </h2>
        <p className="text-lg text-[#6B6F68] leading-relaxed">
          By the time you visit a doctor, you've been brushing off signals for
          weeks. Nudge helps you catch them early — gently, without alarm.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <div
              key={idx}
              ref={(el) => (cardsRef.current[idx] = el)}
              className="glass-card p-8 rounded-3xl space-y-5 hover:-translate-y-1.5 transition-transform duration-300 group"
            >
              <div
                className={`w-14 h-14 rounded-2xl ${feature.accent} flex items-center justify-center group-hover:scale-110 transition-transform`}
              >
                <Icon className="w-7 h-7" />
              </div>
              <h3 className="font-serif-display text-2xl font-bold text-[#1E2A22]">
                {feature.title}
              </h3>
              <p className="text-[#6B6F68] leading-relaxed">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
