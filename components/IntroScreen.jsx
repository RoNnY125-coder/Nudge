"use client";

import { motion } from "motion/react";
import { useEffect } from "react";

export default function IntroScreen({ onComplete }) {
  useEffect(() => {
    // Complete after 2.2 seconds
    const timer = setTimeout(() => {
      onComplete?.();
    }, 2200);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="intro-screen"
      initial={{ y: 0 }}
      exit={{ 
        y: "-100vh",
        transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } 
      }}
    >
      <div className="intro-content">
        <motion.h1
          initial={{ opacity: 0, letterSpacing: "-8px", scale: 0.9 }}
          animate={{ 
            opacity: [0, 1, 1, 0], 
            letterSpacing: ["-8px", "6px", "12px", "20px"],
            scale: [0.9, 1, 1.03, 1.1]
          }}
          transition={{ 
            duration: 2.0, 
            times: [0, 0.25, 0.8, 1],
            ease: "easeInOut" 
          }}
          className="intro-title"
        >
          NUDGE
        </motion.h1>
        
        <motion.div 
          className="intro-circle"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1, 1.1, 0], opacity: [0, 0.12, 0.12, 0] }}
          transition={{ duration: 2.0, times: [0, 0.25, 0.8, 1], ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
}
