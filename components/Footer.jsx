"use client";

import { motion } from "motion/react";

export default function Footer() {
  return (
    <footer className="footer">
      {/* Layer 1 is the CSS gradient background */}

      {/* Layer 2: Static Mountains (z-index 2) */}
      <div className="footer-mountains">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path fill="#065f5f" d="M0,220 L120,140 L260,200 L400,100 L580,180 L740,80 L900,160 L1080,110 L1240,180 L1440,90 L1440,320 L0,320 Z" />
          <path fill="#087070" d="M0,260 L160,190 L340,240 L500,160 L680,220 L860,140 L1040,210 L1220,150 L1440,230 L1440,320 L0,320 Z" />
        </svg>
      </div>

      {/* Layer 3: NUDGE text animating up (z-index 3) */}
      <motion.div 
        className="footer-nudge-text"
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        NUDGE
      </motion.div>

      {/* Layer 4: Trees animating up (z-index 4, overlaps text) */}
      <motion.div 
        className="footer-trees"
        initial={{ y: 80, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <svg viewBox="0 0 1440 250" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          {/* Base ground to anchor trees */}
          <rect x="0" y="200" width="1440" height="50" fill="#054d4d" />
          
          {/* Pine trees of varying heights */}
          <path fill="#054d4d" d="M20,200 L50,80 L80,200 Z" />
          <path fill="#054d4d" d="M100,200 L120,120 L140,200 Z" />
          <path fill="#054d4d" d="M180,200 L230,50 L280,200 Z" />
          <path fill="#054d4d" d="M300,200 L340,110 L380,200 Z" />
          <path fill="#054d4d" d="M420,200 L470,60 L520,200 Z" />
          <path fill="#054d4d" d="M560,200 L590,130 L620,200 Z" />
          <path fill="#054d4d" d="M660,200 L710,40 L760,200 Z" />
          <path fill="#054d4d" d="M800,200 L840,100 L880,200 Z" />
          <path fill="#054d4d" d="M920,200 L960,70 L1000,200 Z" />
          <path fill="#054d4d" d="M1040,200 L1080,140 L1120,200 Z" />
          <path fill="#054d4d" d="M1160,200 L1210,60 L1260,200 Z" />
          <path fill="#054d4d" d="M1300,200 L1340,90 L1380,200 Z" />
          <path fill="#054d4d" d="M1390,200 L1415,120 L1440,200 Z" />
        </svg>
      </motion.div>

      {/* Layer 5: Copyright (z-index 5) */}
      <motion.div 
        className="footer-copyright"
        initial={{ opacity: 0 }} 
        whileInView={{ opacity: 1 }} 
        viewport={{ once: true }} 
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        &copy; 2026 &middot; Built for real people
      </motion.div>
    </footer>
  );
}
