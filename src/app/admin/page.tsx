'use client';

import { useState, useEffect } from 'react';

interface Lead {
  id?: string;
  email: string;
  name?: string;
  heard_from?: string;
  source?: string;
  status?: string;
  created_at?: string;
}

export default function AdminPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<'supabase' | 'json' | 'checking'>('checking');

  useEffect(() => {
    fetch('/api/waitlist')
      .then(r => r.json())
      .then(data => {
        setLeads(data.leads || []);
        setSource(data.source || 'unknown');
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <main style={{ padding: '40px 24px', maxWidth: '900px', margin: '0 auto', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 800, letterSpacing: '-0.02em' }}>SortBox Waitlist</h1>
          <p style={{ color: '#666', fontSize: '14px', marginTop: '4px' }}>
            {leads.length} {leads.length === 1 ? 'person' : 'people'} on the founding list
            {source !== 'checking' && (
              <span style={{ marginLeft: '8px', padding: '2px 8px', background: source === 'supabase' ? '#dcfce7' : '#fef9e7', color: source === 'supabase' ? '#166534' : '#92400e', borderRadius: '4px', fontSize: '12px', fontWeight: 600 }}>
                {source === 'supabase' ? '✓ Supabase' : '📁 JSON backup'}
              </span>
            )}
          </p>
        </div>
        <a href="/" style={{ padding: '10px 20px', background: '#2D5A3D', color: 'white', borderRadius: '8px', textDecoration: 'none', fontWeight: 600, fontSize: '14px' }}>
          ← View landing page
        </a>
      </div>

      {loading ? (
        <p style={{ color: '#666' }}>Loading leads...</p>
      ) : leads.length === 0 ? (
        <div style={{ background: '#f5f5f0', borderRadius: '16px', padding: '60px 40px', textAlign: 'center' }}>
          <p style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>No leads yet</p>
          <p style={{ color: '#666', fontSize: '14px' }}>Share the landing page to start capturing waitlist signups!</p>
          <a href="/" style={{ display: 'inline-block', marginTop: '20px', color: '#2D5A3D', fontWeight: 600 }}>sortbox-pi.vercel.app →</a>
        </div>
      ) : (
        <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#fafaf8', borderBottom: '1px solid #e5e7eb' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 700, color: '#666', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Name</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 700, color: '#666', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Email</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 700, color: '#666', letterSpacing: '0.05em', textTransform: 'uppercase' }}>How they heard</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 700, color: '#666', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead, i) => (
                <tr key={lead.id || i} style={{ borderBottom: i < leads.length - 1 ? '1px solid #f0f0f0' : 'none' }}>
                  <td style={{ padding: '14px 16px', fontWeight: 600, fontSize: '14px' }}>{lead.name || '—'}</td>
                  <td style={{ padding: '14px 16px', color: '#333', fontSize: '14px' }}>{lead.email}</td>
                  <td style={{ padding: '14px 16px', color: '#666', fontSize: '14px', textTransform: 'capitalize' }}>{lead.heard_from || '—'}</td>
                  <td style={{ padding: '14px 16px', color: '#888', fontSize: '13px' }}>
                    {lead.created_at ? new Date(lead.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div style={{ marginTop: '40px', background: '#fafffe', border: '2px solid #2D5A3D', borderRadius: '16px', padding: '24px' }}>
        <h3 style={{ fontWeight: 700, fontSize: '16px', marginBottom: '12px' }}>Freddie's next steps to go live</h3>
        <ol style={{ color: '#333', fontSize: '14px', lineHeight: 2, paddingLeft: '20px' }}>
          <li>Run <code style={{ background: '#e8f5e9', padding: '2px 6px', borderRadius: '4px', fontSize: '13px' }}>~/Desktop/sortbox/SORTBOX-WAITLIST-SQL.sql</code> in <strong>Supabase SQL Editor</strong> to create the database table</li>
          <li>Add <code style={{ background: '#e8f5e9', padding: '2px 6px', borderRadius: '4px', fontSize: '13px' }}>SUPABASE_URL</code> + <code style={{ background: '#e8f5e9', padding: '2px 6px', borderRadius: '4px', fontSize: '13px' }}>SUPABASE_ANON_KEY</code> environment variables in Vercel dashboard (under project settings)</li>
          <li>Film 30-second product video (glass containers + drawer dividers, phone horizontal)</li>
          <li>Set up Gumroad or LemonSqueezy for £69/mo founding subscription</li>
          <li>Point sortbox.co (or similar) domain to Vercel</li>
        </ol>
      </div>
    </main>
  );
}
