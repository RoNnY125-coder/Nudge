"use client";

import { motion } from "motion/react";
import { Leaf, BookOpen, MessageCircle } from "lucide-react";

export default function GentleNextStep() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const cards = [
    { icon: Leaf, title: "Self Care", desc: "Simple things you can do right now" },
    { icon: BookOpen, title: "Learn More", desc: "Understand what this might mean" },
    { icon: MessageCircle, title: "Talk to Someone", desc: "Connect with a real professional" }
  ];

  return (
    <section className="next-step" id="next-step">
      <div className="next-step-container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Take it at your own pace.
        </motion.h2>
        
        <motion.p 
          className="subtext"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          No pressure. Choose what feels right for you today.
        </motion.p>

        <motion.div 
          className="cards-row"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {cards.map(({ icon: Icon, title, desc }, index) => (
            <motion.div 
              key={index}
              className="action-card"
              variants={cardVariants}
              whileHover={{ y: -4, boxShadow: "0 8px 30px rgba(0,0,0,0.08)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="action-card-icon">
                <Icon size={48} />
              </div>
              <h3>{title}</h3>
              <p>{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
