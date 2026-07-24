"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function DesignProcessSection() {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);

  const steps = [
    {
      num: "01",
      title: "Discovery",
      desc: "30 user interviews. Finding the emotional truth behind health anxiety.",
      accent: "bg-[#6E8F6C]",
    },
    {
      num: "02",
      title: "Framing",
      desc: "Defining calm as a design principle. Prototyping tone, not just interface.",
      accent: "bg-[#D98F6E]",
    },
    {
      num: "03",
      title: "Design",
      desc: "100+ iterations on the check-in flow. Every word, every colour, earned.",
      accent: "bg-[#14251C]",
    },
    {
      num: "04",
      title: "Testing",
      desc: "Usability tested with people mid-anxiety episode. Calm confirmed.",
      accent: "bg-[#4B6B4A]",
    },
    {
      num: "05",
      title: "Shipped",
      desc: "2,400+ weekly active users. NPS 72. Feature in Awwwards shortlist.",
      accent: "bg-[#D98F6E]",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
              end: "bottom 80%",
              scrub: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-24 px-4 md:px-8 max-w-7xl mx-auto space-y-16">
      {/* Mini Repeated Navbar Divider */}
      <div className="flex items-center justify-center gap-4 py-4 opacity-50">
        <div className="h-[1px] bg-[#6B6F68]/30 flex-1" />
        <span className="font-serif-display text-sm font-bold text-[#6E8F6C] tracking-widest uppercase">
          ✦ Nudge Design Process ✦
        </span>
        <div className="h-[1px] bg-[#6B6F68]/30 flex-1" />
      </div>

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#E8E2D5] border border-[#DCD5C5] text-xs font-semibold text-[#6E8F6C] uppercase tracking-wider">
          Design process
        </div>
        <h2 className="font-serif-display text-4xl sm:text-5xl font-bold text-[#1E2A22] leading-tight">
          Built from the inside out.
        </h2>
        <p className="text-lg text-[#6B6F68] leading-relaxed">
          Nudge was shaped from research to release — obsessing over every detail of how it feels to use.
        </p>
      </div>

      {/* Horizontal 5-Step Timeline with Scrub Line */}
      <div className="relative py-8">
        {/* Scrub Line Background */}
        <div className="hidden md:block absolute top-14 left-12 right-12 h-1 bg-[#E2DCD0] rounded-full z-0" />
        <div
          ref={lineRef}
          className="hidden md:block absolute top-14 left-12 right-12 h-1 bg-[#6E8F6C] rounded-full z-0 origin-left scale-x-0"
        />

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10">
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center text-center space-y-4 group">
              <div
                className={`w-12 h-12 rounded-full ${step.accent} text-white font-bold text-sm flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}
              >
                {step.num}
              </div>
              <h3 className="font-serif-display text-xl font-bold text-[#1E2A22]">
                {step.title}
              </h3>
              <p className="text-xs text-[#6B6F68] leading-relaxed max-w-[200px]">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
