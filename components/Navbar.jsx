"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useMotionValue, useSpring } from "framer-motion";

function MagneticLink({ children, href }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    x.set(distanceX * 0.25);
    y.set(distanceY * 0.25);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="px-4 py-2 text-sm text-[#1E2A22] font-medium hover:text-[#6E8F6C] transition-colors rounded-full relative group"
    >
      {children}
      <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-[#6E8F6C] scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full" />
    </motion.a>
  );
}

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Shadow & shrinking toggle
      if (currentScrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Hide on scroll down, reveal on scroll up
      if (currentScrollY > 100 && currentScrollY > lastScrollY.current + 5) {
        setHidden(true);
      } else if (currentScrollY < lastScrollY.current - 5) {
        setHidden(false);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: -100, opacity: 0 },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-6 inset-x-0 z-50 flex justify-center px-4 pointer-events-none"
    >
      <div
        className={`pointer-events-auto flex items-center justify-between transition-all duration-300 rounded-full glass-pill ${
          scrolled ? "py-2.5 px-5 shadow-lg max-w-4xl" : "py-3 px-6 max-w-5xl"
        } w-full`}
      >
        {/* Left Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-full bg-[#6E8F6C] flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
            <div className="w-3.5 h-3.5 rounded-full bg-[#D98F6E]" />
          </div>
          <span className="font-serif-display text-xl font-bold text-[#1E2A22] tracking-tight">
            Nudge
          </span>
        </a>

        {/* Center / Right Links */}
        <nav className="hidden md:flex items-center gap-1">
          <MagneticLink href="#how-it-works">How it works</MagneticLink>
          <MagneticLink href="#science">Science</MagneticLink>
          <MagneticLink href="#stories">Stories</MagneticLink>
          <MagneticLink href="#about">About</MagneticLink>
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-3">
          <motion.a
            href="#checkin"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="px-5 py-2.5 rounded-full bg-[#14251C] text-white text-sm font-semibold hover:bg-[#6E8F6C] transition-colors shadow-sm"
          >
            Start free
          </motion.a>
        </div>
      </div>
    </motion.header>
  );
}
