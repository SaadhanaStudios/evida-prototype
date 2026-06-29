// Internal messaging review page — not linked in nav, not indexed.
// Pure TSX component (no PageClient / Webflow scripts needed).

const DARK = '#09332E'
const TEAL = '#216A74'
const CORAL = '#FF5A5F'
const CREAM = '#FEFDF5'
const CREAM_WARM = '#F7F5EF'
const TEXT = '#2D2700'
const MUTED = '#575757'
const YELLOW = '#FEF2A7'
const BORDER = 'rgba(33,106,116,0.12)'
const WHITE = '#FFFFFF'

const GF = 'var(--font-geist, Geist, sans-serif)'
const IF = 'var(--font-inter, Inter, sans-serif)'

// ─── Data ─────────────────────────────────────────────────────────────────────

const SUBHEADLINES = [
  {
    id: 'A1',
    approach: 'ASPIRATIONAL',
    accentColor: TEAL,
    preferred: true,
    sub: 'Your membership to healthier years.',
    note: 'Preferred direction from June 29 session. Ephemeral benefit framing — matches "healthier years" agreed as core outcome language.',
  },
  {
    id: 'A2',
    approach: 'ASPIRATIONAL',
    accentColor: TEAL,
    preferred: false,
    sub: 'Adding healthy years to your life.',
    note: 'Same space as A1, slightly more active voice. Both emerged from the same discussion thread.',
  },
  {
    id: 'B1',
    approach: 'CONCRETE',
    accentColor: '#138A7D',
    preferred: false,
    sub: 'The clinical upgrade your wearable data has been waiting for.',
    note: 'Leads with wearable integration — identified as the main differentiator that hooks people in conversation. Targets existing device owners.',
  },
  {
    id: 'B2',
    approach: 'CONCRETE',
    accentColor: '#138A7D',
    preferred: false,
    sub: 'Comprehensive diagnostics meet unhurried GP care.',
    note: 'Blood panel + GP time in one line. Specific and service-forward. Strong for people who already know what they want.',
  },
  {
    id: 'C1',
    approach: 'CONTRAST',
    accentColor: CORAL,
    preferred: false,
    sub: 'Your wearable spots the trends. We give your GP time to read them.',
    note: 'Positions against both isolated wearable apps and the reactive NHS model. Captures the dual differentiator in one sentence pair.',
  },
  {
    id: 'C2',
    approach: 'CONTRAST',
    accentColor: CORAL,
    preferred: false,
    sub: 'Because your doctor needs time to listen.',
    note: 'Reads as a continuation of the hook — one combined sentence. Punchy. Resonates emotionally with NHS frustrations.',
  },
]

const MEMBERSHIP_HEROES = [
  {
    label: 'CURRENT',
    tag: 'Live on dev.evida.uk',
    tagColor: MUTED,
    title: 'The Evida Membership',
    sub: 'A full year of care, not a single appointment.',
    note: null,
  },
  {
    label: 'OPTION A',
    tag: 'Preferred — June 29 session',
    tagColor: TEAL,
    title: 'More than a health check.',
    sub: 'Your membership to healthier years.',
    note: 'Aligns the membership page under the same hook as the homepage. Consistent messaging across the funnel.',
  },
  {
    label: 'OPTION B',
    tag: 'Concrete-first',
    tagColor: '#138A7D',
    title: 'Your data. Your GP. Your plan.',
    sub: 'Blood tests, wearable integration, and 90 minutes of GP-led consultation — in one annual membership.',
    note: 'Skips the ephemeral layer entirely. Leads with the concrete service for people who need specifics before they engage.',
  },
]

// ─── Section wrapper ───────────────────────────────────────────────────────────

function Section({ children, bg = CREAM, last = false }: { children: React.ReactNode; bg?: string; last?: boolean }) {
  return (
    <div style={{ background: bg, padding: `clamp(40px, 5vw, 64px) 24px ${last ? 'clamp(64px, 8vw, 96px)' : 'clamp(40px, 5vw, 64px)'}` }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        {children}
      </div>
    </div>
  )
}

function SectionHeader({ part, title, intro }: { part: string; title: string; intro: string }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <p style={{ fontFamily: IF, fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: CORAL, margin: '0 0 6px' }}>
        {part}
      </p>
      <h2 style={{ fontFamily: GF, fontSize: 'clamp(22px, 2.8vw, 30px)', fontWeight: 400, letterSpacing: '-0.01em', color: DARK, margin: '0 0 10px' }}>
        {title}
      </h2>
      <p style={{ fontFamily: IF, fontSize: 15, lineHeight: 1.6, color: MUTED, margin: 0, maxWidth: '58ch' }}>
        {intro}
      </p>
    </div>
  )
}

function Divider() {
  return <hr style={{ border: 0, borderTop: `1px solid ${BORDER}`, margin: 0 }} />
}

function Btn({ label = 'Get Started' }: { label?: string }) {
  return (
    <span style={{
      display: 'inline-block',
      background: YELLOW,
      color: DARK,
      borderRadius: 12,
      padding: '11px 24px',
      fontFamily: IF,
      fontSize: 14,
      fontWeight: 600,
      letterSpacing: '0.01em',
      cursor: 'default',
    }}>
      {label}
    </span>
  )
}

function TrustRow() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 14px', marginTop: 20 }}>
      {['CQC Registered', 'GMC Licensed GPs', 'GDPR Compliant'].map((t, i) => (
        <span key={t} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          {i > 0 && <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 10 }}>·</span>}
          <span style={{ fontFamily: IF, fontSize: 11, fontWeight: 500, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.04em' }}>
            {t}
          </span>
        </span>
      ))}
    </div>
  )
}

function HookHeading() {
  return (
    <h3 style={{ fontFamily: GF, fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1.08, color: WHITE, margin: '10px 0 0' }}>
      More than a<br />health check.
    </h3>
  )
}

// ─── Main component ────────────────────────────────────────────────────────────

export default function Content() {
  return (
    <>
      <style>{`
        .msg-col2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .msg-col3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .msg-fw2  { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; }
        @media (max-width: 860px) {
          .msg-col2, .msg-col3, .msg-fw2 { grid-template-columns: 1fr; }
        }
        .msg-framework-old-cards { display: grid; grid-template-columns: 1fr; gap: 12px; }
        .msg-framework-new-cols  { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
        @media (max-width: 640px) {
          .msg-framework-new-cols { grid-template-columns: 1fr; }
        }
      `}</style>

      <div style={{ fontFamily: IF, background: CREAM, minHeight: '100vh' }}>

        {/* ── Sticky internal banner ── */}
        <div style={{
          position: 'sticky', top: 0, zIndex: 100,
          background: YELLOW,
          borderBottom: '1px solid rgba(45,39,0,0.15)',
          padding: '9px 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: 12,
        }}>
          <span style={{ fontFamily: IF, fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: TEXT }}>
            ⚑ Messaging Review — Internal only · Not indexed
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0 }}>
            <span style={{ fontFamily: IF, fontSize: 11, color: 'rgba(45,39,0,0.5)' }}>Updated June 29, 2026</span>
            <a href="/" style={{ fontFamily: IF, fontSize: 11, fontWeight: 600, color: TEAL, textDecoration: 'none', letterSpacing: '0.02em' }}>← Homepage</a>
          </span>
        </div>

        {/* ── Page title ── */}
        <div style={{ padding: 'clamp(48px, 7vw, 80px) 24px 40px' }}>
          <div style={{ maxWidth: 1080, margin: '0 auto' }}>
            <p style={{ fontFamily: IF, fontSize: 11, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: CORAL, margin: '0 0 12px' }}>
              Messaging Review
            </p>
            <h1 style={{ fontFamily: GF, fontSize: 'clamp(36px, 5vw, 54px)', fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1.08, color: DARK, margin: '0 0 20px' }}>
              Copy & messaging<br />under consideration
            </h1>
            <p style={{ fontFamily: IF, fontSize: 16, lineHeight: 1.65, color: MUTED, margin: 0, maxWidth: '54ch' }}>
              The hook <strong style={{ color: DARK, fontWeight: 600 }}>"More than a health check."</strong> is settled across all options.
              Everything below is under consideration — all variants visible at once for direct comparison.
              Source of truth: <code style={{ fontSize: 13, background: 'rgba(33,106,116,0.08)', padding: '2px 6px', borderRadius: 4, color: TEAL }}>messaging-framework.md</code>
            </p>
          </div>
        </div>

        <Divider />

        {/* ══════════════════════════════════════════════════════
            PART 1 — HOMEPAGE SUBHEADLINE OPTIONS
        ══════════════════════════════════════════════════════ */}
        <Section>
          <SectionHeader
            part="Part 1 — Homepage subheadline options"
            title="Six subheadlines under consideration"
            intro="The hook is fixed. These are the options for what sits below it, rendered in the hero context. Each represents a distinct psychological approach."
          />

          <div className="msg-col2">
            {SUBHEADLINES.map(v => (
              <div key={v.id}>
                {/* Dark hero card */}
                <div style={{ background: DARK, borderRadius: 16, padding: 'clamp(28px, 4vw, 36px) clamp(24px, 3vw, 32px)', position: 'relative' }}>
                  {/* Top row: ID + approach label */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{
                      fontFamily: GF, fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.04em',
                    }}>
                      {v.id}
                    </span>
                    <span style={{
                      fontFamily: IF, fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase',
                      color: v.accentColor, background: `${v.accentColor}18`, padding: '3px 9px', borderRadius: 999,
                    }}>
                      {v.approach}
                    </span>
                  </div>

                  {/* Preferred badge */}
                  {v.preferred && (
                    <div style={{ marginBottom: 8 }}>
                      <span style={{ fontFamily: IF, fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', background: YELLOW, color: DARK, padding: '3px 9px', borderRadius: 999 }}>
                        ★ Preferred direction
                      </span>
                    </div>
                  )}

                  {/* Hook */}
                  <HookHeading />

                  {/* Subheadline */}
                  <p style={{ fontFamily: GF, fontSize: 'clamp(16px, 2.2vw, 21px)', fontWeight: 300, fontStyle: 'italic', lineHeight: 1.4, color: 'rgba(255,255,255,0.70)', margin: '14px 0 26px' }}>
                    {v.sub}
                  </p>

                  <Btn />
                  <TrustRow />
                </div>

                {/* Note below card */}
                <p style={{ fontFamily: IF, fontSize: 13, lineHeight: 1.55, color: MUTED, fontStyle: 'italic', margin: '10px 4px 0' }}>
                  {v.note}
                </p>
              </div>
            ))}
          </div>
        </Section>

        <Divider />

        {/* ══════════════════════════════════════════════════════
            PART 2 — HERO STRUCTURE VARIANTS
        ══════════════════════════════════════════════════════ */}
        <Section bg={CREAM_WARM}>
          <SectionHeader
            part="Part 2 — Hero structure"
            title="Three structural layouts for the same hero"
            intro="Hook and preferred subheadline (A1) are fixed. What changes is how the section is structured below — sentence only, pillar chips, or subheadline plus a concrete list."
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

            {/* Structure 1 — Sentence */}
            <div>
              <p style={{ fontFamily: IF, fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: MUTED, margin: '0 0 10px' }}>
                Structure 1 · Sentence subheadline — current live homepage (v2)
              </p>
              <div style={{ background: DARK, borderRadius: 16, padding: 'clamp(40px, 5vw, 60px) clamp(32px, 5vw, 64px)' }}>
                <HookHeading />
                <p style={{ fontFamily: IF, fontSize: 'clamp(15px, 1.8vw, 18px)', lineHeight: 1.6, color: 'rgba(255,255,255,0.70)', margin: '16px 0 28px', maxWidth: '46ch' }}>
                  Your membership to healthier years.
                </p>
                <Btn />
                <TrustRow />
              </div>
            </div>

            {/* Structure 2 — Pill chips */}
            <div>
              <p style={{ fontFamily: IF, fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: MUTED, margin: '0 0 10px' }}>
                Structure 2 · Pillar chips — CopyTester v1
              </p>
              <div style={{ background: DARK, borderRadius: 16, padding: 'clamp(40px, 5vw, 60px) clamp(32px, 5vw, 64px)' }}>
                <HookHeading />
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, margin: '16px 0 28px' }}>
                  {['Blood test', 'GP consult', 'Wearable data', 'Health plan'].map(tag => (
                    <span key={tag} style={{
                      background: 'rgba(255,255,255,0.09)',
                      border: '1px solid rgba(255,255,255,0.16)',
                      color: WHITE,
                      borderRadius: 999,
                      padding: '6px 16px',
                      fontFamily: IF,
                      fontSize: 14,
                      letterSpacing: '0.02em',
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
                <Btn />
                <TrustRow />
              </div>
            </div>

            {/* Structure 3 — Subheadline + list */}
            <div>
              <p style={{ fontFamily: IF, fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: MUTED, margin: '0 0 10px' }}>
                Structure 3 · Subheadline + concrete inclusions — new option
              </p>
              <div style={{ background: DARK, borderRadius: 16, padding: 'clamp(40px, 5vw, 60px) clamp(32px, 5vw, 64px)' }}>
                <HookHeading />
                <p style={{ fontFamily: GF, fontSize: 'clamp(16px, 2vw, 20px)', fontWeight: 300, fontStyle: 'italic', lineHeight: 1.4, color: 'rgba(255,255,255,0.70)', margin: '14px 0 16px', maxWidth: '46ch' }}>
                  Your membership to healthier years.
                </p>
                <ul style={{ margin: '0 0 28px', padding: 0, listStyle: 'none' }}>
                  {[
                    'Comprehensive blood panel at a Randox clinic — 100+ biomarkers',
                    '90 minutes of GP-led consultation across the year, lifestyle-focused',
                    'Wearable integration — connects Oura, Apple, Garmin, Whoop',
                  ].map(item => (
                    <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '6px 0', fontFamily: IF, fontSize: 15, color: 'rgba(255,255,255,0.78)', lineHeight: 1.5 }}>
                      <span style={{ color: CORAL, flexShrink: 0, marginTop: 2, fontSize: 10 }}>✦</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Btn />
                <TrustRow />
              </div>
            </div>

          </div>
        </Section>

        <Divider />

        {/* ══════════════════════════════════════════════════════
            PART 3 — SERVICE FRAMEWORK
        ══════════════════════════════════════════════════════ */}
        <Section>
          <SectionHeader
            part="Part 3 — Service framework"
            title="Track → Tailor → Act vs Data → Insights → Action"
            intro={`"Track → Tailor → Act" is being retired. These are the old and proposed replacement rendered side by side — same service, different structural lens.`}
          />

          <div className="msg-fw2">

            {/* LEFT — OLD */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <span style={{ fontFamily: IF, fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: MUTED }}>Current</span>
                <span style={{ fontFamily: IF, fontSize: 11, color: 'rgba(45,39,0,0.35)', background: 'rgba(45,39,0,0.07)', padding: '3px 9px', borderRadius: 999 }}>To be retired</span>
              </div>
              <div className="msg-framework-old-cards">
                {[
                  { pill: 'TRACK', title: 'Measure What Matters', body: 'Track the key signals that shape your long-term health. We combine your biomarker results, wearable data and lifestyle patterns to measure how your body is functioning over time — so we can spot patterns and help you stay ahead.' },
                  { pill: 'TAILOR', title: 'Clinical Guidance, Tailored to You', body: 'Your health is unique. By interpreting your data in context, our clinicians provide personalised guidance focused on what matters most for your body, your lifestyle and your long-term health.' },
                  { pill: 'ACT', title: 'Make Change that Lasts', body: 'Your personalised plan translates clinical guidance into practical, achievable next steps. With ongoing guidance, we make it easy to take action with clarity and confidence.' },
                ].map(c => (
                  <div key={c.pill} style={{ background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 12, padding: '22px 20px' }}>
                    <span style={{ display: 'inline-block', background: YELLOW, color: DARK, fontFamily: IF, fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: 999, marginBottom: 12 }}>
                      {c.pill}
                    </span>
                    <p style={{ fontFamily: GF, fontSize: 17, fontWeight: 500, color: DARK, margin: '0 0 8px', lineHeight: 1.3 }}>{c.title}</p>
                    <p style={{ fontFamily: IF, fontSize: 14, lineHeight: 1.55, color: MUTED, margin: 0 }}>{c.body}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — NEW */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <span style={{ fontFamily: IF, fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: TEAL }}>Proposed</span>
                <span style={{ fontFamily: IF, fontSize: 11, color: TEAL, background: `${TEAL}14`, padding: '3px 9px', borderRadius: 999 }}>June 29 session</span>
              </div>
              <div className="msg-framework-new-cols">
                {[
                  {
                    eyebrow: 'DATA-LED',
                    title: 'What we combine',
                    items: ['Comprehensive blood panel — 100+ biomarkers', 'Wearable integration (Oura, Apple, Garmin, Whoop)', 'Medical history in one secure record'],
                  },
                  {
                    eyebrow: 'GP-LED INSIGHTS',
                    title: 'What we discover',
                    items: ['45-min GP consultation, lifestyle-focused', 'Personalised prevention plan in plain English', '6-month follow-up to review progress'],
                  },
                  {
                    eyebrow: 'INFORMED ACTION',
                    title: 'How you act',
                    items: ['Personalised prevention plan to act on', 'Access to our partner wellness network', 'Daily guidance from Evi'],
                  },
                ].map(c => (
                  <div key={c.eyebrow} style={{ background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 12, padding: '22px 20px' }}>
                    <p style={{ fontFamily: IF, fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: TEAL, margin: '0 0 10px' }}>
                      {c.eyebrow}
                    </p>
                    <p style={{ fontFamily: GF, fontSize: 16, fontWeight: 500, color: DARK, margin: '0 0 14px', lineHeight: 1.3 }}>{c.title}</p>
                    <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                      {c.items.map(item => (
                        <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: '5px 0', fontFamily: IF, fontSize: 13, color: MUTED, lineHeight: 1.5, borderTop: `1px solid ${BORDER}` }}>
                          <span style={{ color: CORAL, flexShrink: 0, marginTop: 2, fontSize: 9 }}>✦</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </Section>

        <Divider />

        {/* ══════════════════════════════════════════════════════
            PART 4 — MEMBERSHIP PAGE HERO
        ══════════════════════════════════════════════════════ */}
        <Section bg={CREAM_WARM}>
          <SectionHeader
            part="Part 4 — Membership page hero"
            title="Three options for the membership page opening"
            intro="The membership page currently has its own hero separate from the homepage. These show what happens when we align it with the settled hook vs. keep it independent."
          />

          <div className="msg-col3">
            {MEMBERSHIP_HEROES.map(m => (
              <div key={m.label}>
                <div style={{ background: DARK, borderRadius: 16, padding: 'clamp(28px, 3vw, 36px) clamp(22px, 2.5vw, 28px)', height: '100%', boxSizing: 'border-box' }}>
                  {/* Label row */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                    <span style={{ fontFamily: IF, fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>
                      {m.label}
                    </span>
                    <span style={{ fontFamily: IF, fontSize: 10, color: m.tagColor, background: `${m.tagColor}22`, padding: '3px 8px', borderRadius: 999, letterSpacing: '0.04em' }}>
                      {m.tag}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 style={{ fontFamily: GF, fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1.1, color: WHITE, margin: '0 0 12px' }}>
                    {m.title}
                  </h3>

                  {/* Sub */}
                  <p style={{ fontFamily: IF, fontSize: 'clamp(13px, 1.6vw, 15px)', lineHeight: 1.6, color: 'rgba(255,255,255,0.65)', margin: '0 0 24px' }}>
                    {m.sub}
                  </p>

                  {/* Price */}
                  <p style={{ fontFamily: GF, fontSize: 'clamp(28px, 3.5vw, 38px)', fontWeight: 500, color: WHITE, margin: '0 0 20px', letterSpacing: '-0.02em' }}>
                    £320 <span style={{ fontSize: 15, fontWeight: 400, color: 'rgba(255,255,255,0.45)' }}>/ year</span>
                  </p>

                  <Btn />
                </div>

                {m.note && (
                  <p style={{ fontFamily: IF, fontSize: 13, lineHeight: 1.55, color: MUTED, fontStyle: 'italic', margin: '10px 4px 0' }}>
                    {m.note}
                  </p>
                )}
              </div>
            ))}
          </div>
        </Section>

        <Divider />

        {/* ══════════════════════════════════════════════════════
            PART 5 — POSITIONING REFERENCE
        ══════════════════════════════════════════════════════ */}
        <Section last>
          <SectionHeader
            part="Part 5 — Positioning (internal reference)"
            title="Settled positioning — not a variant"
            intro="These are the guardrails against which all of the above should be judged. From messaging-framework.md."
          />

          <div style={{ background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 'clamp(28px, 4vw, 40px) clamp(24px, 4vw, 40px)' }}>
            {/* Core statement */}
            <p style={{ fontFamily: GF, fontSize: 'clamp(18px, 2.4vw, 24px)', fontWeight: 400, lineHeight: 1.5, color: DARK, margin: '0 0 28px', maxWidth: '52ch' }}>
              Evida is a <strong>human + tech enabled service</strong> — not an app. The human element (GP-led consultations, lifestyle focus) and the tech element (wearable data, diagnostics, platform) are both load-bearing. Neither alone is the story.
            </p>

            {/* Two-col guardrails */}
            <div className="msg-fw2" style={{ gap: 20 }}>
              <div>
                <p style={{ fontFamily: IF, fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: CORAL, margin: '0 0 12px' }}>
                  What we are not
                </p>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    ['Not an app', 'The interface is a communication layer for a human clinical service.'],
                    ['Not an AI doctor', 'AI surfaces trends; GPs interpret them. Patients are always seen by a real person.'],
                    ['Not the NHS', 'Complementary preventative care that works alongside primary care — make this explicit.'],
                    ['Not a point-in-time kit', 'Test kits leave users stranded with data. Evida is a year-long partnership.'],
                  ].map(([term, def]) => (
                    <li key={term as string} style={{ fontFamily: IF, fontSize: 14, lineHeight: 1.55, color: TEXT }}>
                      <strong style={{ color: DARK }}>{term}</strong> — {def}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p style={{ fontFamily: IF, fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: TEAL, margin: '0 0 12px' }}>
                  We compete on
                </p>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    ['Clinical empathy', 'Unhurried GP time with a lifestyle-medicine focus. Nobody else is doing this.'],
                    ['Data continuity', 'Blood panel + wearable + medical history in one place. Not isolated data points.'],
                    ['Time', 'Convenience across all three touchpoints: booking, results, and actions/recs.'],
                  ].map(([term, def]) => (
                    <li key={term as string} style={{ fontFamily: IF, fontSize: 14, lineHeight: 1.55, color: TEXT }}>
                      <strong style={{ color: DARK }}>{term}</strong> — {def}
                    </li>
                  ))}
                </ul>

                <div style={{ marginTop: 24, padding: '16px 18px', background: `${TEAL}0D`, border: `1px solid ${TEAL}22`, borderRadius: 10 }}>
                  <p style={{ fontFamily: IF, fontSize: 13, lineHeight: 1.6, color: DARK, margin: 0, fontStyle: 'italic' }}>
                    "We are in service of our customers." — Write from this posture on every page.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Section>

      </div>
    </>
  )
}
