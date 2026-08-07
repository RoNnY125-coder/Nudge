import { supabase } from "./supabase";

// Mock in-memory storage fallback for local testing when Supabase env keys are not provided
const inMemoryCheckins = [
  { device_id: "demo-device", symptoms: ["Tired", "Trouble sleeping"], energy_level: 4, created_at: new Date().toISOString() },
  { device_id: "demo-device", symptoms: ["Anxious", "Can't focus"], energy_level: 5, created_at: new Date(Date.now() - 86400000).toISOString() },
  { device_id: "demo-device", symptoms: ["Tired", "Low mood"], energy_level: 3, created_at: new Date(Date.now() - 2 * 86400000).toISOString() },
  { device_id: "demo-device", symptoms: ["Headache"], energy_level: 6, created_at: new Date(Date.now() - 3 * 86400000).toISOString() },
  { device_id: "demo-device", symptoms: ["Tired", "Tight chest"], energy_level: 4, created_at: new Date(Date.now() - 4 * 86400000).toISOString() },
];

const isConfigured = () => {
  return process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== "https://placeholder-url.supabase.co";
};

/**
 * Creates a new check-in record in Supabase (or in-memory fallback).
 */
export async function createCheckin({ deviceId, symptoms, energyLevel, note = "" }) {
  if (!isConfigured()) {
    const record = {
      id: "mock-" + Date.now(),
      device_id: deviceId,
      symptoms,
      energy_level: energyLevel,
      note,
      created_at: new Date().toISOString(),
    };
    inMemoryCheckins.push(record);
    return { data: record, error: null };
  }

  const { data, error } = await supabase
    .from("checkins")
    .insert([
      {
        device_id: deviceId,
        symptoms,
        energy_level: energyLevel,
        note: note || null,
      },
    ])
    .select()
    .single();

  return { data, error };
}

/**
 * Fetches check-in history for a specific device.
 */
export async function getCheckinHistory(deviceId) {
  if (!isConfigured()) {
    const userCheckins = inMemoryCheckins.filter((c) => c.device_id === deviceId);
    return { data: userCheckins, error: null };
  }

  const { data, error } = await supabase
    .from("checkins")
    .select("*")
    .eq("device_id", deviceId)
    .order("created_at", { ascending: false });

  return { data, error };
}

/**
 * Calculates consecutive active check-in days (streak) for a device.
 */
export async function getStreak(deviceId) {
  const { data: history } = await getCheckinHistory(deviceId);
  if (!history || history.length === 0) return 0;

  const dates = history
    .map((c) => new Date(c.created_at).toISOString().split("T")[0])
    .filter((v, i, a) => a.indexOf(v) === i)
    .sort()
    .reverse();

  let streak = 0;
  const todayStr = new Date().toISOString().split("T")[0];
  const yesterdayDate = new Date(Date.now() - 86400000);
  const yesterdayStr = yesterdayDate.toISOString().split("T")[0];

  // Streak is active if user checked in today or yesterday
  let checkDate = dates[0] === todayStr ? new Date() : (dates[0] === yesterdayStr ? yesterdayDate : null);
  if (!checkDate) return 0;

  let expected = checkDate.toISOString().split("T")[0];
  for (const dateStr of dates) {
    if (dateStr === expected) {
      streak++;
      const prevDay = new Date(new Date(expected).getTime() - 86400000);
      expected = prevDay.toISOString().split("T")[0];
    } else {
      break;
    }
  }

  return streak;
}

/**
 * Aggregates symptom statistics for the Normalizer component.
 */
export async function getCheckinStats() {
  if (!isConfigured()) {
    const totalCheckins = inMemoryCheckins.length + 2400; // Cold-start baseline
    const counts = {
      "Tired": 1728,
      "Trouble sleeping": 1392,
      "Can't focus": 1080,
      "Anxious": 1512,
    };
    return {
      totalCheckins,
      symptomPercentages: {
        "Tired / low energy": Math.round((counts["Tired"] / totalCheckins) * 100),
        "Trouble sleeping": Math.round((counts["Trouble sleeping"] / totalCheckins) * 100),
        "Can't focus": Math.round((counts["Can't focus"] / totalCheckins) * 100),
        "Anxious": Math.round((counts["Anxious"] / totalCheckins) * 100),
      },
    };
  }

  const { data, error, count } = await supabase
    .from("checkins")
    .select("symptoms", { count: "exact" });

  if (error || !data) {
    return { totalCheckins: 2400, symptomPercentages: {} };
  }

  const total = (count || 0) + 2400; // Blended with baseline for cold start
  const symptomCounts = {};

  data.forEach((row) => {
    (row.symptoms || []).forEach((sym) => {
      symptomCounts[sym] = (symptomCounts[sym] || 0) + 1;
    });
  });

  return {
    totalCheckins: total,
    symptomPercentages: symptomCounts,
  };
}
