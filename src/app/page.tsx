'use client';

import { useState } from 'react';

export default function HomePage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [heardFrom, setHeardFrom] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, heard_from: heardFrom }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus('success');
        setMessage(data.message || "You're on the founding list!");
        setEmail('');
        setName('');
        setHeardFrom('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong — please try again');
      }
    } catch {
      setStatus('error');
      setMessage('Connection error — please try again');
    }
  }

  return (
    <main>
      {/* Header */}
      <header>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '22px', fontWeight: 800, letterSpacing: '-0.02em', color: '#0f1915' }}>
            SortBox
          </div>
          <nav style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
            <a href="#how-it-works" style={{ fontSize: '14px', color: '#555', textDecoration: 'none' }}>How it works</a>
            <a href="#whats-in-the-box" style={{ fontSize: '14px', color: '#555', textDecoration: 'none' }}>What&apos;s in the box</a>
            <a href="#pricing" style={{ fontSize: '14px', color: '#555', textDecoration: 'none' }}>Pricing</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="container">
          <span className="hero-badge">Founding members — first box free</span>
          <h1>
            Your home, <span>finally sorted.</span>
          </h1>
          <p>
            A monthly decluttering kit — glass containers, drawer dividers, labels — plus an app that walks you through one room at a time.
          </p>
          <div className="hero-cta">
            <a href="#founding-offer" className="btn-primary">Get first box free</a>
            <a href="#how-it-works" className="btn-ghost">See how it works</a>
          </div>
          <div className="social-proof" style={{ marginTop: '24px' }}>
            <strong>1,247</strong> people on the founding list &nbsp;·&nbsp; Boxes ship from May 2026
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="how-it-works">
        <div className="container">
          <span className="section-label">The method</span>
          <h2 style={{ fontSize: '36px', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '8px' }}>
            One room. One week.<br />Photo your progress. Move on.
          </h2>
          <p style={{ color: '#555', fontSize: '17px', maxWidth: '520px', lineHeight: 1.6 }}>
            Not another &ldquo;hack&rdquo; that involves buying stuff you don&apos;t need. A structured system that makes it genuinely hard to fail.
          </p>
          <div className="steps-grid">
            <div className="step">
              <div className="step-num">1</div>
              <h3>Kit arrives</h3>
              <p>Glass containers, drawer dividers, label sheets. Everything you need to start — quality that lasts years, not months.</p>
            </div>
            <div className="step">
              <div className="step-num">2</div>
              <h3>App assigns one room</h3>
              <p>Every Monday: one specific room, one specific task. Not &ldquo;organise the kitchen&rdquo; — &ldquo;sort the under-sink cupboard.&rdquo;</p>
            </div>
            <div className="step">
              <div className="step-num">3</div>
              <h3>Photo + done</h3>
              <p>Snap a before/after. The app tracks your zone status across the whole home. Visible progress keeps you going.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Founding offer */}
      <section id="founding-offer" className="founding-offer">
        <div className="container">
          <span className="section-label" style={{ color: 'rgba(255,255,255,0.5)' }}>Limited founding offer</span>
          <h2 style={{ fontSize: '40px', fontWeight: 800, color: 'white', marginBottom: '8px' }}>
            First box free.<br />20% off forever.
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px', maxWidth: '480px', margin: '0 auto', lineHeight: 1.6 }}>
            Founding members get their first box free — just pay shipping. After that, 20% off the standard price for life.
          </p>
          <div className="founding-card">
            <span style={{ position: 'absolute', top: '20px', right: '-28px', background: '#e63946', color: 'white', fontSize: '11px', fontWeight: 700, padding: '4px 40px', transform: 'rotate(35deg)', fontFamily: 'sans-serif' }}>Limited</span>
            <h3>Founding Member Offer</h3>
            <p>First box free — pay only £4.95 shipping. Then lock in 20% off forever.</p>
            <div className="founding-price">
              <span className="was-price">£89/mo standard price</span>
              £69<span>/mo</span>
            </div>
            <ul className="founding-features">
              <li>First box free — you only pay shipping</li>
              <li>Lock in 20% off for as long as you subscribe</li>
              <li>Month-to-month — cancel anytime, no fees</li>
              <li>Glass containers, bamboo dividers, waterproof labels</li>
              <li>Weekly app mission — one room, one task</li>
              <li>Seasonal surprise item included each quarter</li>
            </ul>

            {/* Waitlist Form */}
            {status === 'success' ? (
              <div style={{ background: '#dcfce7', borderRadius: '12px', padding: '20px', textAlign: 'center', marginTop: '24px' }}>
                <p style={{ color: '#2D5A3D', fontWeight: 600, fontSize: '16px' }}>✓ {message}</p>
                <p style={{ color: '#555', fontSize: '14px', marginTop: '8px' }}>We&apos;ll be in touch with your founding details soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ marginTop: '24px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    style={{ padding: '12px 16px', borderRadius: '8px', border: '1.5px solid #e5e7eb', fontSize: '15px', outline: 'none' }}
                  />
                  <input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    style={{ padding: '12px 16px', borderRadius: '8px', border: '1.5px solid #e5e7eb', fontSize: '15px', outline: 'none' }}
                  />
                  <select
                    value={heardFrom}
                    onChange={e => setHeardFrom(e.target.value)}
                    style={{ padding: '12px 16px', borderRadius: '8px', border: '1.5px solid #e5e7eb', fontSize: '15px', color: '#888', outline: 'none' }}
                  >
                    <option value="">How did you hear about SortBox?</option>
                    <option value="instagram">Instagram</option>
                    <option value="tiktok">TikTok</option>
                    <option value="friend">Friend / referral</option>
                    <option value="search">Google / search</option>
                    <option value="other">Other</option>
                  </select>
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="btn-primary"
                    style={{ width: '100%', opacity: status === 'loading' ? 0.7 : 1 }}
                  >
                    {status === 'loading' ? 'Joining...' : 'Claim founding spot →'}
                  </button>
                  {status === 'error' && (
                    <p style={{ color: '#e63946', fontSize: '13px', textAlign: 'center' }}>{message}</p>
                  )}
                </div>
                <p style={{ fontSize: '12px', color: '#aaa', textAlign: 'center', marginTop: '10px' }}>
                  No spam. Unsubscribe anytime. First box ships May 2026.
                </p>
              </form>
            )}

            <p className="founding-count">
              <strong>23</strong> founding spots remaining
            </p>
          </div>
        </div>
      </section>

      {/* What's in the box */}
      <section id="whats-in-the-box" className="whats-in-the-box">
        <div className="container">
          <span className="section-label">Quality that lasts</span>
          <h2 style={{ fontSize: '36px', fontWeight: 800, letterSpacing: '-0.02em' }}>
            What&apos;s in the box
          </h2>
          <div className="box-image-grid" style={{ marginTop: '40px' }}>
            <div>
              <img
                src="/sortbox-hero.jpg"
                alt="Organised kitchen drawers with glass containers and bamboo dividers"
                style={{ width: '100%', borderRadius: '16px', objectFit: 'cover', aspectRatio: '4/3' }}
                onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
              <p className="box-image-caption">Kitchen drawers, organised in one afternoon</p>
            </div>
            <div>
              <img
                src="/sortbox-box-contents.jpg"
                alt="SortBox kit contents: glass containers, bamboo dividers, labels"
                style={{ width: '100%', borderRadius: '16px', objectFit: 'cover', aspectRatio: '4/3' }}
                onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
              <p className="box-image-caption">Everything you need — nothing you don&apos;t</p>
            </div>
          </div>

          <div style={{ marginTop: '48px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', textAlign: 'center' }}>
            {[
              { icon: '🫙', label: 'Glass containers', sub: 'Airtight, microwave-safe, built to last' },
              { icon: '🎋', label: 'Bamboo dividers', sub: 'Modular, collapsible, fits any drawer' },
              { icon: '🏷️', label: 'Waterproof labels', sub: 'Colour-coded to match the app' },
              { icon: '📱', label: 'SortBox app', sub: 'Weekly missions + zone tracking, free forever' },
            ].map(item => (
              <div key={item.label} style={{ padding: '20px' }}>
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>{item.icon}</div>
                <div style={{ fontWeight: 700, fontSize: '15px', marginBottom: '4px' }}>{item.label}</div>
                <div style={{ fontSize: '13px', color: '#666', lineHeight: 1.5 }}>{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="pricing">
        <div className="container">
          <span className="section-label">Simple pricing</span>
          <h2 style={{ fontSize: '36px', fontWeight: 800, letterSpacing: '-0.02em' }}>
            Start now. Cancel anytime.
          </h2>
          <div className="pricing-table">
            <div className="pricing-col">
              <h3>Month-to-month</h3>
              <div className="price">£89<span>/mo</span></div>
              <ul>
                <li>✓ Monthly kit delivery</li>
                <li>✓ SortBox app access</li>
                <li>✓ Cancel anytime</li>
                <li>✓ No commitment</li>
              </ul>
            </div>
            <div className="pricing-col featured">
              <h3>Founding member</h3>
              <div className="price" style={{ color: '#2D5A3D' }}>£69<span>/mo</span></div>
              <p style={{ fontSize: '13px', color: '#555', marginBottom: '16px', marginTop: '4px' }}>First box free — you only pay £4.95 shipping</p>
              <ul>
                <li>✓ First box free</li>
                <li>✓ Lock in 20% discount for life</li>
                <li>✓ Priority shipping</li>
                <li>✓ Founding member badge</li>
              </ul>
            </div>
          </div>
          <p style={{ textAlign: 'center', marginTop: '32px', fontSize: '14px', color: '#888' }}>
            All prices include free shipping within mainland UK. Boxes ship on the 1st of each month.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '80px 0', background: '#fafaf8' }}>
        <div className="container">
          <span className="section-label">Questions</span>
          <h2 style={{ fontSize: '36px', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '40px' }}>
            FAQ
          </h2>
          <div style={{ maxWidth: '640px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {[
              {
                q: "What if I already have organising stuff?",
                a: "No problem. SortBox works alongside what you already have. The app helps you use what you have better — not replace it."
              },
              {
                q: "Can I pause or cancel?",
                a: "Yes. Pause for up to 3 months, cancel anytime with no fees. Founding members keep their discount if they pause and come back."
              },
              {
                q: "Do the containers fit in standard kitchen drawers?",
                a: "Yes. The bamboo dividers are modular — configure them to fit your drawer exactly, whatever size."
              },
              {
                q: "What if I move house?",
                a: "Everything in SortBox is designed to move with you. The system works in any home — the app just helps you apply it."
              },
              {
                q: "Is this plastic-free?",
                a: "Yes. Glass containers, bamboo dividers, paper labels. No single-use plastic anywhere in the kit."
              },
            ].map(item => (
              <div key={item.q} style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '24px' }}>
                <h4 style={{ fontWeight: 700, fontSize: '16px', marginBottom: '8px' }}>{item.q}</h4>
                <p style={{ color: '#555', fontSize: '15px', lineHeight: 1.6 }}>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#0f1915', color: 'white', padding: '48px 0', textAlign: 'center' }}>
        <div className="container">
          <div style={{ fontSize: '22px', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '16px' }}>SortBox</div>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>
            A monthly decluttering kit — made for real homes.
          </p>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px', marginTop: '24px' }}>
            © 2026 SortBox. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}