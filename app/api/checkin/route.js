import { NextResponse } from "next/server";
import { createCheckin } from "@/lib/db";

const VALID_SYMPTOMS = new Set([
  "Tired",
  "Headache",
  "Low mood",
  "Can't focus",
  "Tight chest",
  "Gut discomfort",
  "Trouble sleeping",
  "Anxious",
  "Irritable",
  "Low energy",
  "Nausea",
  "Neck tension",
]);

export async function POST(request) {
  try {
    const body = await request.json();
    const { deviceId, symptoms, energyLevel, note } = body;

    // Server-side validation
    if (!deviceId || typeof deviceId !== "string") {
      return NextResponse.json({ error: "Invalid or missing device ID" }, { status: 400 });
    }

    if (!Array.isArray(symptoms)) {
      return NextResponse.json({ error: "Symptoms must be an array" }, { status: 400 });
    }

    const filteredSymptoms = symptoms.filter((s) => VALID_SYMPTOMS.has(s));

    if (energyLevel !== undefined && (typeof energyLevel !== "number" || energyLevel < 1 || energyLevel > 10)) {
      return NextResponse.json({ error: "Energy level must be an integer between 1 and 10" }, { status: 400 });
    }

    const sanitizedNote = typeof note === "string" ? note.slice(0, 500) : "";

    const { data, error } = await createCheckin({
      deviceId,
      symptoms: filteredSymptoms,
      energyLevel: energyLevel || 5,
      note: sanitizedNote,
    });

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: "Failed to record check-in" }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("Check-in API error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
