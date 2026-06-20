"use client";

import { motion } from "motion/react";
import { useLenis } from "lenis/react";

export default function Normalizer({ selectedSymptoms }) {
  const lenis = useLenis();

  const symptomText = selectedSymptoms?.length > 0 ? selectedSymptoms[0].toLowerCase() : "[selected symptom]";

  return (
    <section className="normalizer" id="normalizer">
      <div className="normalizer-container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          You're not alone in this.
        </motion.h2>

        <motion.div 
          className="stat-card"
          initial={{ opacity: 0, scale: 0.95 }} 
          whileInView={{ opacity: 1, scale: 1 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="stat-card-bg"></div>
          
          <motion.div 
            className="stat-number"
            animate={{ opacity: [1, 0.8, 1] }} 
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            2,400+
          </motion.div>
          
          <p className="stat-label">people felt the same this week</p>
          <p className="stat-caption">Most caught it early — and felt better within days.</p>
        </motion.div>

        <motion.div 
          className="reframe-text"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p>Feeling {symptomText} doesn't mean something is seriously wrong.</p>
          <p>It just means it's worth understanding.</p>
        </motion.div>
      </div>
    </section>
  );
}
