-- Nudge Database Schema for Supabase PostgreSQL

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Check-ins table
CREATE TABLE IF NOT EXISTS public.checkins (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  device_id TEXT NOT NULL,
  symptoms TEXT[] NOT NULL,
  energy_level INT CHECK (energy_level BETWEEN 1 AND 10),
  note TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Indices for rapid querying
CREATE INDEX IF NOT EXISTS idx_checkins_device_id ON public.checkins(device_id);
CREATE INDEX IF NOT EXISTS idx_checkins_created_at ON public.checkins(created_at);

-- Row Level Security (RLS) Policies — Allow public inserts and reads by device_id
ALTER TABLE public.checkins ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public check-in insertion" 
  ON public.checkins 
  FOR INSERT 
  TO anon, authenticated 
  WITH CHECK (true);

CREATE POLICY "Allow reading check-ins" 
  ON public.checkins 
  FOR SELECT 
  TO anon, authenticated 
  USING (true);
