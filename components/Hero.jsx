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

export default function Hero() {
  const lenis = useLenis();

  const scrollToCheckin = () => {
    lenis?.scrollTo("#checkin", { duration: 1.2 });
  };

  return (
    <section className="hero" id="hero">
      <div className="hero-container">
        {/* Giant background text */}
        <motion.div
          className="hero-nudge-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          NUDGE
        </motion.div>

        {/* Meditating figure */}
        <motion.div
          className="hero-illustration"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -4, 0],
          }}
          transition={{
            opacity: { duration: 0.8, ease: "easeOut" },
            scale: { duration: 0.8, ease: "easeOut" },
            y: {
              duration: 4,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            },
          }}
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
          animate="visible"
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
