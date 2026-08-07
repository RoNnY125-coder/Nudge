import { NextResponse } from "next/server";
import { getCheckinStats } from "@/lib/db";

export async function GET() {
  try {
    const stats = await getCheckinStats();
    return NextResponse.json(stats);
  } catch (err) {
    console.error("Stats API error:", err);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
