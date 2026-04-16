import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';

const JSON_FALLBACK = '/tmp/sortbox-waitlist.json';

// Supabase config — set in Vercel environment variables
const SB_URL = process.env.SUPABASE_URL;
const SB_KEY = process.env.SUPABASE_ANON_KEY;

interface WaitlistEntry {
  email: string;
  name?: string;
  heard_from?: string;
  source?: string;
  created_at?: string;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function saveToJson(entry: WaitlistEntry): Promise<void> {
  let entries: WaitlistEntry[] = [];
  try {
    const raw = await fs.readFile(JSON_FALLBACK, 'utf-8');
    entries = JSON.parse(raw);
  } catch {
    entries = [];
  }
  entries.push({ ...entry, created_at: new Date().toISOString() });
  await fs.writeFile(JSON_FALLBACK, JSON.stringify(entries, null, 2));
}

async function saveToSupabase(entry: WaitlistEntry): Promise<boolean> {
  if (!SB_URL || !SB_KEY) return false;
  try {
    const body = {
      email: entry.email,
      name: entry.name || null,
      source: entry.source || 'sortbox-landing',
      status: 'pending',
    };
    const res = await fetch(`${SB_URL}/rest/v1/sortbox_waitlist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: SB_KEY,
        Authorization: `Bearer ${SB_KEY}`,
        Prefer: 'return=minimal',
      },
      body: JSON.stringify(body),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, name, heard_from } = body;

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Valid email address is required' },
        { status: 400 }
      );
    }

    const entry: WaitlistEntry = {
      email: email.trim().toLowerCase(),
      name: name?.trim() || undefined,
      heard_from: heard_from?.trim() || undefined,
      source: req.headers.get('referer') || 'direct',
    };

    // Always save to JSON (never fails — local fallback)
    await saveToJson(entry);

    // Also try Supabase (best effort — continues even if it fails)
    await saveToSupabase(entry);

    return NextResponse.json({
      success: true,
      message: "You're on the founding list! We'll be in touch with your founding member details soon.",
    });
  } catch (err) {
    console.error('[waitlist] POST error:', err);
    return NextResponse.json({ error: 'Server error — please try again' }, { status: 500 });
  }
}

export async function GET() {
  // Admin-only endpoint — for Freddie's internal use
  // In production: add authentication check
  try {
    if (SB_URL && SB_KEY) {
      const res = await fetch(`${SB_URL}/rest/v1/sortbox_waitlist?order=created_at.desc`, {
        headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` },
      });
      if (res.ok) {
        const data = await res.json();
        return NextResponse.json({ leads: data, source: 'supabase' });
      }
    }

    const raw = await fs.readFile(JSON_FALLBACK, 'utf-8');
    const entries = JSON.parse(raw);
    return NextResponse.json({ leads: entries, source: 'json' });
  } catch {
    return NextResponse.json({ leads: [], source: 'json' });
  }
}