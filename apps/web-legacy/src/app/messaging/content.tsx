// Internal messaging review page — not linked in nav, not indexed.
// Pure TSX component (no PageClient / Webflow scripts needed).
// Organized BY SITE PAGE: each page shows its complete proposed copy, a clear
// recommendation, and the decisions still open for that page. Shared strategy
// and raw material live in Foundations / Reference. Source: messaging-framework.md.

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
const GREEN = '#138A7D'

const GF = 'var(--font-geist, Geist, sans-serif)'
const IF = 'var(--font-inter, Inter, sans-serif)'

const SCROLL_TOP = 104 // clears the sticky header (banner + page tabs)

// ─── Status taxonomy ────────────────────────────────────────────────────────────

const STATUS = {
  decision: { label: 'Decision needed', color: CORAL, bg: `${CORAL}16` },
  settled: { label: 'Settled', color: TEAL, bg: `${TEAL}16` },
  draft: { label: 'Draft copy', color: '#9A7B00', bg: YELLOW },
  reference: { label: 'Reference', color: MUTED, bg: 'rgba(45,39,0,0.06)' },
} as const
type StatusKey = keyof typeof STATUS

// ─── Page nav ────────────────────────────────────────────────────────────────────

const PAGE_NAV = [
  { id: 'foundations', label: 'Foundations' },
  { id: 'page-home', label: 'Homepage' },
  { id: 'page-membership', label: 'Membership' },
  { id: 'page-how', label: 'How it works' },
  { id: 'page-about', label: 'About us' },
  { id: 'page-faqs', label: 'FAQs' },
  { id: 'reference', label: 'Reference' },
]

// ─── Data ─────────────────────────────────────────────────────────────────────

// Homepage hero — subheadline options (hook is settled)
const SUBHEADLINES = [
  { id: 'A1', approach: 'ASPIRATIONAL', accentColor: TEAL, recommended: true, sub: 'Your membership to healthier years.', note: 'Preferred from the June 29 session. Ephemeral benefit, in the agreed "healthier years" language.' },
  { id: 'A2', approach: 'ASPIRATIONAL', accentColor: TEAL, recommended: false, sub: 'Adding healthy years to your life.', note: 'Same space as A1, more active voice.' },
  { id: 'B1', approach: 'CONCRETE', accentColor: GREEN, recommended: false, sub: 'The clinical upgrade your wearable data has been waiting for.', note: 'Leads with the main differentiator — wearable integration. For existing device owners.' },
  { id: 'B2', approach: 'CONCRETE', accentColor: GREEN, recommended: false, sub: 'Comprehensive diagnostics meet unhurried GP care.', note: 'Blood panel + GP time in one line. Specific and service-forward.' },
  { id: 'C1', approach: 'CONTRAST', accentColor: CORAL, recommended: false, sub: 'Your wearable spots the trends. We give your GP time to read them.', note: 'Positions against isolated wearable apps and the reactive NHS model.' },
  { id: 'C2', approach: 'CONTRAST', accentColor: CORAL, recommended: false, sub: 'Because your doctor needs time to listen.', note: 'Reads as a continuation of the hook. Punchy, emotional.' },
]

// Homepage problem section — "Why Evida exists"
const PROBLEM_VARIANTS = [
  { tag: 'CURRENT', recommended: true, text: 'Your wearable sees the trends. Your GP has ten minutes. Evida joins the dots.', note: 'Live on the homepage. Names two failures and the bridge in one breath.' },
  { tag: 'HEALTHSPAN GAP', recommended: false, text: "You'll likely live to 81. But the average person spends their final decade in poor health. Evida is built to change that math.", note: 'Leads with the 81-vs-healthspan stat already on the page.' },
  { tag: 'DATA STRANDED', recommended: false, text: 'Your watch counts every step. Your last blood test sits in a drawer. Nobody is connecting them — until now.', note: 'Concrete and visual. For people who already track but feel unseen.' },
  { tag: 'TIME & EMPATHY', recommended: false, text: 'Ten-minute appointments can only react to illness. Evida gives a GP the time — and the data — to get ahead of it.', note: 'Antidote framing. Resonates with NHS frustration without naming it.' },
]

// Homepage service framework — the new three pillars
const FRAMEWORK = [
  { eyebrow: 'DATA-LED', title: 'What we combine', items: ['Blood panel — 100+ biomarkers', 'Wearable integration (Oura, Apple, Garmin, Whoop)', 'Medical history in one secure record'] },
  { eyebrow: 'GP-LED INSIGHTS', title: 'What we discover', items: ['45-min consult, lifestyle-focused', 'Prevention plan in plain English', '6-month follow-up'] },
  { eyebrow: 'INFORMED ACTION', title: 'How you act', items: ['Personalised prevention plan', 'Partner wellness network', 'Daily guidance from Evi'] },
]

// Homepage — who it's for
const AUDIENCE = [
  { who: 'The quantified optimiser', line: 'You already wear an Oura or Whoop. You have the data — what you lack is anyone qualified to tell you what it means.' },
  { who: 'The time-poor professional', line: "You're 35+, your appointments feel rushed, and you'd rather prevent the problem now than react to it at 55." },
  { who: 'The recently spooked', line: 'A scare, a diagnosis in the family, a number that came back off. You want a proper baseline and a real plan — not a leaflet.' },
]

// Membership hero options
const MEMBERSHIP_HEROES = [
  { label: 'OPTION A', tag: 'Recommended', tagColor: TEAL, recommended: true, title: 'More than a health check.', sub: 'Your membership to healthier years.', note: 'Aligns the membership page under the same hook as the homepage — one consistent message across the funnel.' },
  { label: 'OPTION B', tag: 'Concrete-first', tagColor: GREEN, recommended: false, title: 'Your data. Your GP. Your plan.', sub: 'Blood tests, wearable integration, and 90 minutes of GP-led consultation — in one annual membership.', note: 'Skips the ephemeral layer. Leads with the concrete service for people who need specifics first.' },
  { label: 'CURRENT', tag: 'Live now', tagColor: MUTED, recommended: false, title: 'The Evida Membership', sub: 'A full year of care, not a single appointment.', note: 'What is on dev.evida.uk today.' },
]

// Membership inclusions (real pricing card)
const MEMBERSHIP_INCLUSIONS = [
  'Comprehensive biomarker blood panel at a Randox clinic (100+ markers)',
  'Wearable integration — Oura, Apple, Garmin, Whoop',
  'A 45-minute consultation with a GP who has read your results in advance',
  'Your personalised prevention plan, in plain English',
  '6-month follow-up (a further 45 minutes) to review progress',
  'Two 15-minute check-in consults to use across the year',
  'Evi, your daily companion, for non-clinical guidance and nudges',
]

// Membership — price framings
const PRICE_FRAMINGS = [
  { tag: 'UNIT REFRAME', headline: '£320 a year — about £27 a month.', note: 'Monthly mental accounting makes the annual figure feel small. Show the per-month equivalent everywhere the price appears.' },
  { tag: 'ALTERNATIVE ANCHOR', headline: 'One private GP visit buys you ten minutes. £320 buys you a year.', note: 'Anchoring against what £320 replaces (~£200 GP visit, ~£250–300 blood panel) reframes it from a spend into a saving. Strongest lever — recommend leading with this.' },
  { tag: 'FOUNDING MEMBER', headline: 'Pilot pricing — locked for founding members.', note: 'Turns the existing "Pilot pricing" label into honest urgency and belonging.' },
]

// Membership — comparison table (real component)
const COMPARISON = {
  cols: ['A one-off health check', 'Evida membership', 'Your NHS GP'],
  rows: [
    ['Focus', 'A snapshot in time', 'A year of proactive prevention', "Reactive — when you're unwell"],
    ['Time with a doctor', 'Often none, or brief', '90 minutes across the year, unhurried', '~10 minutes per appointment'],
    ['Your data', 'Results handed over in isolation', 'Bloods + wearables + history, joined up', 'Limited to what you report on the day'],
    ['Follow-up', 'None', 'Built in at 6 months', 'When you book the next appointment'],
    ['Cost', '~£250–300 one-off', '£320 / year (≈ £27/mo)', 'Free at point of use'],
  ],
}

// Membership / FAQs — objections in the customer's voice
const REASSURANCE_CHIPS = ['No referral needed', 'Cancel anytime', 'Works alongside your NHS GP', 'No wearable? Still works', 'Results in 72 hours', 'GMC-licensed GPs']
const OBJECTIONS: [string, string][] = [
  ["I don't have an Oura ring or Apple Watch.", 'Evida works fully without one. Your blood panel and GP consultations stand on their own — a wearable simply adds a richer, continuous picture if you have one.'],
  ["Isn't this just a fancy blood test?", 'No. A test hands you numbers. Evida gives you 90 minutes with a GP who has read them in advance, a plan in plain English, and a year of follow-up.'],
  ['Will this replace my NHS GP?', 'No — it complements it. Evida is preventative; your NHS GP stays your first port of call for acute care. We can share your plan with them.'],
  ['£320 is a lot to pay up front.', 'It works out around £27 a month for a year of proactive care — less than a single private GP visit, which buys you ten minutes.'],
]

// How It Works — 5-phase timeline
const HOW_IT_WORKS = [
  { when: 'Days 1–3', title: 'Join and set up', body: 'Create your account and connect any wearables you already own. Five minutes, no paperwork.' },
  { when: 'Week 1', title: 'Get your baseline', body: 'Visit a local Randox clinic for your comprehensive blood panel — 100+ biomarkers.' },
  { when: 'Week 2', title: 'Meet your doctor', body: 'Your results arrive, read in advance by your GP. Sit down for an unhurried 45-minute consultation.' },
  { when: 'Months 1–6', title: 'Act, with support', body: 'Follow your plain-English prevention plan, with Evi for daily nudges and your care team on hand.' },
  { when: 'Month 6', title: 'Review and adjust', body: 'A second 45-minute follow-up measures progress against your baseline and updates the plan.' },
]

// About Us — blocks
const ABOUT_BLOCKS = [
  { label: 'Our vision', heading: 'Healthcare that protects, not just reacts.', body: 'Most healthcare waits for something to go wrong. Evida exists to get ahead of it — pairing your data with real clinical time so problems are caught early and prevented, not just treated.' },
  { label: 'Clinical governance', heading: 'Real doctors, properly accountable.', body: 'Every Evida consultation is with a GMC-licensed, NHS-experienced GP. We are CQC registered and GDPR compliant. Your care is led by named clinicians — not an algorithm.' },
  { label: 'Human in the loop', heading: 'Technology surfaces. Doctors decide.', body: 'We use technology to spot patterns across your bloods and wearables. But every insight is read, interpreted and signed off by a real GP. You are always seen by a person.' },
]

// FAQs — categories
const FAQ_CATEGORIES: [string, string][] = [
  ["What's included", 'Biomarkers tested, the GP-time breakdown, exactly what the £320 covers.'],
  ['Wearables', 'Which devices connect (Oura, Apple, Whoop, Garmin) — and that it works without one.'],
  ['Your NHS GP', 'How Evida coordinates with, and never replaces, your primary care.'],
  ['Data & security', 'Where your data lives, who can see it, GDPR.'],
  ['Getting started', 'Booking, the clinic visit, timelines, cancellation.'],
]

// Reference — full headline library (15)
const HEADLINE_SWARM = [
  { key: 'A', approach: 'ASPIRATIONAL', accent: TEAL, headlines: ['Your annual membership to healthier years.', 'More than a health check. A lifelong plan for vitality.', 'Invest in your healthspan. Live better, longer.', "Don't just track your lifespan. Extend your healthy years.", 'The preventative healthcare membership built for your life.'] },
  { key: 'B', approach: 'CONCRETE', accent: GREEN, headlines: ['Comprehensive diagnostics meet unhurried GP care.', 'Your biomarkers, wearables, and medical history. Finally in one place.', '100+ biomarkers. Continuous data sync. 90 minutes of expert GP care.', 'The clinical upgrade your wearable data has been waiting for.', 'Complete preventative health management for £320 a year.'] },
  { key: 'C', approach: 'DIRECT CONTRAST', accent: CORAL, headlines: ['More than a health check. Because your doctor needs time to listen.', "Rushed appointments won't protect your health. Evida will.", 'Your wearable spots the trends. We give your GP time to read them.', 'Stop guessing about your health data. Get real clinical direction.', 'A premium healthcare service designed around prevention, not reactions.'] },
]

// Reference — CTA microcopy principles
const CTA_VARIANTS: { label: string; sub: string | null; note: string }[] = [
  { label: 'Get Started', sub: null, note: 'Current, site-wide. Generic — states no value and no next step.' },
  { label: 'Book my baseline', sub: '£320 / year · cancel anytime', note: 'Names the concrete first action and removes commitment fear. First-person.' },
  { label: 'Start my health plan', sub: 'No referral needed · results in 72 hours', note: 'First-person ownership plus two friction-killers underneath.' },
  { label: "See if Evida's right for me", sub: '2-minute eligibility check', note: 'Low-commitment entry for the not-yet-sure. Strong secondary CTA.' },
]

// Reference — CTA funnel matrix
const CTA_MATRIX: [string, string, string][] = [
  ['Homepage', 'Book my baseline', 'See how it works'],
  ['Membership', 'Activate membership', 'View what’s included'],
  ['How it works', 'Start my health plan', '—'],
  ['About us', 'Book my baseline', 'Read the research'],
  ['FAQs', 'Book my baseline', '—'],
]

// ─── Components ──────────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: StatusKey }) {
  const s = STATUS[status]
  return (
    <span style={{ fontFamily: IF, fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: s.color, background: s.bg, padding: '3px 9px', borderRadius: 999, whiteSpace: 'nowrap' }}>
      {s.label}
    </span>
  )
}

function PageBanner({ id, n, name, job, lives }: { id: string; n: string; name: string; job: string; lives: string }) {
  return (
    <div id={id} style={{ background: DARK, padding: 'clamp(44px, 5.5vw, 68px) 24px', scrollMarginTop: SCROLL_TOP }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <p style={{ fontFamily: IF, fontSize: 11, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: YELLOW, margin: '0 0 10px' }}>
          {n}
        </p>
        <h2 style={{ fontFamily: GF, fontSize: 'clamp(30px, 4.4vw, 46px)', fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1.08, color: WHITE, margin: '0 0 14px' }}>
          {name}
        </h2>
        <p style={{ fontFamily: IF, fontSize: 16, lineHeight: 1.6, color: 'rgba(255,255,255,0.72)', margin: '0 0 14px', maxWidth: '60ch' }}>
          {job}
        </p>
        <p style={{ fontFamily: IF, fontSize: 12.5, color: 'rgba(255,255,255,0.5)', margin: 0, letterSpacing: '0.02em' }}>
          {lives}
        </p>
      </div>
    </div>
  )
}

function Body({ children, bg = CREAM, last = false }: { children: React.ReactNode; bg?: string; last?: boolean }) {
  return (
    <div style={{ background: bg, padding: `clamp(36px, 4.5vw, 56px) 24px ${last ? 'clamp(56px, 7vw, 88px)' : 'clamp(36px, 4.5vw, 56px)'}` }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>{children}</div>
    </div>
  )
}

function Block({ label, status, intro, children }: { label: string; status: StatusKey; intro?: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '0 0 8px', flexWrap: 'wrap' }}>
        <h3 style={{ fontFamily: GF, fontSize: 'clamp(18px, 2.2vw, 22px)', fontWeight: 500, color: DARK, margin: 0, letterSpacing: '-0.01em' }}>{label}</h3>
        <StatusBadge status={status} />
      </div>
      {intro && <p style={{ fontFamily: IF, fontSize: 14.5, lineHeight: 1.6, color: MUTED, margin: '0 0 18px', maxWidth: '66ch' }}>{intro}</p>}
      {children}
    </div>
  )
}

function BlockSep() {
  return <hr style={{ border: 0, borderTop: `1px solid ${BORDER}`, margin: 'clamp(34px, 4vw, 48px) 0' }} />
}

function Rec({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: `${TEAL}0D`, borderLeft: `3px solid ${TEAL}`, borderRadius: '0 8px 8px 0', padding: '10px 16px', margin: '0 0 18px' }}>
      <span style={{ fontFamily: IF, fontSize: 13.5, lineHeight: 1.55, color: DARK }}>
        <strong style={{ color: TEAL, letterSpacing: '0.02em' }}>Recommended — </strong>{children}
      </span>
    </div>
  )
}

function Btn({ label = 'Get Started', sub }: { label?: string; sub?: string }) {
  return (
    <span style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'flex-start', gap: 6 }}>
      <span style={{ display: 'inline-block', background: YELLOW, color: DARK, borderRadius: 12, padding: '11px 24px', fontFamily: IF, fontSize: 14, fontWeight: 600, letterSpacing: '0.01em' }}>
        {label}
      </span>
      {sub && <span style={{ fontFamily: IF, fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>{sub}</span>}
    </span>
  )
}

function TrustRow() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 14px', marginTop: 20 }}>
      {['CQC Registered', 'GMC Licensed GPs', 'GDPR Compliant'].map((t, i) => (
        <span key={t} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          {i > 0 && <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 10 }}>·</span>}
          <span style={{ fontFamily: IF, fontSize: 11, fontWeight: 500, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.04em' }}>{t}</span>
        </span>
      ))}
    </div>
  )
}

function Hook({ size = 'clamp(28px, 4vw, 40px)' }: { size?: string }) {
  return (
    <h4 style={{ fontFamily: GF, fontSize: size, fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1.08, color: WHITE, margin: 0 }}>
      More than a<br />health check.
    </h4>
  )
}

// ─── Main ──────────────────────────────────────────────────────────────────────

export default function Content() {
  return (
    <>
      <style>{`
        html { scroll-behavior: smooth; }
        .msg-col2 { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
        .msg-col3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
        .msg-fw2  { display: grid; grid-template-columns: 1fr 1fr; gap: 26px; }
        .msg-fw2-wide { display: grid; grid-template-columns: 1.05fr 0.95fr; gap: 26px; }
        @media (max-width: 860px) {
          .msg-col2, .msg-col3, .msg-fw2, .msg-fw2-wide { grid-template-columns: 1fr; }
        }
        .msg-tabs { display: flex; gap: 6px; overflow-x: auto; max-width: 1080px; margin: 0 auto; padding: 2px 0; scrollbar-width: none; }
        .msg-tabs::-webkit-scrollbar { display: none; }
        .msg-tab:hover { background: rgba(33,106,116,0.10) !important; }
      `}</style>

      <div style={{ fontFamily: IF, background: CREAM, minHeight: '100vh' }}>

        {/* ── Sticky header: banner + page tabs ── */}
        <div style={{ position: 'sticky', top: 0, zIndex: 100 }}>
          <div style={{ background: YELLOW, borderBottom: '1px solid rgba(45,39,0,0.15)', padding: '8px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
            <span style={{ fontFamily: IF, fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: TEXT }}>
              ⚑ Messaging Review — Internal only · Not indexed
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0 }}>
              <span style={{ fontFamily: IF, fontSize: 11, color: 'rgba(45,39,0,0.5)' }}>Updated June 29, 2026</span>
              <a href="/" style={{ fontFamily: IF, fontSize: 11, fontWeight: 600, color: TEAL, textDecoration: 'none' }}>← Homepage</a>
            </span>
          </div>
          <div style={{ background: WHITE, borderBottom: `1px solid ${BORDER}`, padding: '8px 24px' }}>
            <nav className="msg-tabs">
              {PAGE_NAV.map(t => (
                <a key={t.id} href={`#${t.id}`} className="msg-tab" style={{
                  fontFamily: IF, fontSize: 13, fontWeight: 600, color: DARK, textDecoration: 'none',
                  padding: '7px 14px', borderRadius: 8, whiteSpace: 'nowrap', transition: 'background 0.15s',
                }}>
                  {t.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* ── Intro ── */}
        <div style={{ padding: 'clamp(44px, 6vw, 72px) 24px clamp(32px, 4vw, 44px)' }}>
          <div style={{ maxWidth: 1080, margin: '0 auto' }}>
            <p style={{ fontFamily: IF, fontSize: 11, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: CORAL, margin: '0 0 12px' }}>
              Messaging Review · organised by page
            </p>
            <h1 style={{ fontFamily: GF, fontSize: 'clamp(34px, 5vw, 52px)', fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1.08, color: DARK, margin: '0 0 20px' }}>
              The Evida copy book
            </h1>
            <p style={{ fontFamily: IF, fontSize: 16, lineHeight: 1.65, color: MUTED, margin: '0 0 18px', maxWidth: '62ch' }}>
              Every page of the site, with the exact copy proposed for it. Each page leads with a <strong style={{ color: TEAL }}>recommendation</strong>,
              shows the alternatives where a choice is still open (<span style={{ color: CORAL, fontWeight: 600 }}>Decision needed</span>), and ends with its call-to-action.
              The hook <strong style={{ color: DARK, fontWeight: 600 }}>"More than a health check."</strong> is settled site-wide.
            </p>
            <p style={{ fontFamily: IF, fontSize: 14, lineHeight: 1.6, color: MUTED, margin: 0, maxWidth: '62ch' }}>
              Shared strategy (positioning, the service model) sits in <a href="#foundations" style={{ color: TEAL, fontWeight: 600, textDecoration: 'none' }}>Foundations</a>;
              the raw headline library and cross-page principles are in <a href="#reference" style={{ color: TEAL, fontWeight: 600, textDecoration: 'none' }}>Reference</a>.
              Use the tabs above to jump to any page.
            </p>
          </div>
        </div>

        {/* ════════════════════ FOUNDATIONS ════════════════════ */}
        <PageBanner
          id="foundations"
          n="Foundations"
          name="The shared spine"
          job="What every page draws from — settled and not up for debate here. If a page's copy contradicts this, the page is wrong."
          lives="Source: messaging-framework.md"
        />
        <Body bg={CREAM}>
          <Block label="Positioning" status="settled">
            <p style={{ fontFamily: GF, fontSize: 'clamp(18px, 2.4vw, 24px)', fontWeight: 400, lineHeight: 1.5, color: DARK, margin: '0 0 22px', maxWidth: '54ch' }}>
              Evida is a <strong>human + tech enabled service</strong> — not an app. The human (GP-led, lifestyle-focused care) and the tech (wearables, diagnostics, platform) are both load-bearing. Neither alone is the story.
            </p>
            <div className="msg-fw2" style={{ gap: 20 }}>
              <div>
                <p style={{ fontFamily: IF, fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: CORAL, margin: '0 0 12px' }}>What we are not</p>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 9 }}>
                  {[['Not an app', 'the interface is a layer over a human clinical service'], ['Not an AI doctor', 'AI surfaces trends; GPs interpret them'], ['Not the NHS', 'complementary preventative care, alongside primary care'], ['Not a one-off kit', "a year-long partnership, not a test you're left to read alone"]].map(([t, d]) => (
                    <li key={t} style={{ fontFamily: IF, fontSize: 14, lineHeight: 1.5, color: TEXT }}><strong style={{ color: DARK }}>{t}</strong> — {d}.</li>
                  ))}
                </ul>
              </div>
              <div>
                <p style={{ fontFamily: IF, fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: TEAL, margin: '0 0 12px' }}>We compete on</p>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 9 }}>
                  {[['Clinical empathy', 'unhurried, lifestyle-focused GP time'], ['Data continuity', 'bloods + wearable + history, joined up'], ['Time', 'convenience at booking, results and actions']].map(([t, d]) => (
                    <li key={t} style={{ fontFamily: IF, fontSize: 14, lineHeight: 1.5, color: TEXT }}><strong style={{ color: DARK }}>{t}</strong> — {d}.</li>
                  ))}
                </ul>
                <p style={{ fontFamily: IF, fontSize: 13, fontStyle: 'italic', color: TEAL, margin: '16px 0 0' }}>"We are in service of our customers." — the posture for every page.</p>
              </div>
            </div>
          </Block>

          <BlockSep />

          <Block label="The service model" status="settled" intro="The five-step engine the whiteboard describes, grouped into the three pillars all body copy uses. This replaces the retired “Track → Tailor → Act” loop.">
            <div className="msg-col3">
              {[
                { stage: 'INPUT', accent: TEAL, steps: ['i. Blood test (Randox)', 'ii. Wearable data'] },
                { stage: 'TRANSLATION', accent: GREEN, steps: ['iii. Book consult', 'iv. Lifestyle-focused GP time'] },
                { stage: 'OUTPUT', accent: CORAL, steps: ['v. Informed action & recommendations'] },
              ].map(s => (
                <div key={s.stage} style={{ background: WHITE, border: `1px solid ${BORDER}`, borderTop: `3px solid ${s.accent}`, borderRadius: 12, padding: '18px 20px' }}>
                  <p style={{ fontFamily: IF, fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: s.accent, margin: '0 0 10px' }}>{s.stage}</p>
                  {s.steps.map(st => (
                    <p key={st} style={{ fontFamily: IF, fontSize: 14, color: TEXT, lineHeight: 1.45, margin: '0 0 6px' }}>{st}</p>
                  ))}
                </div>
              ))}
            </div>
            <p style={{ fontFamily: IF, fontSize: 14, color: TEXT, margin: '18px 0 0' }}>
              In copy: <strong style={{ color: TEAL }}>Data-Led</strong> → <strong style={{ color: GREEN }}>GP-Led Insights</strong> → <strong style={{ color: CORAL }}>Informed Action</strong>.
            </p>
          </Block>
        </Body>

        {/* ════════════════════ HOMEPAGE ════════════════════ */}
        <PageBanner
          id="page-home"
          n="Page 1"
          name="Homepage"
          job="Hook interest, prove authority, and move the visitor into the membership funnel. Hero → problem → who it's for → the service → proof → CTA."
          lives="Primary CTA: Book my baseline · Secondary: See how it works"
        />
        <Body bg={CREAM}>
          <Block label="Hero — subheadline" status="decision" intro="The hook is fixed. Pick the line that sits beneath it.">
            <Rec>A1 — “Your membership to healthier years.” The benefit, in the agreed language.</Rec>
            {/* Recommended hero, full size */}
            <div style={{ background: DARK, borderRadius: 16, padding: 'clamp(32px, 4.5vw, 52px)', marginBottom: 18 }}>
              <Hook />
              <p style={{ fontFamily: GF, fontSize: 'clamp(18px, 2.4vw, 24px)', fontWeight: 300, fontStyle: 'italic', lineHeight: 1.4, color: 'rgba(255,255,255,0.72)', margin: '16px 0 26px' }}>
                Your membership to healthier years.
              </p>
              <Btn label="Book my baseline" sub="£320 / year · cancel anytime" />
              <TrustRow />
            </div>
            {/* Alternatives, compact */}
            <p style={{ fontFamily: IF, fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: MUTED, margin: '0 0 12px' }}>Alternatives</p>
            <div className="msg-col2">
              {SUBHEADLINES.filter(v => !v.recommended).map(v => (
                <div key={v.id} style={{ background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 10, padding: '16px 18px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <span style={{ fontFamily: GF, fontSize: 12, fontWeight: 500, color: 'rgba(33,106,116,0.5)' }}>{v.id}</span>
                    <span style={{ fontFamily: IF, fontSize: 9, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: v.accentColor, background: `${v.accentColor}16`, padding: '2px 7px', borderRadius: 999 }}>{v.approach}</span>
                  </div>
                  <p style={{ fontFamily: GF, fontSize: 17, fontWeight: 400, fontStyle: 'italic', color: DARK, lineHeight: 1.35, margin: '0 0 8px' }}>{v.sub}</p>
                  <p style={{ fontFamily: IF, fontSize: 12.5, lineHeight: 1.5, color: MUTED, margin: 0 }}>{v.note}</p>
                </div>
              ))}
            </div>
          </Block>

          <BlockSep />

          <Block label="Hero — structure" status="decision" intro="How the hero is laid out below the subheadline. Same hook and line; different amount of concrete detail up top.">
            <div className="msg-col3">
              {[
                { tag: 'Sentence (current)', kind: 'sentence' as const },
                { tag: 'Pillar chips', kind: 'chips' as const },
                { tag: 'Subheadline + list (rec.)', kind: 'list' as const },
              ].map(s => (
                <div key={s.tag}>
                  <p style={{ fontFamily: IF, fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: s.kind === 'list' ? TEAL : MUTED, margin: '0 0 10px' }}>{s.tag}</p>
                  <div style={{ background: DARK, borderRadius: 14, padding: '26px 24px', height: '100%', boxSizing: 'border-box' }}>
                    <Hook size="clamp(22px, 2.6vw, 28px)" />
                    {s.kind === 'sentence' && (
                      <p style={{ fontFamily: IF, fontSize: 14, lineHeight: 1.55, color: 'rgba(255,255,255,0.7)', margin: '12px 0 18px' }}>Your membership to healthier years.</p>
                    )}
                    {s.kind === 'chips' && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, margin: '14px 0 18px' }}>
                        {['Blood test', 'GP consult', 'Wearable data', 'Health plan'].map(c => (
                          <span key={c} style={{ background: 'rgba(255,255,255,0.09)', border: '1px solid rgba(255,255,255,0.16)', color: WHITE, borderRadius: 999, padding: '4px 12px', fontFamily: IF, fontSize: 12 }}>{c}</span>
                        ))}
                      </div>
                    )}
                    {s.kind === 'list' && (
                      <ul style={{ margin: '12px 0 18px', padding: 0, listStyle: 'none' }}>
                        {['100+ biomarker blood panel', '90 min GP time across the year', 'Connects your wearable'].map(i => (
                          <li key={i} style={{ display: 'flex', gap: 8, padding: '3px 0', fontFamily: IF, fontSize: 12.5, color: 'rgba(255,255,255,0.78)', lineHeight: 1.45 }}>
                            <span style={{ color: CORAL, fontSize: 9, marginTop: 3 }}>✦</span>{i}
                          </li>
                        ))}
                      </ul>
                    )}
                    <Btn label="Book my baseline" />
                  </div>
                </div>
              ))}
            </div>
          </Block>

          <BlockSep />

          <Block label="Problem — “Why Evida exists”" status="decision" intro="The reader has to feel the problem before the offer lands. Four angles for this section.">
            <Rec>Keep the current line — it names two failures and the bridge in one breath.</Rec>
            <div className="msg-col2">
              {PROBLEM_VARIANTS.map(p => (
                <div key={p.tag}>
                  <div style={{ background: WHITE, border: `1px solid ${p.recommended ? `${TEAL}55` : BORDER}`, borderRadius: 14, padding: 'clamp(24px, 3vw, 34px)' }}>
                    <p style={{ fontFamily: IF, fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: p.recommended ? TEAL : CORAL, margin: '0 0 14px' }}>{p.tag}{p.recommended ? ' · recommended' : ''}</p>
                    <p style={{ fontFamily: GF, fontSize: 'clamp(19px, 2.4vw, 25px)', fontWeight: 400, lineHeight: 1.3, color: DARK, margin: 0, letterSpacing: '-0.01em' }}>{p.text}</p>
                  </div>
                  <p style={{ fontFamily: IF, fontSize: 12.5, lineHeight: 1.5, color: MUTED, fontStyle: 'italic', margin: '8px 4px 0' }}>{p.note}</p>
                </div>
              ))}
            </div>
          </Block>

          <BlockSep />

          <Block label="Who it's for" status="draft" intro="A self-identification block so the right buyer recognises themselves. Sits between the problem and the service.">
            <div className="msg-col3">
              {AUDIENCE.map((a, i) => (
                <div key={a.who} style={{ background: WHITE, border: `1px solid ${BORDER}`, borderTop: `3px solid ${TEAL}`, borderRadius: 12, padding: '22px 20px' }}>
                  <p style={{ fontFamily: GF, fontSize: 12, fontWeight: 500, color: `${TEAL}99`, margin: '0 0 6px' }}>0{i + 1}</p>
                  <p style={{ fontFamily: GF, fontSize: 18, fontWeight: 500, color: DARK, margin: '0 0 8px', lineHeight: 1.25 }}>{a.who}</p>
                  <p style={{ fontFamily: IF, fontSize: 13.5, lineHeight: 1.55, color: MUTED, margin: 0 }}>{a.line}</p>
                </div>
              ))}
            </div>
          </Block>

          <BlockSep />

          <Block label="The service" status="draft" intro="Replaces the “Track. Tailor. Act.” carousel with a scannable, static three-column layout — Data → Insights → Action.">
            <div className="msg-col3">
              {FRAMEWORK.map(c => (
                <div key={c.eyebrow} style={{ background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 12, padding: '22px 20px' }}>
                  <p style={{ fontFamily: IF, fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: TEAL, margin: '0 0 8px' }}>{c.eyebrow}</p>
                  <p style={{ fontFamily: GF, fontSize: 16, fontWeight: 500, color: DARK, margin: '0 0 12px' }}>{c.title}</p>
                  <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                    {c.items.map(i => (
                      <li key={i} style={{ display: 'flex', gap: 8, padding: '5px 0', fontFamily: IF, fontSize: 13, color: MUTED, lineHeight: 1.5, borderTop: `1px solid ${BORDER}` }}>
                        <span style={{ color: CORAL, fontSize: 9, marginTop: 3 }}>✦</span>{i}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Block>

          <BlockSep />

          <Block label="Proof — member stories" status="reference" intro="The cards are placeholders today. When real quotes land, collect them to this four-beat shape. Generic praise doesn't convert; a specific marker plus a behaviour change does.">
            <div style={{ background: WHITE, border: `1px dashed ${TEAL}66`, borderRadius: 14, padding: 'clamp(22px, 3vw, 30px)', maxWidth: 620 }}>
              {[['1', 'The starting state', '“I had three wearables and no idea what any of it meant.”'], ['2', 'What Evida surfaced', '“My GP flagged an early marker my last check had missed.”'], ['3', 'The action', '“We adjusted two things and built a six-month plan.”'], ['4', 'The outcome', '“Six months on it’s back in range — and I finally understand my health.”']].map(([n, beat, ex], i) => (
                <div key={beat} style={{ display: 'flex', gap: 14, padding: '11px 0', borderTop: i === 0 ? 'none' : `1px solid ${BORDER}` }}>
                  <span style={{ fontFamily: GF, fontSize: 14, fontWeight: 500, color: TEAL, minWidth: 18 }}>{n}</span>
                  <div>
                    <p style={{ fontFamily: GF, fontSize: 15, fontWeight: 500, color: DARK, margin: '0 0 2px' }}>{beat}</p>
                    <p style={{ fontFamily: IF, fontSize: 13.5, lineHeight: 1.5, color: MUTED, fontStyle: 'italic', margin: 0 }}>{ex}</p>
                  </div>
                </div>
              ))}
              <p style={{ fontFamily: IF, fontSize: 13, color: TEXT, margin: '14px 0 0', paddingTop: 12, borderTop: `1px solid ${BORDER}` }}>— <strong style={{ color: DARK }}>Member name, age</strong> · verified member</p>
            </div>
            <p style={{ fontFamily: IF, fontSize: 13, fontStyle: 'italic', color: TEAL, margin: '14px 0 0' }}>Collection rule: every testimonial names one specific thing Evida found or changed. No specific, no publish.</p>
          </Block>
        </Body>

        {/* ════════════════════ MEMBERSHIP ════════════════════ */}
        <PageBanner
          id="page-membership"
          n="Page 2"
          name="Membership"
          job="The conversion page. Justify £320, make the inclusions unmissable, and remove every reason to hesitate."
          lives="Primary CTA: Activate membership · Secondary: View what's included"
        />
        <Body bg={CREAM_WARM}>
          <Block label="Hero" status="decision" intro="How the membership page opens.">
            <Rec>Option A — carry the homepage hook through. One message across the whole funnel.</Rec>
            <div className="msg-col3">
              {MEMBERSHIP_HEROES.map(m => (
                <div key={m.label}>
                  <div style={{ background: DARK, borderRadius: 14, padding: '26px 22px', height: '100%', boxSizing: 'border-box', border: m.recommended ? `2px solid ${YELLOW}` : '2px solid transparent' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                      <span style={{ fontFamily: IF, fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>{m.label}</span>
                      <span style={{ fontFamily: IF, fontSize: 10, color: m.tagColor, background: `${m.tagColor}26`, padding: '2px 8px', borderRadius: 999 }}>{m.tag}</span>
                    </div>
                    <h4 style={{ fontFamily: GF, fontSize: 'clamp(20px, 2.6vw, 26px)', fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1.1, color: WHITE, margin: '0 0 10px' }}>{m.title}</h4>
                    <p style={{ fontFamily: IF, fontSize: 13.5, lineHeight: 1.55, color: 'rgba(255,255,255,0.65)', margin: 0 }}>{m.sub}</p>
                  </div>
                  <p style={{ fontFamily: IF, fontSize: 12.5, lineHeight: 1.5, color: MUTED, fontStyle: 'italic', margin: '8px 4px 0' }}>{m.note}</p>
                </div>
              ))}
            </div>
          </Block>

          <BlockSep />

          <Block label="Pricing" status="decision" intro="£320 is never shown naked. The real card on the left; three ways to headline the price on the right. Lead the page with the anchor framing.">
            <div className="msg-fw2-wide" style={{ alignItems: 'start' }}>
              <div style={{ background: DARK, borderRadius: 16, padding: 'clamp(26px, 3.5vw, 34px)' }}>
                <span style={{ fontFamily: IF, fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: DARK, background: YELLOW, padding: '4px 11px', borderRadius: 999 }}>Pilot pricing</span>
                <h4 style={{ fontFamily: GF, fontSize: 'clamp(19px, 2.4vw, 24px)', fontWeight: 400, color: WHITE, margin: '16px 0 0' }}>The Evida Baseline membership</h4>
                <p style={{ fontFamily: GF, fontSize: 'clamp(32px, 4.5vw, 44px)', fontWeight: 500, color: WHITE, margin: '14px 0 2px', letterSpacing: '-0.02em' }}>£320 <span style={{ fontSize: 16, fontWeight: 400, color: 'rgba(255,255,255,0.45)' }}>/ year</span></p>
                <p style={{ fontFamily: IF, fontSize: 14, color: YELLOW, margin: '0 0 20px' }}>≈ £27 a month · cancel anytime</p>
                <ul style={{ margin: '0 0 24px', padding: 0, listStyle: 'none' }}>
                  {MEMBERSHIP_INCLUSIONS.map(item => (
                    <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '7px 0', fontFamily: IF, fontSize: 13.5, color: 'rgba(255,255,255,0.80)', lineHeight: 1.5, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                      <span style={{ color: YELLOW, flexShrink: 0 }}>✓</span>{item}
                    </li>
                  ))}
                </ul>
                <Btn label="Activate membership" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {PRICE_FRAMINGS.map(f => (
                  <div key={f.tag} style={{ background: WHITE, border: `1px solid ${f.tag === 'ALTERNATIVE ANCHOR' ? `${TEAL}55` : BORDER}`, borderRadius: 12, padding: '18px 20px' }}>
                    <p style={{ fontFamily: IF, fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: TEAL, margin: '0 0 8px' }}>{f.tag}{f.tag === 'ALTERNATIVE ANCHOR' ? ' · recommended' : ''}</p>
                    <p style={{ fontFamily: GF, fontSize: 'clamp(16px, 2vw, 19px)', fontWeight: 400, color: DARK, lineHeight: 1.3, margin: '0 0 8px', letterSpacing: '-0.01em' }}>{f.headline}</p>
                    <p style={{ fontFamily: IF, fontSize: 12.5, lineHeight: 1.5, color: MUTED, fontStyle: 'italic', margin: 0 }}>{f.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </Block>

          <BlockSep />

          <Block label="Comparison" status="draft" intro="The strongest single asset on the page — it makes £320 feel obvious. Evida column highlighted.">
            <div style={{ overflowX: 'auto', background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 14 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 640 }}>
                <thead>
                  <tr>
                    <th style={{ background: CREAM }}></th>
                    {COMPARISON.cols.map((c, i) => (
                      <th key={c} style={{ textAlign: 'left', fontFamily: GF, fontSize: 14, fontWeight: 500, color: i === 1 ? WHITE : DARK, background: i === 1 ? TEAL : CREAM, padding: '14px 18px', borderTopLeftRadius: i === 1 ? 0 : 0 }}>{c}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.rows.map((row, ri) => (
                    <tr key={row[0]} style={{ borderTop: `1px solid ${BORDER}` }}>
                      <td style={{ fontFamily: IF, fontSize: 12, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: MUTED, padding: '14px 18px' }}>{row[0]}</td>
                      {[1, 2, 3].map(ci => (
                        <td key={ci} style={{ fontFamily: IF, fontSize: 13.5, color: ci === 2 ? DARK : MUTED, fontWeight: ci === 2 ? 600 : 400, padding: '14px 18px', background: ci === 2 ? `${TEAL}0D` : 'transparent', lineHeight: 1.45 }}>{row[ci]}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Block>

          <BlockSep />

          <Block label="Objections & reassurance" status="draft" intro="Remove fear at the decision point. The chip strip rides under the CTA; the answers seed the FAQ.">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 24 }}>
              {REASSURANCE_CHIPS.map(c => (
                <span key={c} style={{ display: 'flex', alignItems: 'center', gap: 7, background: WHITE, border: `1px solid ${TEAL}33`, borderRadius: 999, padding: '8px 16px', fontFamily: IF, fontSize: 13, fontWeight: 500, color: DARK }}>
                  <span style={{ color: TEAL }}>✓</span>{c}
                </span>
              ))}
            </div>
            <div className="msg-col2">
              {OBJECTIONS.map(([q, a]) => (
                <div key={q} style={{ background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 12, padding: '20px 22px' }}>
                  <p style={{ fontFamily: GF, fontSize: 16, fontWeight: 500, color: DARK, margin: '0 0 9px', lineHeight: 1.35 }}><span style={{ color: CORAL }}>“</span>{q}<span style={{ color: CORAL }}>”</span></p>
                  <p style={{ fontFamily: IF, fontSize: 13.5, lineHeight: 1.6, color: MUTED, margin: 0 }}>{a}</p>
                </div>
              ))}
            </div>
          </Block>
        </Body>

        {/* ════════════════════ HOW IT WORKS ════════════════════ */}
        <PageBanner
          id="page-how"
          n="Page 3"
          name="How it works"
          job="Remove execution ambiguity. Walk the visitor through the actual year, step by step, so there are no surprises."
          lives="Primary CTA: Start my health plan"
        />
        <Body bg={CREAM}>
          <Block label="The journey" status="draft" intro="A five-step timeline with concrete timeframes. Proposed copy below.">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {HOW_IT_WORKS.map((p, i) => (
                <div key={p.title} style={{ display: 'flex', gap: 20, padding: '18px 0', borderTop: i === 0 ? 'none' : `1px solid ${BORDER}` }}>
                  <div style={{ flexShrink: 0, width: 90 }}>
                    <span style={{ fontFamily: GF, fontSize: 13, fontWeight: 500, color: TEAL }}>Step {i + 1}</span>
                    <p style={{ fontFamily: IF, fontSize: 12, color: MUTED, margin: '2px 0 0' }}>{p.when}</p>
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontFamily: GF, fontSize: 'clamp(17px, 2vw, 20px)', fontWeight: 500, color: DARK, margin: '0 0 5px' }}>{p.title}</p>
                    <p style={{ fontFamily: IF, fontSize: 14.5, lineHeight: 1.55, color: MUTED, margin: 0, maxWidth: '60ch' }}>{p.body}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 28 }}>
              <span style={{ display: 'inline-block', background: YELLOW, color: DARK, borderRadius: 12, padding: '11px 24px', fontFamily: IF, fontSize: 14, fontWeight: 600 }}>Start my health plan</span>
            </div>
          </Block>
        </Body>

        {/* ════════════════════ ABOUT US ════════════════════ */}
        <PageBanner
          id="page-about"
          n="Page 4"
          name="About us"
          job="Build institutional trust — for selective consumers, investors and partners. The why, the governance, and the human-in-the-loop promise."
          lives="Primary CTA: Book my baseline · Secondary: Read the research"
        />
        <Body bg={CREAM_WARM}>
          <Block label="The page" status="draft" intro="Three blocks. Reframes the current company page toward vision, clinical credibility, and the role of AI.">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {ABOUT_BLOCKS.map(b => (
                <div key={b.label} style={{ background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 14, padding: 'clamp(24px, 3vw, 32px)' }}>
                  <p style={{ fontFamily: IF, fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: TEAL, margin: '0 0 10px' }}>{b.label}</p>
                  <h4 style={{ fontFamily: GF, fontSize: 'clamp(20px, 2.6vw, 27px)', fontWeight: 400, color: DARK, margin: '0 0 10px', letterSpacing: '-0.01em', lineHeight: 1.25 }}>{b.heading}</h4>
                  <p style={{ fontFamily: IF, fontSize: 15, lineHeight: 1.6, color: MUTED, margin: 0, maxWidth: '70ch' }}>{b.body}</p>
                </div>
              ))}
            </div>
          </Block>
        </Body>

        {/* ════════════════════ FAQs ════════════════════ */}
        <PageBanner
          id="page-faqs"
          n="Page 5"
          name="FAQs"
          job="Kill the specific objections that block a purchase. Written in the customer's voice, grouped so they can find their worry fast."
          lives="Persistent CTA: Book my baseline · (Aman + Drew to draft full list)"
        />
        <Body bg={CREAM}>
          <Block label="Categories" status="draft" intro="The buckets the questions fall into.">
            <div className="msg-col2">
              {FAQ_CATEGORIES.map(([t, d], i) => (
                <div key={t} style={{ display: 'flex', gap: 14, background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 12, padding: '18px 20px' }}>
                  <span style={{ fontFamily: GF, fontSize: 14, fontWeight: 500, color: `${TEAL}99` }}>0{i + 1}</span>
                  <div>
                    <p style={{ fontFamily: GF, fontSize: 16, fontWeight: 500, color: DARK, margin: '0 0 3px' }}>{t}</p>
                    <p style={{ fontFamily: IF, fontSize: 13, lineHeight: 1.5, color: MUTED, margin: 0 }}>{d}</p>
                  </div>
                </div>
              ))}
            </div>
          </Block>

          <BlockSep />

          <Block label="Sample answers" status="draft" intro="The four highest-friction questions, answered in plain, reassuring language. These double as the membership-page objection block.">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {OBJECTIONS.map(([q, a]) => (
                <div key={q} style={{ background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 12, padding: '20px 22px' }}>
                  <p style={{ fontFamily: GF, fontSize: 16, fontWeight: 500, color: DARK, margin: '0 0 8px' }}>{q}</p>
                  <p style={{ fontFamily: IF, fontSize: 14, lineHeight: 1.6, color: MUTED, margin: 0, maxWidth: '74ch' }}>{a}</p>
                </div>
              ))}
            </div>
          </Block>
        </Body>

        {/* ════════════════════ REFERENCE ════════════════════ */}
        <PageBanner
          id="reference"
          n="Reference"
          name="Library & cross-page principles"
          job="Raw material and rules that aren't a single-page decision: the full headline pool, CTA microcopy guidance, the funnel map, nav order, and the open-decisions log."
          lives="Pull from here when drafting; don't treat as final copy"
        />
        <Body bg={CREAM_WARM}>
          <Block label="Headline library (15)" status="reference" intro="The full pool behind the homepage and membership shortlists, by approach. Use for A/B testing.">
            <div className="msg-col3">
              {HEADLINE_SWARM.map(g => (
                <div key={g.key} style={{ background: WHITE, border: `1px solid ${BORDER}`, borderTop: `3px solid ${g.accent}`, borderRadius: 12, padding: '20px 20px' }}>
                  <p style={{ fontFamily: IF, fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: g.accent, margin: '0 0 12px' }}>Approach {g.key} · {g.approach}</p>
                  <ol style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                    {g.headlines.map((h, hi) => (
                      <li key={h} style={{ display: 'flex', gap: 10, padding: '8px 0', borderTop: hi === 0 ? 'none' : `1px solid ${BORDER}`, fontFamily: GF, fontSize: 14.5, color: DARK, lineHeight: 1.35 }}>
                        <span style={{ color: `${g.accent}99`, fontSize: 12 }}>{hi + 1}</span>{h}
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          </Block>

          <BlockSep />

          <Block label="CTA microcopy" status="reference" intro="Cross-page rule: buttons are first-person, name the next action, and pair with a friction-killing sub-line. Per-page CTAs are in each page banner.">
            <div className="msg-col2">
              {CTA_VARIANTS.map((c, i) => (
                <div key={c.label} style={{ display: 'flex', alignItems: 'center', gap: 18, background: i === 0 ? CREAM : WHITE, border: `1px solid ${BORDER}`, borderRadius: 12, padding: '18px 20px' }}>
                  <span style={{ flexShrink: 0 }}>
                    <span style={{ display: 'block', background: YELLOW, color: DARK, borderRadius: 10, padding: '9px 18px', fontFamily: IF, fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap' }}>{c.label}</span>
                    {c.sub && <span style={{ display: 'block', fontFamily: IF, fontSize: 11, color: MUTED, marginTop: 5 }}>{c.sub}</span>}
                  </span>
                  <span style={{ fontFamily: IF, fontSize: 12.5, lineHeight: 1.5, color: i === 0 ? CORAL : TEAL, fontStyle: 'italic' }}>{c.note}</span>
                </div>
              ))}
            </div>
          </Block>

          <BlockSep />

          <Block label="Funnel & nav" status="reference" intro="Where each page's CTAs point, and the proposed nav order.">
            <div style={{ overflowX: 'auto', background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 14, marginBottom: 18 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 520 }}>
                <thead>
                  <tr>{['Page', 'Primary CTA', 'Secondary CTA'].map(h => (
                    <th key={h} style={{ textAlign: 'left', fontFamily: IF, fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: MUTED, padding: '14px 18px', borderBottom: `1px solid ${BORDER}`, background: CREAM }}>{h}</th>
                  ))}</tr>
                </thead>
                <tbody>
                  {CTA_MATRIX.map((row, i) => (
                    <tr key={row[0]} style={{ borderTop: i === 0 ? 'none' : `1px solid ${BORDER}` }}>
                      <td style={{ fontFamily: GF, fontSize: 14, fontWeight: 500, color: DARK, padding: '13px 18px' }}>{row[0]}</td>
                      <td style={{ padding: '13px 18px' }}><span style={{ fontFamily: IF, fontSize: 12.5, fontWeight: 600, color: DARK, background: YELLOW, padding: '4px 11px', borderRadius: 7, whiteSpace: 'nowrap' }}>{row[1]}</span></td>
                      <td style={{ fontFamily: IF, fontSize: 13, color: row[2] === '—' ? 'rgba(45,39,0,0.3)' : TEAL, padding: '13px 18px' }}>{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ fontFamily: IF, fontSize: 14, color: TEXT, margin: 0 }}>Proposed nav order: <strong style={{ color: DARK }}>How it works → Membership → About us → Blog → Contact us</strong></p>
          </Block>

          <BlockSep />

          <Block label="Open decisions & validation" status="reference">
            <div className="msg-fw2">
              <div style={{ background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 14, padding: '24px 26px' }}>
                <p style={{ fontFamily: IF, fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: CORAL, margin: '0 0 14px' }}>○ Decisions to make</p>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {['Homepage: subheadline + hero structure + problem line', 'Membership: hero option + lead price framing', 'Add real dashboard screenshots to the homepage', 'Pricing: separate page or stays on Membership?', 'Replace two placeholder testimonials before any external share', 'Draft the full FAQ list (Aman + Drew)'].map(t => (
                    <li key={t} style={{ display: 'flex', gap: 9, fontFamily: IF, fontSize: 13.5, color: TEXT, lineHeight: 1.5 }}><span style={{ color: CORAL }}>○</span>{t}</li>
                  ))}
                </ul>
              </div>
              <div style={{ background: DARK, borderRadius: 14, padding: '24px 26px' }}>
                <p style={{ fontFamily: IF, fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: YELLOW, margin: '0 0 12px' }}>How we validate — think-aloud UAT</p>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 11 }}>
                  {['Prioritise layout over final phrasing — ship and refine through real use.', '30-min screen-share calls, not written surveys.', 'Give tasks: "find what the £320 covers", "what happens with no wearable?".', 'Watch where the cursor hesitates — that is the friction.'].map(t => (
                    <li key={t} style={{ display: 'flex', gap: 10, fontFamily: IF, fontSize: 13.5, color: 'rgba(255,255,255,0.78)', lineHeight: 1.55 }}><span style={{ color: CORAL, marginTop: 3, fontSize: 9 }}>✦</span>{t}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div style={{ marginTop: 18, background: `${YELLOW}66`, border: `1px solid rgba(45,39,0,0.12)`, borderRadius: 12, padding: '16px 20px' }}>
              <p style={{ fontFamily: IF, fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9A7B00', margin: '0 0 8px' }}>⚙ Known site bugs (independent of copy)</p>
              <p style={{ fontFamily: IF, fontSize: 13.5, lineHeight: 1.6, color: TEXT, margin: 0 }}>
                Hero typo "Start your health now. journey" → fix · Loop + Performance Radar blocks render twice → remove duplicate · Track/Tailor/Act carousel → static grid · two placeholder testimonials.
              </p>
            </div>
          </Block>
        </Body>

      </div>
    </>
  )
}
