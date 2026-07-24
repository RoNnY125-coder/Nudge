"use client";

import { motion } from "motion/react";
import { useLenis } from "lenis/react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function Hero({ show }) {
  const lenis = useLenis();

  const scrollToCheckin = () => {
    lenis?.scrollTo("#checkin", { duration: 1.2 });
  };

  return (
    <section className="hero" id="hero">
      {/* Animated gradient blobs in the background */}
      <div className="hero-bg-blobs">
        <motion.div 
          className="bg-blob blob-1"
          animate={{
            x: [0, 40, -20, 0],
            y: [0, -50, 30, 0],
            scale: [1, 1.15, 0.9, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="bg-blob blob-2"
          animate={{
            x: [0, -50, 30, 0],
            y: [0, 30, -50, 0],
            scale: [1, 0.85, 1.15, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="bg-blob blob-3"
          animate={{
            x: [0, 30, -35, 0],
            y: [0, 50, -30, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="hero-container">
        {/* Giant background text (Watermark) */}
        <motion.h1
          className="hero-nudge-text"
          initial={{ opacity: 0, scale: 0.85, letterSpacing: "-0.05em" }}
          animate={show ? { opacity: 0.35, scale: 1, letterSpacing: "0.02em" } : { opacity: 0, scale: 0.85 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          NUDGE
        </motion.h1>

        {/* Meditating figure */}
        <motion.div
          className="hero-illustration"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={show ? {
            opacity: 1,
            scale: 1,
            y: [0, -8, 0],
          } : { opacity: 0, scale: 0.9 }}
          transition={show ? {
            opacity: { duration: 1.0, ease: "easeOut", delay: 0.3 },
            scale: { duration: 1.0, ease: "easeOut", delay: 0.3 },
            y: {
              duration: 5,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            },
          } : { duration: 0.2 }}
        >
          <img 
            src="/assets/hero-figure.svg?v=2" 
            alt="Meditating figure illustration" 
            style={{ width: '100%', height: 'auto', display: 'block' }} 
          />
        </motion.div>

        {/* Hero content */}
        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate={show ? "visible" : "hidden"}
        >
          <motion.div className="hero-card" variants={itemVariants}>
            <h1>
              Not a diagnosis.
              <br />
              Just a <span className="accent">nudge</span>.
            </h1>
            <p>
              A safe space to understand what your body is telling you — no
              fear, no judgment, no rush.
            </p>
          </motion.div>

          <div className="hero-buttons">
            <motion.button
              className="btn-primary"
              onClick={scrollToCheckin}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Start Checking
            </motion.button>
            <motion.button
              className="btn-secondary"
              onClick={scrollToCheckin}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              See how it works ↓
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
