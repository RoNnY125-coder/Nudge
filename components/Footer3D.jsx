"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Footer3D() {
  const footerRef = useRef(null);
  const wordmarkRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (wordmarkRef.current) {
        gsap.fromTo(
          wordmarkRef.current,
          { opacity: 0, scale: 0.9, y: 20 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 85%",
            },
          }
        );
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="bg-[#14251C] text-[#F3EFE6] relative overflow-hidden pt-20 pb-12 border-t border-white/10"
    >
      {/* Optimized Background Glow */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_50%_40%,_#6E8F6C_0%,_transparent_60%)]" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 space-y-16">
        {/* Giant Stylized NUDGE Wordmark */}
        <div ref={wordmarkRef} className="space-y-4 text-center">
          <div className="h-36 sm:h-52 w-full flex items-center justify-center">
            <h1 className="font-serif-display text-7xl sm:text-9xl md:text-[140px] font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-[#7FA07A] via-[#F3EFE6] to-[#D98F6E] select-none hover:scale-105 transition-transform duration-500">
              NUDGE
            </h1>
          </div>
          <p className="text-sm sm:text-base font-serif italic text-[#7FA07A] tracking-wider">
            Not a diagnosis. Just a nudge.
          </p>
        </div>

        {/* Center Pill CTA */}
        <div className="flex justify-center">
          <motion.a
            href="#checkin"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative group px-8 py-4 rounded-full bg-[#6E8F6C] text-white font-semibold text-base shadow-xl overflow-hidden flex items-center gap-2"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#7FA07A] to-[#D98F6E] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10">Start your check-in — free</span>
          </motion.a>
        </div>

        {/* Links, Socials & Bottom Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center border-t border-white/10 pt-12">
          {/* Left Links */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-xs font-semibold text-[#F3EFE6]/80">
            <a href="#" className="hover:text-[#7FA07A] transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-[#7FA07A] transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-[#7FA07A] transition-colors">
              Accessibility
            </a>
            <a href="#" className="hover:text-[#7FA07A] transition-colors">
              Blog
            </a>
          </div>

          {/* Center Copyright */}
          <div className="text-center text-xs text-[#F3EFE6]/60">
            © {new Date().getFullYear()} Nudge. Built for calm check-ins.
          </div>

          {/* Right Socials */}
          <div className="flex items-center justify-center md:justify-end gap-4 text-[#F3EFE6]/80">
            <motion.a
              href="#"
              aria-label="Twitter"
              whileHover={{ y: -3 }}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </motion.a>
            <motion.a
              href="#"
              aria-label="Instagram"
              whileHover={{ y: -3 }}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <svg className="w-5 h-5 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </motion.a>
            <motion.a
              href="#"
              aria-label="LinkedIn"
              whileHover={{ y: -3 }}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.78a1.6 1.6 0 1 0 1.6 1.6 1.6 1.6 0 0 0-1.6-1.6z"/>
              </svg>
            </motion.a>
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              whileHover={{ y: -3 }}
              className="p-2.5 rounded-full bg-[#1E3427] hover:bg-[#6E8F6C] text-[#F3EFE6] transition-colors ml-2"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}
