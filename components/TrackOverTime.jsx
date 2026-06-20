"use client";

import { motion } from "motion/react";
import { useLenis } from "lenis/react";
import { Bell, Check } from "lucide-react";
import { useState } from "react";

export default function TrackOverTime() {
  const lenis = useLenis();
  const [acknowledged, setAcknowledged] = useState(false);

  const streakDays = [true, true, true, true, true, false, false];

  const streakContainerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };

  const circleVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 400, damping: 15 } }
  };

  return (
    <section className="track" id="track">
      <div className="track-container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Small steps. Big difference.
        </motion.h2>
        
        <motion.p 
          className="subtext"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Check in whenever you need to. Your body keeps track, so you don't have to worry alone.
        </motion.p>

        <motion.div 
          className="streak-section"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="streak-label">Your Check-in Streak</p>
          <motion.div 
            className="streak-circles"
            variants={streakContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {streakDays.map((filled, idx) => (
              <motion.div 
                key={idx} 
                className={`streak-circle ${filled ? 'filled' : ''}`} 
                variants={circleVariants}
              >
                {filled && <Check size={16} className="check" />}
              </motion.div>
            ))}
          </motion.div>
          <div className="streak-badge">
            5 day streak 🌱
          </div>
        </motion.div>

        {!acknowledged && (
          <motion.div 
            className="reminder-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="reminder-card-icon">
              <Bell size={32} />
            </div>
            <h3>You've mentioned this 3 times.</h3>
            <p>Want to talk to someone? No pressure — just an option.</p>
            <div className="reminder-buttons">
              <motion.button 
                className="btn-outline" 
                whileHover={{ scale: 1.03 }} 
                whileTap={{ scale: 0.97 }}
                onClick={() => setAcknowledged(true)}
              >
                Maybe later
              </motion.button>
              <motion.button 
                className="btn-primary" 
                whileHover={{ scale: 1.03 }} 
                whileTap={{ scale: 0.97 }}
                onClick={() => setAcknowledged(true)}
              >
                Connect me &rarr;
              </motion.button>
            </div>
          </motion.div>
        )}

        <motion.div 
          className="final-cta-container"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <motion.span 
            className="btn-final-glow"
            animate={{ opacity: [0.3, 0.5, 0.3] }} 
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          ></motion.span>
          <motion.button 
            className="btn-final"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => lenis?.scrollTo("#checkin", { duration: 1.2 })}
          >
            Start Your First Check-in
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
