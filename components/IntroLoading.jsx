"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function IntroLoading({ onComplete }) {
  const [isSplitting, setIsSplitting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Stage 1: Hold full text for 1.1s, then trigger split animation
    const timer1 = setTimeout(() => {
      setIsSplitting(true);
    }, 1100);

    // Stage 2: Finish curtain exit after 0.85s of splitting
    const timer2 = setTimeout(() => {
      setIsDone(true);
      if (onComplete) onComplete();
    }, 1950);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  if (isDone) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[10000] pointer-events-none select-none overflow-hidden">
        {/* TOP HALF PANEL & TOP HALF TEXT */}
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: isSplitting ? "-100%" : 0 }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          className="absolute inset-x-0 top-0 h-[50vh] bg-gradient-to-b from-[#1E382A] via-[#14251C] to-[#112018] overflow-hidden flex items-end justify-center border-b border-[#6E8F6C]/20"
        >
          <div className="translate-y-[50%] flex items-center justify-center">
            <h1 className="font-serif-display text-[18vw] sm:text-[20vw] font-black text-[#F3EFE6] tracking-tighter leading-none uppercase select-none">
              NUDGE
            </h1>
          </div>
        </motion.div>

        {/* BOTTOM HALF PANEL & BOTTOM HALF TEXT */}
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: isSplitting ? "100%" : 0 }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          className="absolute inset-x-0 bottom-0 h-[50vh] bg-gradient-to-t from-[#0D1812] via-[#14251C] to-[#112018] overflow-hidden flex items-start justify-center border-t border-[#6E8F6C]/20"
        >
          <div className="-translate-y-[50%] flex items-center justify-center">
            <h1 className="font-serif-display text-[18vw] sm:text-[20vw] font-black text-[#F3EFE6] tracking-tighter leading-none uppercase select-none">
              NUDGE
            </h1>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
