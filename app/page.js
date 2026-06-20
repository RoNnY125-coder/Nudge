"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SymptomCheckin from "@/components/SymptomCheckin";
import Normalizer from "@/components/Normalizer";
import GentleNextStep from "@/components/GentleNextStep";
import TrackOverTime from "@/components/TrackOverTime";
import Footer from "@/components/Footer";

export default function Home() {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [freeText, setFreeText] = useState("");

  return (
    <main>
      <Navbar />
      <Hero />
      <SymptomCheckin 
        selectedSymptoms={selectedSymptoms} 
        setSelectedSymptoms={setSelectedSymptoms}
        freeText={freeText}
        setFreeText={setFreeText}
      />
      <Normalizer selectedSymptoms={selectedSymptoms} />
      <GentleNextStep />
      <TrackOverTime />
      <Footer />
    </main>
  );
}
