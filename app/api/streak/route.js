import { NextResponse } from "next/server";
import { getStreak } from "@/lib/db";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const deviceId = searchParams.get("deviceId");

    if (!deviceId) {
      return NextResponse.json({ streak: 0 });
    }

    const streak = await getStreak(deviceId);
    return NextResponse.json({ streak });
  } catch (err) {
    console.error("Streak API error:", err);
    return NextResponse.json({ streak: 0 });
  }
}
