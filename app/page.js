"use client";

import { useState, Suspense, lazy } from "react";
import IntroLoading from "@/components/IntroLoading";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WhyNudgeSection from "@/components/WhyNudgeSection";
import DailyCheckinSection from "@/components/DailyCheckinSection";
import WhatHappensNextSection from "@/components/WhatHappensNextSection";
import DesignProcessSection from "@/components/DesignProcessSection";

// Lazy load non-hero 3D sections for fast initial bundle
const YoureNotAloneSection = lazy(() => import("@/components/YoureNotAloneSection"));
const Footer3D = lazy(() => import("@/components/Footer3D"));

export default function Home() {
  const [introFinished, setIntroFinished] = useState(false);

  return (
    <main className="min-h-screen bg-[#F3EFE6] text-[#1E2A22] relative">
      {/* Intro Preloader */}
      <IntroLoading onComplete={() => setIntroFinished(true)} />

      {/* Persistent Floating Navbar */}
      <Navbar />

      {/* Page Content — fade in after intro */}
      <div
        className="transition-opacity duration-700"
        style={{ opacity: introFinished ? 1 : 0 }}
      >
        <HeroSection />
        <WhyNudgeSection />
        <DailyCheckinSection />

        <Suspense fallback={<div className="py-28 bg-[#14251C]" />}>
          <YoureNotAloneSection />
        </Suspense>

        <WhatHappensNextSection />
        <DesignProcessSection />

        <Suspense fallback={<div className="py-20 bg-[#14251C]" />}>
          <Footer3D />
        </Suspense>
      </div>
    </main>
  );
}
