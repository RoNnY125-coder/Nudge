"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLenis } from "lenis/react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Check-in", target: "#checkin" },
  { label: "How it helps", target: "#normalizer" },
  { label: "Track", target: "#track" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const lenis = useLenis();

  function scrollTo(target) {
    if (lenis) {
      lenis.scrollTo(target, { duration: 1.2 });
    }
  }

  function handleLinkClick(target) {
    setMenuOpen(false);
    scrollTo(target);
  }

  return (
    <nav className="navbar">
      <motion.button
        className="navbar-logo"
        onClick={() => scrollTo(0)}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
      >
        Nudge
      </motion.button>

      <div className="navbar-links-container">
        {navLinks.map((link) => (
          <motion.button
            key={link.target}
            className="navbar-link"
            onClick={() => scrollTo(link.target)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            {link.label}
          </motion.button>
        ))}
      </div>

      <motion.button
        className="btn-primary navbar-cta"
        onClick={() => scrollTo("#checkin")}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
      >
        Start Checking →
      </motion.button>

      <motion.button
        className="hamburger"
        onClick={() => setMenuOpen((prev) => !prev)}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </motion.button>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={`mobile-menu ${menuOpen ? "open" : ""}`}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            {navLinks.map((link) => (
              <motion.button
                key={link.target}
                className="mobile-menu-link"
                onClick={() => handleLinkClick(link.target)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                {link.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
