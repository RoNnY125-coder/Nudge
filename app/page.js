"use client";

import { useState } from "react";
import IntroLoading from "@/components/IntroLoading";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WhyNudgeSection from "@/components/WhyNudgeSection";
import DailyCheckinSection from "@/components/DailyCheckinSection";
import YoureNotAloneSection from "@/components/YoureNotAloneSection";
import WhatHappensNextSection from "@/components/WhatHappensNextSection";
import DesignProcessSection from "@/components/DesignProcessSection";
import Footer3D from "@/components/Footer3D";

export default function Home() {
  const [introFinished, setIntroFinished] = useState(false);

  return (
    <main className="min-h-screen bg-[#F3EFE6] text-[#1E2A22] relative overflow-hidden">
      {/* Intro Preloader */}
      <IntroLoading onComplete={() => setIntroFinished(true)} />

      {/* Persistent Floating Navbar */}
      <Navbar />

      {/* Page Content */}
      <div className={`transition-opacity duration-700 ${introFinished ? "opacity-100" : "opacity-0"}`}>
        <HeroSection />
        <WhyNudgeSection />
        <DailyCheckinSection />
        <YoureNotAloneSection />
        <WhatHappensNextSection />
        <DesignProcessSection />
        <Footer3D />
      </div>
    </main>
  );
}
