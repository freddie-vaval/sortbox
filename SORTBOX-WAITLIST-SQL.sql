-- SortBox Waitlist Table
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/sqwvmvkznzxbabgeqswq/sql

CREATE TABLE IF NOT EXISTS sortbox_waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  source TEXT DEFAULT 'sortbox-landing',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'customer')),
  name TEXT,
  phone TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE sortbox_waitlist ENABLE ROW LEVEL SECURITY;

-- Allow inserts from anon (our landing page)
CREATE POLICY "Allow anon inserts" ON sortbox_waitlist
  FOR INSERT TO anon WITH CHECK (true);

-- Allow reads for authenticated users (Freddie)
CREATE POLICY "Allow authenticated reads" ON sortbox_waitlist
  FOR SELECT TO authenticated USING (true);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER sortbox_waitlist_updated_at
  BEFORE UPDATE ON sortbox_waitlist
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();