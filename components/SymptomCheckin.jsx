"use client";

import { motion } from "motion/react";
import { useLenis } from "lenis/react";
import { Battery, Zap, Moon, Heart, Brain, Waves, Droplets, CircleHelp } from "lucide-react";

export default function SymptomCheckin({ selectedSymptoms, setSelectedSymptoms, freeText, setFreeText }) {
  const lenis = useLenis();

  const symptoms = [
    { label: "Fatigue", icon: Battery },
    { label: "Headaches", icon: Zap },
    { label: "Trouble sleeping", icon: Moon },
    { label: "Chest discomfort", icon: Heart },
    { label: "Anxiety / racing thoughts", icon: Brain },
    { label: "Stomach issues", icon: Droplets },
    { label: "Skin changes", icon: Waves },
    { label: "Just feeling \"off\"", icon: CircleHelp },
  ];

  const toggleSymptom = (label) => {
    if (selectedSymptoms.includes(label)) {
      setSelectedSymptoms(selectedSymptoms.filter(s => s !== label));
    } else {
      setSelectedSymptoms([...selectedSymptoms, label]);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.04 } }
  };

  const tagVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 20 } }
  };

  return (
    <section className="checkin" id="checkin">
      <div className="checkin-watermark">
        NUDGE
      </div>
      <div className="checkin-container">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          What's been bothering you lately?
        </motion.h2>
        
        <motion.p 
          className="subtext"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Select what you've been feeling. No wrong answers, no judgment.
        </motion.p>
        
        <motion.div 
          className="trust-badge"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          🔒 No account needed. Ever.
        </motion.div>
        
        <motion.div 
          className="tags-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {symptoms.map(({ label, icon: Icon }) => (
            <motion.button
              key={label}
              variants={tagVariants}
              className={`symptom-tag ${selectedSymptoms.includes(label) ? 'selected' : ''}`}
              onClick={() => toggleSymptom(label)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              transition={selectedSymptoms.includes(label) ? { type: "spring", stiffness: 400, damping: 15 } : {}}
            >
              <Icon size={18} /> {label}
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <textarea 
            className="checkin-textarea"
            placeholder="Or describe it in your own words..."
            value={freeText}
            onChange={(e) => setFreeText(e.target.value)}
          />
        </motion.div>
      </div>
    </section>
  );
}
