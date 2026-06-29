// Internal messaging review page — not linked in nav, not indexed.
// Pure TSX component (no PageClient / Webflow scripts needed).
// Living repository of the June 29 copy review + Gemini analysis. Drives copy decisions.

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

// ─── Status badge presets (used in section headers + contents nav) ──────────────

const STATUS = {
  context: { label: 'Context', color: TEAL, bg: `${TEAL}14` },
  decision: { label: 'Decision needed', color: CORAL, bg: `${CORAL}16` },
  reference: { label: 'Reference', color: MUTED, bg: 'rgba(45,39,0,0.06)' },
  action: { label: 'Action items', color: '#9A7B00', bg: YELLOW },
} as const

type StatusKey = keyof typeof STATUS

// ─── Contents / nav ─────────────────────────────────────────────────────────────

const CONTENTS_GROUPS: { group: string; items: { id: string; n: string; title: string; status: StatusKey }[] }[] = [
  {
    group: 'Movement I — Variants & framework',
    items: [
      { id: 'engine', n: '1', title: 'The operational engine', status: 'context' },
      { id: 'subheadlines', n: '2', title: 'Homepage subheadline options', status: 'decision' },
      { id: 'hero-structure', n: '3', title: 'Hero structure', status: 'decision' },
      { id: 'framework', n: '4', title: 'Service framework', status: 'decision' },
      { id: 'membership', n: '5', title: 'Membership page hero', status: 'decision' },
      { id: 'swarm', n: '6', title: 'Full headline swarm (15)', status: 'reference' },
      { id: 'pages', n: '7', title: 'Page architecture', status: 'reference' },
      { id: 'cta-matrix', n: '8', title: 'CTA funnel matrix', status: 'reference' },
      { id: 'positioning', n: '9', title: 'Positioning guardrails', status: 'context' },
    ],
  },
  {
    group: 'Movement II — Conversion & UX-writing layer',
    items: [
      { id: 'price', n: '10', title: 'The price story', status: 'decision' },
      { id: 'objections', n: '11', title: 'Objections & risk reversal', status: 'decision' },
      { id: 'cta-lab', n: '12', title: 'CTA microcopy lab', status: 'decision' },
      { id: 'problem', n: '13', title: 'Problem framing', status: 'decision' },
      { id: 'audience', n: '14', title: 'Is Evida for you', status: 'reference' },
      { id: 'proof', n: '15', title: 'Proof that converts', status: 'reference' },
    ],
  },
  {
    group: 'Decide & validate',
    items: [
      { id: 'decisions', n: '16', title: 'Open decisions & UAT', status: 'action' },
    ],
  },
]

// ─── Data ─────────────────────────────────────────────────────────────────────

// Part 1 — the curated subheadline shortlist (subset of the full swarm, in hero context)
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
    accentColor: GREEN,
    preferred: false,
    sub: 'The clinical upgrade your wearable data has been waiting for.',
    note: 'Leads with wearable integration — identified as the main differentiator that hooks people in conversation. Targets existing device owners.',
  },
  {
    id: 'B2',
    approach: 'CONCRETE',
    accentColor: GREEN,
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

// Part 1 — operational engine, the three-stage telemetry → clinical → action flow
const ENGINE_STAGES = [
  {
    stage: 'INPUT',
    sub: 'Telemetry',
    accent: TEAL,
    steps: [
      ['i', 'Blood test', 'Baseline biomarkers via a Randox clinic'],
      ['ii', 'Wearable data', 'Passive stream from Apple, Oura, Whoop, Garmin'],
    ],
  },
  {
    stage: 'TRANSLATION',
    sub: 'Clinical human pivot',
    accent: GREEN,
    steps: [
      ['iii', 'Book consult', '45-min video consultation with a GP'],
      ['iv', 'Lifestyle-focused GP time', 'Unhurried interpretation, prevention not symptoms'],
    ],
  },
  {
    stage: 'OUTPUT',
    sub: 'Action protocol',
    accent: CORAL,
    steps: [
      ['v', 'Informed action / recommendations', 'A clear plan, partner network, ongoing support from Evi'],
    ],
  },
]

// Part 1 — discrepancy audit: what the automated notes missed
const AUDIT_NOTES = [
  {
    title: 'The 5-step sequence was missing',
    body: 'The whiteboard numbers the service i → v. Automated notes scattered these as unlinked bullets. This chronology is the backbone every page should reflect.',
  },
  {
    title: '90 minutes of GP time, not 45',
    body: 'The live prototype still advertises a single 45-min consult + 6-month follow-up. Reality: 45 min up front PLUS a further 45 min of follow-up time = 90 core minutes. (2 × 15 optional check-ins on top — mention, don’t headline.)',
  },
  {
    title: 'Track / Tailor / Act is a structural pivot',
    body: 'Treated as a copy tweak in the notes. It is a framework replacement — Data-Led → GP-Led Insights → Action — that should restructure the homepage, not just reword it.',
  },
  {
    title: 'Convenience has three distinct moments',
    body: 'The whiteboard splits TIME / CONVENIENCE into Booking, Results, and Actions/Recs. Any "convenient" claim must demonstrate time saved at all three touchpoints.',
  },
]

const CONVENIENCE = [
  ['Booking', 'Easy, fast, no friction to get started'],
  ['Results', 'Delivered to one place, not scattered across apps'],
  ['Actions / Recs', 'Clear, clinician-authored next steps — not generic advice'],
]

// Part 4 — membership page hero options
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
    tagColor: GREEN,
    title: 'Your data. Your GP. Your plan.',
    sub: 'Blood tests, wearable integration, and 90 minutes of GP-led consultation — in one annual membership.',
    note: 'Skips the ephemeral layer entirely. Leads with the concrete service for people who need specifics before they engage.',
  },
]

// Part 6 — the full headline swarm (15 across three psychological approaches)
const HEADLINE_SWARM = [
  {
    key: 'A',
    approach: 'ASPIRATIONAL',
    accent: TEAL,
    angle: 'Targets the emotional benefit of long-term vitality — for people focused on wellness and longevity.',
    headlines: [
      'Your annual membership to healthier years.',
      'More than a health check. A lifelong plan for vitality.',
      'Invest in your healthspan. Live better, longer.',
      "Don't just track your lifespan. Extend your healthy years.",
      'The preventative healthcare membership built for your life.',
    ],
    sub: 'Most health data sits scattered across devices, unread and unlinked. Evida unites your baseline biomarkers with daily wearable tracking, giving a dedicated GP the clear picture needed to safeguard your future.',
    valueProps: [
      ['Continuous health optimization', 'Passive wearable tracking combined with deep clinical diagnostics.'],
      ['Unbiased longevity planning', 'A custom strategy designed by medical professionals to protect your future health.'],
      ['Dedicated clinical continuity', 'Two comprehensive 45-minute physician consultations focused entirely on your long-term wellness.'],
    ],
  },
  {
    key: 'B',
    approach: 'CONCRETE',
    accent: GREEN,
    angle: 'Targets practical buyers who want to know exactly what they get for their money — time, data, access.',
    headlines: [
      'Comprehensive diagnostics meet unhurried GP care.',
      'Your biomarkers, wearables, and medical history. Finally in one place.',
      '100+ biomarkers. Continuous data sync. 90 minutes of expert GP care.',
      'The clinical upgrade your wearable data has been waiting for.',
      'Complete preventative health management for £320 a year.',
    ],
    sub: 'Standard health assessments offer quick check-ins and generic advice. Evida gives you an automated, secure data network and up to 90 minutes of clinical analysis per year to keep you ahead of potential illness.',
    valueProps: [
      ['Advanced lab diagnostics', 'Your baseline biomarkers mapped via premier Randox clinical draws.'],
      ['Unified wearable integration', 'Turn daily telemetry into actionable steps with our integrated platform API.'],
      ['Extended physician access', '90 total minutes of video consultations per year with a dedicated, GMC-licensed GP.'],
    ],
  },
  {
    key: 'C',
    approach: 'DIRECT CONTRAST',
    accent: CORAL,
    angle: 'For people frustrated by short, rushed, reactive medical visits and the lack of personal guidance.',
    headlines: [
      'More than a health check. Because your doctor needs time to listen.',
      "Rushed appointments won't protect your health. Evida will.",
      'Your wearable spots the trends. We give your GP time to read them.',
      'Stop guessing about your health data. Get real clinical direction.',
      'A premium healthcare service designed around prevention, not reactions.',
    ],
    sub: 'The typical health check lasts ten minutes and only reacts after you get sick. Evida combines technology with deep clinical analysis, giving you the space and insight needed to stop chronic issues before they appear.',
    valueProps: [
      ['Deep-dive analysis', 'Move past rushed appointments with detailed, 45-minute clinical reviews.'],
      ['Connected digital records', 'Bring your wearable data out of isolation and into a secure clinical space.'],
      ['Proactive action tracking', 'Clear, expert guidance paired with concrete lifestyle steps and structured 6-month checks.'],
    ],
  },
]

// Part 7 — multi-page architecture blueprint
const PAGES = [
  {
    name: 'Homepage',
    role: 'The ecosystem overview',
    objective: 'Hook interest, prove medical authority, drive to the membership funnel.',
    sections: [
      'Hero — "More than a health check" + unified delivery statement + dual CTA',
      'Trust bar — CQC / GMC / GDPR validation',
      'The problem — 81-year lifespan vs ~47 healthy years',
      'The framework — Data → Insights → Action (replaces Track. Tailor. Act.)',
      'Product visuals — real dashboard: wearable trends + biomarker indicators',
      'Social proof — high-intent member testimonials (replace placeholders)',
    ],
    primary: 'Book Now',
    secondary: 'See How It Works',
  },
  {
    name: 'Membership',
    role: 'The value-realization sheet',
    objective: 'Address financial objections, clarify inclusions, justify the £320 annual rate.',
    sections: [
      'Hero — "Your year of health" positioning',
      'Core matrix — flat static 3-column (Data / Insights / Action), no carousel',
      'Data column — full Randox panel + multi-device API integration',
      'Insights column — 90 total minutes of GP time across the year',
      'Action column — longevity roadmap + partner wellness network',
    ],
    primary: 'Activate Membership',
    secondary: 'View Biomarkers',
  },
  {
    name: 'How It Works',
    role: 'The service timeline',
    objective: 'Remove execution ambiguity; walk through the actual journey step by step.',
    sections: [
      'Phase 1 (Days 1–3) — onboarding, account setup, wearable pairing',
      'Phase 2 (Week 1) — Randox clinic blood draw',
      'Phase 3 (Week 2) — results delivered, book the 45-min consult',
      'Phase 4 (Months 1–6) — follow the roadmap, continuous monitoring',
      'Phase 5 (Month 6) — second 45-min follow-up vs baseline',
    ],
    primary: 'Start Your Journey',
    secondary: null,
  },
  {
    name: 'About Us',
    role: 'The "why" & governance profile',
    objective: 'Build institutional trust for stakeholders, investors, and selective consumers.',
    sections: [
      'Vision — shifting healthcare from reactive to protective',
      'Clinical governance — leadership, GMC registrations, NHS background',
      'Human-in-the-loop — AI surfaces trends; a real GP always interprets',
    ],
    primary: 'Join the Waitlist / Book Now',
    secondary: 'Read Research',
  },
  {
    name: 'FAQs',
    role: 'The friction-reduction matrix',
    objective: 'Address specific objections that block conversion. (Aman + Drew to draft.)',
    sections: [
      'Biomarker detail — hormones, metabolic, cardiovascular, vitamins',
      'Hardware compatibility — Oura, Apple Health, Whoop, Garmin',
      'NHS coordination — how Evida works alongside your regular GP',
      'Data security; what happens with no wearable',
    ],
    primary: 'Ready? Book Your Baseline',
    secondary: null,
  },
  {
    name: 'Blog',
    role: 'The longevity publication engine',
    objective: 'Distribute research-backed advice and drive organic SEO traffic.',
    sections: ['Longevity & lifestyle articles', 'Outbound link target from About Us "Read Research"'],
    primary: '—',
    secondary: null,
  },
]

// Part 8 — CTA funnel matrix
const CTA_MATRIX: [string, string, string, string][] = [
  ['Homepage hero', 'Book Baseline', 'Learn More', 'Funnel entry / smooth scroll to How It Works'],
  ['Homepage footer', 'Book Baseline', '—', 'Direct account creation'],
  ['Membership details', 'Activate Membership', 'View Biomarkers', 'Secure checkout / jump to FAQ anchor'],
  ['How It Works timeline', 'Get Started', '—', 'Funnel entry'],
  ['About Us / Our Why', 'Book Baseline', 'Read Research', 'Funnel entry / outbound to Blog'],
]

// ── Conversion & UX-writing layer ──────────────────────────────────────────────

// Part 10 — the price story (mirrors the real membership pricing card)
const MEMBERSHIP_INCLUSIONS = [
  'Comprehensive biomarker blood panel at a Randox clinic (100+ markers)',
  'Wearable integration — Oura, Apple, Garmin, Whoop',
  'A 45-minute consultation with a GP who has read your results in advance',
  'Your personalised prevention plan, in plain English',
  '6-month follow-up (a further 45 minutes) to review progress',
  'Two 15-minute check-in consults to use across the year',
  'Evi, your daily companion, for non-clinical guidance and nudges',
]

const PRICE_FRAMINGS = [
  {
    tag: 'UNIT REFRAME',
    headline: '£320 a year — about £27 a month.',
    sub: 'Priced like a subscription, not a procedure. Less than many people spend on coffee, or a gym they barely use.',
    note: 'Monthly mental accounting makes the annual figure feel small. Show the per-month equivalent everywhere the price appears.',
  },
  {
    tag: 'ALTERNATIVE ANCHOR',
    headline: 'One private GP visit buys you ten minutes. £320 buys you a year.',
    sub: 'A private GP appointment runs ~£200 for a single rushed visit. A standalone blood panel is ~£250–300 with no one to interpret it. Evida is £320 for all of it — bloods, wearable integration and 90 minutes of GP time across the year.',
    note: 'Anchoring against what £320 replaces reframes it from an expense into a saving. The strongest single lever for premium pricing.',
  },
  {
    tag: 'FOUNDING MEMBER',
    headline: 'Pilot pricing — locked for founding members.',
    sub: 'Join the founding cohort at £320 and keep that rate as we grow. Pricing rises after the pilot.',
    note: 'Turns the existing "Pilot pricing" label into legitimate urgency and belonging — honest scarcity, not a fake countdown.',
  },
]

// Part 11 — objection handling & risk reversal
const REASSURANCE_CHIPS = [
  'No referral needed',
  'Cancel anytime',
  'Works alongside your NHS GP',
  'No wearable? Still works',
  'Results in 72 hours',
  'GMC-licensed GPs',
]

const OBJECTIONS: [string, string][] = [
  ["I don't have an Oura ring or Apple Watch.", 'Evida works fully without one. Your blood panel and GP consultations stand on their own — a wearable simply adds a richer, continuous picture if you have one.'],
  ["Isn't this just a fancy blood test?", 'No. A test hands you numbers. Evida gives you 90 minutes with a GP who has read them in advance, a plan in plain English, and a year of follow-up.'],
  ['Will this replace my NHS GP?', 'No — it complements it. Evida is preventative; your NHS GP stays your first port of call for acute care. We can share your plan with them.'],
  ['£320 is a lot to pay up front.', 'It works out around £27 a month for a year of proactive care — less than a single private GP visit, which buys you ten minutes.'],
]

// Part 12 — CTA microcopy lab
const CTA_VARIANTS: { label: string; sub: string | null; note: string }[] = [
  { label: 'Get Started', sub: null, note: 'Current — generic. States no value and no next step.' },
  { label: 'Book my baseline', sub: '£320 / year · cancel anytime', note: 'Names the concrete first action and removes commitment fear. First-person.' },
  { label: 'Start my health plan', sub: 'No referral needed · results in 72 hours', note: 'First-person ownership plus two friction-killers in the microcopy.' },
  { label: "See if Evida's right for me", sub: '2-minute eligibility check', note: 'Low-commitment entry for the not-yet-sure. Strong as a secondary CTA.' },
  { label: 'Claim a founding membership', sub: 'Pilot pricing, locked for year one', note: 'Pairs the CTA with scarcity and belonging. For the founding-cohort push.' },
]

// Part 13 — problem framing (mirrors the homepage "Why Evida exists" statement)
const PROBLEM_VARIANTS = [
  { tag: 'CURRENT', text: 'Your wearable sees the trends. Your GP has ten minutes. Evida joins the dots.', note: 'Live on the homepage. Strong — names two failures and the bridge in one breath.' },
  { tag: 'HEALTHSPAN GAP', text: "You'll likely live to 81. But the average person spends their final decade in poor health. Evida is built to change that math.", note: 'Leads with the 81-vs-healthspan stat already on the page. Big-picture, emotional stakes.' },
  { tag: 'DATA STRANDED', text: 'Your watch counts every step. Your last blood test sits in a drawer. Nobody is connecting them — until now.', note: 'Concrete and visual. Targets people who already track but feel unseen.' },
  { tag: 'TIME & EMPATHY', text: 'Ten-minute appointments can only react to illness. Evida gives a GP the time — and the data — to get ahead of it.', note: 'The antidote framing. Resonates with NHS frustration without naming it.' },
]

// Part 14 — audience self-identification
const AUDIENCE = [
  { who: 'The quantified optimiser', line: 'You already wear an Oura or Whoop. You have the data — what you lack is anyone qualified to tell you what it means.' },
  { who: 'The time-poor professional', line: "You're 35+, your appointments feel rushed, and you'd rather prevent the problem now than react to it at 55." },
  { who: 'The recently spooked', line: 'A scare, a diagnosis in the family, a number that came back off. You want a proper baseline and a real plan — not a leaflet.' },
]

// Part 15 — proof structure (mirrors the homepage "Member stories" cards)
const PROOF_TEMPLATE: [string, string][] = [
  ['The starting state', 'A specific, relatable situation — "I had three wearables and no idea what any of it meant."'],
  ['What Evida surfaced', 'A concrete clinical insight — "My GP flagged an early marker my last check had missed."'],
  ['The action taken', 'The change it led to — "We adjusted two things and built a six-month plan."'],
  ['The outcome', 'A measurable or felt result — "Six months on it\'s back in range, and I finally understand my own health."'],
]

const TRUST_LINES = [
  'In a world of AI, real experience matters more than ever.',
  'AI surfaces the trends. A real GP decides what they mean for you.',
  'Every insight is read, interpreted and signed off by a GMC-licensed doctor.',
]

// ─── Section wrapper ───────────────────────────────────────────────────────────

function Section({ id, children, bg = CREAM, last = false }: { id?: string; children: React.ReactNode; bg?: string; last?: boolean }) {
  return (
    <div id={id} style={{ background: bg, padding: `clamp(40px, 5vw, 64px) 24px ${last ? 'clamp(64px, 8vw, 96px)' : 'clamp(40px, 5vw, 64px)'}`, scrollMarginTop: 52 }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        {children}
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: StatusKey }) {
  const s = STATUS[status]
  return (
    <span style={{ fontFamily: IF, fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: s.color, background: s.bg, padding: '3px 9px', borderRadius: 999, whiteSpace: 'nowrap' }}>
      {s.label}
    </span>
  )
}

function SectionHeader({ part, title, intro, status }: { part: string; title: string; intro: string; status?: StatusKey }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '0 0 6px', flexWrap: 'wrap' }}>
        <p style={{ fontFamily: IF, fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: CORAL, margin: 0 }}>
          {part}
        </p>
        {status && <StatusBadge status={status} />}
      </div>
      <h2 style={{ fontFamily: GF, fontSize: 'clamp(22px, 2.8vw, 30px)', fontWeight: 400, letterSpacing: '-0.01em', color: DARK, margin: '0 0 10px' }}>
        {title}
      </h2>
      <p style={{ fontFamily: IF, fontSize: 15, lineHeight: 1.6, color: MUTED, margin: 0, maxWidth: '64ch' }}>
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
        html { scroll-behavior: smooth; }
        .msg-col2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .msg-col3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .msg-fw2  { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; }
        .msg-contents { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; }
        .msg-engine { display: flex; align-items: stretch; gap: 0; }
        .msg-engine-arrow { display: flex; align-items: center; justify-content: center; padding: 0 12px; flex-shrink: 0; }
        .msg-conv { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
        .msg-swarm-grid { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 24px; }
        .msg-pages { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        @media (max-width: 860px) {
          .msg-col2, .msg-col3, .msg-fw2, .msg-pages, .msg-swarm-grid, .msg-conv { grid-template-columns: 1fr; }
          .msg-contents { grid-template-columns: 1fr; }
          .msg-engine { flex-direction: column; }
          .msg-engine-arrow { padding: 6px 0; transform: rotate(90deg); }
        }
        .msg-framework-old-cards { display: grid; grid-template-columns: 1fr; gap: 12px; }
        .msg-framework-new-cols  { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
        @media (max-width: 640px) {
          .msg-framework-new-cols { grid-template-columns: 1fr; }
        }
        .msg-toc-link:hover { background: rgba(33,106,116,0.07) !important; }
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
              The Evida copy<br />decision room
            </h1>
            <p style={{ fontFamily: IF, fontSize: 16, lineHeight: 1.65, color: MUTED, margin: '0 0 28px', maxWidth: '60ch' }}>
              Everything from the June 29 review (Aman + Satyam) and the Gemini analysis, in one place.
              The hook <strong style={{ color: DARK, fontWeight: 600 }}>"More than a health check."</strong> is settled.
              Sections tagged <span style={{ color: CORAL, fontWeight: 600 }}>Decision needed</span> are live choices to make by direct comparison;
              the rest is context and reference. Source of truth: <code style={{ fontSize: 13, background: 'rgba(33,106,116,0.08)', padding: '2px 6px', borderRadius: 4, color: TEAL }}>messaging-framework.md</code>
            </p>

            {/* Contents nav */}
            <div style={{ background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 14, padding: '20px 22px' }}>
              <p style={{ fontFamily: IF, fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: MUTED, margin: '0 0 16px' }}>
                On this page
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                {CONTENTS_GROUPS.map(grp => (
                  <div key={grp.group}>
                    <p style={{ fontFamily: IF, fontSize: 10.5, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: TEAL, margin: '0 0 8px', paddingLeft: 10 }}>
                      {grp.group}
                    </p>
                    <div className="msg-contents">
                      {grp.items.map(c => (
                        <a key={c.id} href={`#${c.id}`} className="msg-toc-link" style={{
                          display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none',
                          padding: '8px 10px', borderRadius: 8, transition: 'background 0.15s',
                        }}>
                          <span style={{ fontFamily: GF, fontSize: 13, fontWeight: 500, color: 'rgba(33,106,116,0.4)', minWidth: 18 }}>{c.n}</span>
                          <span style={{ fontFamily: IF, fontSize: 14, fontWeight: 500, color: DARK, flex: 1 }}>{c.title}</span>
                          <StatusBadge status={c.status} />
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Divider />

        {/* ══════════════════════════════════════════════════════
            PART 1 — THE OPERATIONAL ENGINE
        ══════════════════════════════════════════════════════ */}
        <Section id="engine">
          <SectionHeader
            part="Part 1 — The operational engine"
            status="context"
            title="The 5-step service the whiteboard actually describes"
            intro="This is the structural backbone all copy should reflect — telemetry in, clinical human translation, action out. The automated notes missed the numbered sequence; the audit below records the corrections it needs."
          />

          {/* Three-stage flow */}
          <div className="msg-engine">
            {ENGINE_STAGES.map((st, i) => (
              <div key={st.stage} style={{ display: 'contents' }}>
                <div style={{ flex: 1, background: WHITE, border: `1px solid ${BORDER}`, borderTop: `3px solid ${st.accent}`, borderRadius: 12, padding: '22px 20px' }}>
                  <p style={{ fontFamily: IF, fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: st.accent, margin: '0 0 2px' }}>
                    {st.stage}
                  </p>
                  <p style={{ fontFamily: IF, fontSize: 12, color: MUTED, margin: '0 0 16px', fontStyle: 'italic' }}>{st.sub}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {st.steps.map(([num, label, desc]) => (
                      <div key={num} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                        <span style={{ fontFamily: GF, fontSize: 15, fontWeight: 500, color: st.accent, minWidth: 24, lineHeight: 1.4 }}>{num}.</span>
                        <span>
                          <span style={{ display: 'block', fontFamily: GF, fontSize: 15, fontWeight: 500, color: DARK, lineHeight: 1.3 }}>{label}</span>
                          <span style={{ display: 'block', fontFamily: IF, fontSize: 13, color: MUTED, lineHeight: 1.5, marginTop: 2 }}>{desc}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                {i < ENGINE_STAGES.length - 1 && (
                  <div className="msg-engine-arrow">
                    <span style={{ fontFamily: GF, fontSize: 22, color: 'rgba(33,106,116,0.4)' }}>→</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* The three pillars derived from the engine */}
          <p style={{ fontFamily: IF, fontSize: 14, lineHeight: 1.6, color: TEXT, margin: '24px 0 0', maxWidth: '70ch' }}>
            Grouped as the new three pillars: <strong style={{ color: TEAL }}>Data-Led</strong> (bloods + wearables + history) →{' '}
            <strong style={{ color: GREEN }}>GP-Led Insights</strong> (unhurried clinical translation) →{' '}
            <strong style={{ color: CORAL }}>Action / Recommendations</strong> (practical next steps + partner integrations).
            This replaces Track → Tailor → Act — see Part 4.
          </p>

          {/* Convenience three touchpoints */}
          <div style={{ marginTop: 32 }}>
            <p style={{ fontFamily: IF, fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: MUTED, margin: '0 0 12px' }}>
              Convenience is three distinct moments — not one tag
            </p>
            <div className="msg-conv">
              {CONVENIENCE.map(([t, d], i) => (
                <div key={t} style={{ background: CREAM_WARM, border: `1px solid ${BORDER}`, borderRadius: 10, padding: '16px 18px' }}>
                  <p style={{ fontFamily: GF, fontSize: 15, fontWeight: 500, color: DARK, margin: '0 0 4px' }}>
                    <span style={{ color: TEAL }}>{i + 1}.</span> {t}
                  </p>
                  <p style={{ fontFamily: IF, fontSize: 13, lineHeight: 1.5, color: MUTED, margin: 0 }}>{d}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Discrepancy audit */}
          <div style={{ marginTop: 36, background: `${CORAL}0A`, border: `1px solid ${CORAL}26`, borderRadius: 14, padding: 'clamp(22px, 3vw, 30px)' }}>
            <p style={{ fontFamily: IF, fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: CORAL, margin: '0 0 4px' }}>
              ⚑ Discrepancy audit
            </p>
            <p style={{ fontFamily: IF, fontSize: 14, lineHeight: 1.6, color: TEXT, margin: '0 0 20px', maxWidth: '66ch' }}>
              Corrections the raw transcript + whiteboard make to the automated Granola notes. These are the things to get right before publishing copy.
            </p>
            <div className="msg-col2">
              {AUDIT_NOTES.map((a, i) => (
                <div key={a.title} style={{ background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 10, padding: '18px 20px' }}>
                  <p style={{ fontFamily: GF, fontSize: 16, fontWeight: 500, color: DARK, margin: '0 0 8px', lineHeight: 1.3 }}>
                    <span style={{ color: CORAL, fontFamily: IF, fontWeight: 700, fontSize: 13 }}>{String(i + 1).padStart(2, '0')} · </span>{a.title}
                  </p>
                  <p style={{ fontFamily: IF, fontSize: 13.5, lineHeight: 1.6, color: MUTED, margin: 0 }}>{a.body}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Divider />

        {/* ══════════════════════════════════════════════════════
            PART 2 — HOMEPAGE SUBHEADLINE OPTIONS
        ══════════════════════════════════════════════════════ */}
        <Section id="subheadlines" bg={CREAM_WARM}>
          <SectionHeader
            part="Part 2 — Homepage subheadline options"
            status="decision"
            title="Six subheadlines under consideration"
            intro="The hook is fixed. These are the options for what sits below it, rendered in the hero context. Each represents a distinct psychological approach. The full raw set of 15 is in Part 6."
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
            PART 3 — HERO STRUCTURE VARIANTS
        ══════════════════════════════════════════════════════ */}
        <Section id="hero-structure">
          <SectionHeader
            part="Part 3 — Hero structure"
            status="decision"
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
            PART 4 — SERVICE FRAMEWORK
        ══════════════════════════════════════════════════════ */}
        <Section id="framework" bg={CREAM_WARM}>
          <SectionHeader
            part="Part 4 — Service framework"
            status="decision"
            title="Track → Tailor → Act vs Data → Insights → Action"
            intro={`"Track → Tailor → Act" is being retired. These are the old and proposed replacement rendered side by side — same service, different structural lens. The new one maps directly onto the operational engine in Part 1.`}
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
            PART 5 — MEMBERSHIP PAGE HERO
        ══════════════════════════════════════════════════════ */}
        <Section id="membership">
          <SectionHeader
            part="Part 5 — Membership page hero"
            status="decision"
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
            PART 6 — FULL HEADLINE SWARM
        ══════════════════════════════════════════════════════ */}
        <Section id="swarm" bg={CREAM_WARM}>
          <SectionHeader
            part="Part 6 — Full headline swarm"
            status="reference"
            title="All 15 headlines, three approaches, with value-prop sets"
            intro="The complete raw material for A/B testing — beyond the curated shortlist in Part 2. Each approach carries its own subheadline and a matching three-bullet value-prop set for the membership page."
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {HEADLINE_SWARM.map((g, gi) => (
              <div key={g.key} style={{ background: WHITE, border: `1px solid ${BORDER}`, borderLeft: `4px solid ${g.accent}`, borderRadius: 14, padding: 'clamp(24px, 3vw, 32px)' }}>
                {/* Approach header */}
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 4, flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: GF, fontSize: 20, fontWeight: 500, color: g.accent }}>Approach {g.key}</span>
                  <span style={{ fontFamily: IF, fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: g.accent, background: `${g.accent}14`, padding: '3px 9px', borderRadius: 999 }}>
                    {g.approach}
                  </span>
                </div>
                <p style={{ fontFamily: IF, fontSize: 14, lineHeight: 1.6, color: MUTED, margin: '0 0 22px', maxWidth: '66ch' }}>{g.angle}</p>

                <div className="msg-swarm-grid">
                  {/* Headlines */}
                  <div>
                    <p style={{ fontFamily: IF, fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: MUTED, margin: '0 0 12px' }}>Headlines</p>
                    <ol style={{ margin: 0, padding: 0, listStyle: 'none', counterReset: 'h' }}>
                      {g.headlines.map((h, hi) => (
                        <li key={h} style={{ display: 'flex', gap: 12, padding: '9px 0', borderTop: hi === 0 ? 'none' : `1px solid ${BORDER}` }}>
                          <span style={{ fontFamily: GF, fontSize: 13, fontWeight: 500, color: `${g.accent}99`, minWidth: 20 }}>{gi * 5 + hi + 1}</span>
                          <span style={{ fontFamily: GF, fontSize: 'clamp(15px, 1.8vw, 17px)', fontWeight: 400, color: DARK, lineHeight: 1.35 }}>{h}</span>
                        </li>
                      ))}
                    </ol>

                    {/* Subheadline block */}
                    <div style={{ marginTop: 18, background: DARK, borderRadius: 10, padding: '18px 20px' }}>
                      <p style={{ fontFamily: IF, fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', margin: '0 0 8px' }}>Subheadline</p>
                      <p style={{ fontFamily: GF, fontSize: 'clamp(14px, 1.7vw, 16px)', fontWeight: 300, fontStyle: 'italic', lineHeight: 1.5, color: 'rgba(255,255,255,0.78)', margin: 0 }}>{g.sub}</p>
                    </div>
                  </div>

                  {/* Value props */}
                  <div>
                    <p style={{ fontFamily: IF, fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: MUTED, margin: '0 0 12px' }}>Value-prop set</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {g.valueProps.map(([t, d]) => (
                        <div key={t} style={{ background: CREAM, border: `1px solid ${BORDER}`, borderRadius: 10, padding: '14px 16px' }}>
                          <p style={{ fontFamily: GF, fontSize: 14.5, fontWeight: 500, color: DARK, margin: '0 0 3px' }}>{t}</p>
                          <p style={{ fontFamily: IF, fontSize: 13, lineHeight: 1.5, color: MUTED, margin: 0 }}>{d}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Divider />

        {/* ══════════════════════════════════════════════════════
            PART 7 — PAGE ARCHITECTURE
        ══════════════════════════════════════════════════════ */}
        <Section id="pages">
          <SectionHeader
            part="Part 7 — Page architecture"
            status="reference"
            title="The multi-page blueprint"
            intro="How the messaging maps across the whole site. Each page has one job, a section stack, and a primary/secondary CTA pair. Conversion funnels into the membership flow from every page."
          />

          <div className="msg-pages">
            {PAGES.map(p => (
              <div key={p.name} style={{ background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 14, padding: 'clamp(22px, 3vw, 28px)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 2, flexWrap: 'wrap' }}>
                  <h3 style={{ fontFamily: GF, fontSize: 22, fontWeight: 500, color: DARK, margin: 0 }}>{p.name}</h3>
                  <span style={{ fontFamily: IF, fontSize: 12, color: TEAL, fontStyle: 'italic' }}>{p.role}</span>
                </div>
                <p style={{ fontFamily: IF, fontSize: 13.5, lineHeight: 1.55, color: MUTED, margin: '0 0 16px' }}>{p.objective}</p>

                <ul style={{ margin: '0 0 18px', padding: 0, listStyle: 'none', flex: 1 }}>
                  {p.sections.map(s => (
                    <li key={s} style={{ display: 'flex', gap: 9, padding: '5px 0', fontFamily: IF, fontSize: 13, color: TEXT, lineHeight: 1.5 }}>
                      <span style={{ color: CORAL, flexShrink: 0, marginTop: 3, fontSize: 9 }}>✦</span>
                      {s}
                    </li>
                  ))}
                </ul>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, paddingTop: 14, borderTop: `1px solid ${BORDER}` }}>
                  <span style={{ fontFamily: IF, fontSize: 12, fontWeight: 600, color: DARK, background: YELLOW, padding: '5px 12px', borderRadius: 8 }}>
                    {p.primary}
                  </span>
                  {p.secondary && (
                    <span style={{ fontFamily: IF, fontSize: 12, fontWeight: 500, color: TEAL, border: `1px solid ${TEAL}44`, padding: '5px 12px', borderRadius: 8 }}>
                      {p.secondary}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <p style={{ fontFamily: IF, fontSize: 13, color: MUTED, margin: '20px 0 0' }}>
            Proposed nav order (left → right): <strong style={{ color: DARK }}>How it works → Membership → About us → Blog → Contact us</strong>
          </p>
        </Section>

        <Divider />

        {/* ══════════════════════════════════════════════════════
            PART 8 — CTA FUNNEL MATRIX
        ══════════════════════════════════════════════════════ */}
        <Section id="cta-matrix" bg={CREAM_WARM}>
          <SectionHeader
            part="Part 8 — CTA funnel matrix"
            status="reference"
            title="Where each call-to-action points"
            intro="Consistent primary / secondary CTA pairing across touchpoints so the funnel behaves predictably from any entry point."
          />

          <div style={{ overflowX: 'auto', background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 14 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 640 }}>
              <thead>
                <tr>
                  {['Touchpoint', 'Primary CTA', 'Secondary CTA', 'Destination / behaviour'].map(h => (
                    <th key={h} style={{ textAlign: 'left', fontFamily: IF, fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: MUTED, padding: '16px 20px', borderBottom: `1px solid ${BORDER}`, background: CREAM }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {CTA_MATRIX.map((row, i) => (
                  <tr key={row[0]} style={{ borderTop: i === 0 ? 'none' : `1px solid ${BORDER}` }}>
                    <td style={{ fontFamily: GF, fontSize: 14, fontWeight: 500, color: DARK, padding: '15px 20px' }}>{row[0]}</td>
                    <td style={{ padding: '15px 20px' }}>
                      <span style={{ fontFamily: IF, fontSize: 12.5, fontWeight: 600, color: DARK, background: YELLOW, padding: '4px 11px', borderRadius: 7, whiteSpace: 'nowrap' }}>{row[1]}</span>
                    </td>
                    <td style={{ fontFamily: IF, fontSize: 13, color: row[2] === '—' ? 'rgba(45,39,0,0.3)' : TEAL, padding: '15px 20px', whiteSpace: 'nowrap' }}>{row[2]}</td>
                    <td style={{ fontFamily: IF, fontSize: 13, color: MUTED, padding: '15px 20px' }}>{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Divider />

        {/* ══════════════════════════════════════════════════════
            PART 9 — POSITIONING GUARDRAILS
        ══════════════════════════════════════════════════════ */}
        <Section id="positioning">
          <SectionHeader
            part="Part 9 — Positioning guardrails"
            status="context"
            title="Settled positioning — judge every option against this"
            intro="The non-negotiables. Evida is a premium, tech-enabled service — not a faceless tracking app. From messaging-framework.md."
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

        <Divider />

        {/* ══════════════════════════════════════════════════════
            MOVEMENT II BANNER
        ══════════════════════════════════════════════════════ */}
        <div style={{ background: DARK, padding: 'clamp(48px, 6vw, 72px) 24px' }}>
          <div style={{ maxWidth: 1080, margin: '0 auto' }}>
            <p style={{ fontFamily: IF, fontSize: 11, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: YELLOW, margin: '0 0 12px' }}>
              Movement II
            </p>
            <h2 style={{ fontFamily: GF, fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1.1, color: WHITE, margin: '0 0 18px' }}>
              The conversion &amp; UX-writing layer
            </h2>
            <p style={{ fontFamily: IF, fontSize: 16, lineHeight: 1.65, color: 'rgba(255,255,255,0.72)', margin: 0, maxWidth: '62ch' }}>
              Movement I decides <em>what we say</em>. This is <em>how we get the click</em> — the mechanics that turn interest into a £320 membership:
              anchoring the price, killing the objections, sharpening the buttons, mirroring the buyer, and proving it works.
              Every block below is shaped like a real component already on the site, so the copy can be dropped straight in.
            </p>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════
            PART 10 — THE PRICE STORY
        ══════════════════════════════════════════════════════ */}
        <Section id="price">
          <SectionHeader
            part="Part 10 — The price story"
            status="decision"
            title="£320 is never shown naked"
            intro="The membership card currently states the price as a number. These reframings anchor it so £320 reads as a saving, not a spend. Left: the real pricing card with the inclusions. Right: three ways to headline the price."
          />

          <div className="msg-fw2" style={{ alignItems: 'start' }}>
            {/* Real pricing card mock */}
            <div style={{ background: DARK, borderRadius: 16, padding: 'clamp(28px, 4vw, 36px)' }}>
              <span style={{ fontFamily: IF, fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: DARK, background: YELLOW, padding: '4px 11px', borderRadius: 999 }}>
                Pilot pricing
              </span>
              <h3 style={{ fontFamily: GF, fontSize: 'clamp(20px, 2.6vw, 26px)', fontWeight: 400, color: WHITE, margin: '16px 0 4px', letterSpacing: '-0.01em' }}>
                The Evida Baseline membership
              </h3>
              <p style={{ fontFamily: GF, fontSize: 'clamp(34px, 5vw, 46px)', fontWeight: 500, color: WHITE, margin: '14px 0 2px', letterSpacing: '-0.02em' }}>
                £320 <span style={{ fontSize: 16, fontWeight: 400, color: 'rgba(255,255,255,0.45)' }}>/ year</span>
              </p>
              <p style={{ fontFamily: IF, fontSize: 14, color: YELLOW, margin: '0 0 22px' }}>≈ £27 a month · cancel anytime</p>
              <ul style={{ margin: '0 0 26px', padding: 0, listStyle: 'none' }}>
                {MEMBERSHIP_INCLUSIONS.map(item => (
                  <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '7px 0', fontFamily: IF, fontSize: 14, color: 'rgba(255,255,255,0.80)', lineHeight: 1.5, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                    <span style={{ color: YELLOW, flexShrink: 0, marginTop: 1 }}>✓</span>{item}
                  </li>
                ))}
              </ul>
              <Btn label="Book my baseline" />
            </div>

            {/* Three framings */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {PRICE_FRAMINGS.map(f => (
                <div key={f.tag} style={{ background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 12, padding: '20px 22px' }}>
                  <p style={{ fontFamily: IF, fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: TEAL, margin: '0 0 8px' }}>{f.tag}</p>
                  <p style={{ fontFamily: GF, fontSize: 'clamp(17px, 2.1vw, 20px)', fontWeight: 400, color: DARK, lineHeight: 1.3, margin: '0 0 8px', letterSpacing: '-0.01em' }}>{f.headline}</p>
                  <p style={{ fontFamily: IF, fontSize: 13.5, lineHeight: 1.55, color: MUTED, margin: '0 0 10px' }}>{f.sub}</p>
                  <p style={{ fontFamily: IF, fontSize: 12.5, lineHeight: 1.5, color: TEAL, fontStyle: 'italic', margin: 0, paddingTop: 10, borderTop: `1px solid ${BORDER}` }}>{f.note}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Divider />

        {/* ══════════════════════════════════════════════════════
            PART 11 — OBJECTIONS & RISK REVERSAL
        ══════════════════════════════════════════════════════ */}
        <Section id="objections" bg={CREAM_WARM}>
          <SectionHeader
            part="Part 11 — Objections & risk reversal"
            status="decision"
            title="Answer the hesitation at the point of decision"
            intro="The fastest way to lift conversion on a premium service is to remove fear, not add features. A reassurance strip rides under every CTA; the objection answers are written in the customer's own voice for the FAQ block."
          />

          {/* Reassurance strip */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 28 }}>
            {REASSURANCE_CHIPS.map(c => (
              <span key={c} style={{ display: 'flex', alignItems: 'center', gap: 7, background: WHITE, border: `1px solid ${TEAL}33`, borderRadius: 999, padding: '8px 16px', fontFamily: IF, fontSize: 13.5, fontWeight: 500, color: DARK }}>
                <span style={{ color: TEAL }}>✓</span>{c}
              </span>
            ))}
          </div>

          {/* Objection → answer */}
          <div className="msg-col2">
            {OBJECTIONS.map(([q, a]) => (
              <div key={q} style={{ background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 12, padding: '22px 24px' }}>
                <p style={{ fontFamily: GF, fontSize: 17, fontWeight: 500, color: DARK, margin: '0 0 10px', lineHeight: 1.35 }}>
                  <span style={{ color: CORAL }}>“</span>{q}<span style={{ color: CORAL }}>”</span>
                </p>
                <p style={{ fontFamily: IF, fontSize: 14, lineHeight: 1.6, color: MUTED, margin: 0 }}>{a}</p>
              </div>
            ))}
          </div>
        </Section>

        <Divider />

        {/* ══════════════════════════════════════════════════════
            PART 12 — CTA MICROCOPY LAB
        ══════════════════════════════════════════════════════ */}
        <Section id="cta-lab">
          <SectionHeader
            part="Part 12 — CTA microcopy lab"
            status="decision"
            title='Every button currently says "Get Started"'
            intro="The button is the conversion moment and it's doing the least work on the site. Stronger CTAs are first-person, name the next concrete action, and pair with a line of friction-killing microcopy underneath."
          />

          <div className="msg-col3">
            {CTA_VARIANTS.map((c, i) => (
              <div key={c.label} style={{ background: i === 0 ? CREAM_WARM : WHITE, border: `1px solid ${i === 0 ? BORDER : `${TEAL}33`}`, borderRadius: 12, padding: '24px 22px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 7, marginBottom: 16 }}>
                  <Btn label={c.label} />
                  {c.sub && (
                    <span style={{ fontFamily: IF, fontSize: 12, color: MUTED, letterSpacing: '0.01em' }}>{c.sub}</span>
                  )}
                </div>
                <p style={{ fontFamily: IF, fontSize: 13, lineHeight: 1.55, color: i === 0 ? CORAL : TEAL, fontStyle: 'italic', margin: 'auto 0 0' }}>{c.note}</p>
              </div>
            ))}
          </div>
        </Section>

        <Divider />

        {/* ══════════════════════════════════════════════════════
            PART 13 — PROBLEM FRAMING
        ══════════════════════════════════════════════════════ */}
        <Section id="problem" bg={CREAM_WARM}>
          <SectionHeader
            part="Part 13 — Problem framing"
            status="decision"
            title='The "Why Evida exists" statement, four ways'
            intro="Before the offer lands, the reader has to feel the problem. This is the homepage problem section — same slot, four emotional angles to test."
          />

          <div className="msg-col2">
            {PROBLEM_VARIANTS.map(p => (
              <div key={p.tag}>
                <div style={{ background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 14, padding: 'clamp(28px, 4vw, 40px)' }}>
                  <p style={{ fontFamily: IF, fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: CORAL, margin: '0 0 16px' }}>{p.tag}</p>
                  <p style={{ fontFamily: GF, fontSize: 'clamp(20px, 2.6vw, 27px)', fontWeight: 400, lineHeight: 1.3, color: DARK, margin: 0, letterSpacing: '-0.01em' }}>{p.text}</p>
                </div>
                <p style={{ fontFamily: IF, fontSize: 13, lineHeight: 1.55, color: MUTED, fontStyle: 'italic', margin: '10px 4px 0' }}>{p.note}</p>
              </div>
            ))}
          </div>
        </Section>

        <Divider />

        {/* ══════════════════════════════════════════════════════
            PART 14 — IS EVIDA FOR YOU
        ══════════════════════════════════════════════════════ */}
        <Section id="audience">
          <SectionHeader
            part="Part 14 — Is Evida for you"
            status="reference"
            title="Let the right person recognise themselves"
            intro="People convert when they see themselves on the page. A self-identification block — three buyer profiles plus an honest 'not for you yet' — qualifies hard and earns trust at the same time. Sits well above the membership CTA."
          />

          <div className="msg-col3" style={{ marginBottom: 16 }}>
            {AUDIENCE.map((a, i) => (
              <div key={a.who} style={{ background: WHITE, border: `1px solid ${BORDER}`, borderTop: `3px solid ${TEAL}`, borderRadius: 12, padding: '24px 22px' }}>
                <p style={{ fontFamily: GF, fontSize: 12, fontWeight: 500, color: `${TEAL}99`, margin: '0 0 6px' }}>0{i + 1}</p>
                <p style={{ fontFamily: GF, fontSize: 19, fontWeight: 500, color: DARK, margin: '0 0 10px', lineHeight: 1.25 }}>{a.who}</p>
                <p style={{ fontFamily: IF, fontSize: 14, lineHeight: 1.6, color: MUTED, margin: 0 }}>{a.line}</p>
              </div>
            ))}
          </div>

          <div style={{ background: `${CORAL}0A`, border: `1px solid ${CORAL}26`, borderRadius: 12, padding: '20px 24px' }}>
            <p style={{ fontFamily: IF, fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: CORAL, margin: '0 0 6px' }}>Honest disclaimer — builds trust</p>
            <p style={{ fontFamily: IF, fontSize: 14.5, lineHeight: 1.6, color: TEXT, margin: 0, maxWidth: '70ch' }}>
              <strong style={{ color: DARK }}>Not for you (yet)?</strong> If you need acute or emergency care, that's your NHS GP — and we'll work alongside them. Evida is for staying ahead, not for treating what's already gone wrong.
            </p>
          </div>
        </Section>

        <Divider />

        {/* ══════════════════════════════════════════════════════
            PART 15 — PROOF THAT CONVERTS
        ══════════════════════════════════════════════════════ */}
        <Section id="proof" bg={CREAM_WARM}>
          <SectionHeader
            part="Part 15 — Proof that converts"
            status="reference"
            title="A template for member stories — not generic praise"
            intro="The homepage member-story cards are still placeholders. When real quotes come in, collect them to this shape: a four-beat arc that proves the service worked. Generic 'great experience' praise doesn't convert; a specific marker plus a behaviour change does."
          />

          <div className="msg-fw2" style={{ alignItems: 'start' }}>
            {/* Story template card */}
            <div>
              <p style={{ fontFamily: IF, fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: MUTED, margin: '0 0 12px' }}>
                Member-story structure (template — not a real quote)
              </p>
              <div style={{ background: WHITE, border: `1px dashed ${TEAL}66`, borderRadius: 14, padding: 'clamp(24px, 3.5vw, 32px)' }}>
                {PROOF_TEMPLATE.map(([beat, guide], i) => (
                  <div key={beat} style={{ display: 'flex', gap: 14, padding: '12px 0', borderTop: i === 0 ? 'none' : `1px solid ${BORDER}` }}>
                    <span style={{ fontFamily: GF, fontSize: 14, fontWeight: 500, color: TEAL, minWidth: 22 }}>{i + 1}</span>
                    <div>
                      <p style={{ fontFamily: GF, fontSize: 15.5, fontWeight: 500, color: DARK, margin: '0 0 3px' }}>{beat}</p>
                      <p style={{ fontFamily: IF, fontSize: 13.5, lineHeight: 1.55, color: MUTED, margin: 0 }}>{guide}</p>
                    </div>
                  </div>
                ))}
                <p style={{ fontFamily: IF, fontSize: 13, color: TEXT, margin: '16px 0 0', paddingTop: 14, borderTop: `1px solid ${BORDER}` }}>
                  — <strong style={{ color: DARK }}>Member name, age</strong> · <span style={{ color: MUTED }}>verified member</span>
                </p>
              </div>
            </div>

            {/* Trust lines */}
            <div>
              <p style={{ fontFamily: IF, fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: MUTED, margin: '0 0 12px' }}>
                Human-in-the-loop trust line — options
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {TRUST_LINES.map((t, i) => (
                  <div key={t} style={{ background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 12, padding: '18px 20px' }}>
                    <span style={{ fontFamily: GF, fontSize: 13, fontWeight: 500, color: `${TEAL}99`, marginRight: 8 }}>{String.fromCharCode(65 + i)}</span>
                    <span style={{ fontFamily: GF, fontSize: 'clamp(15px, 1.9vw, 18px)', fontWeight: 400, color: DARK, lineHeight: 1.4 }}>{t}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 16, padding: '16px 18px', background: `${TEAL}0D`, border: `1px solid ${TEAL}22`, borderRadius: 10 }}>
                <p style={{ fontFamily: IF, fontSize: 13, lineHeight: 1.6, color: DARK, margin: 0, fontStyle: 'italic' }}>
                  Collection rule: every testimonial should name one specific thing Evida found or changed. No specific, no publish.
                </p>
              </div>
            </div>
          </div>
        </Section>

        <Divider />

        {/* ══════════════════════════════════════════════════════
            PART 16 — OPEN DECISIONS & UAT
        ══════════════════════════════════════════════════════ */}
        <Section id="decisions" last>
          <SectionHeader
            part="Part 16 — Open decisions & team execution"
            status="action"
            title="What's settled, what's pending, how to test it"
            intro="The running checklist. Settled items are locked; pending items need a call from this review; the UAT protocol is how we validate before going wider."
          />

          <div className="msg-fw2">
            {/* Settled */}
            <div style={{ background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 14, padding: 'clamp(22px, 3vw, 28px)' }}>
              <p style={{ fontFamily: IF, fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: TEAL, margin: '0 0 14px' }}>✓ Settled</p>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 11 }}>
                {[
                  'Hook: "More than a health check."',
                  'GP time: 90 min core (45 baseline + 45 follow-up); 2×15 optional, mention only.',
                  'Framework pivot: Track/Tailor/Act → Data / GP-Led Insights / Action.',
                  'Convenience framed as three touchpoints (booking, results, actions).',
                  '"Healthier years" over "longevity" as core outcome language.',
                ].map(t => (
                  <li key={t} style={{ display: 'flex', gap: 9, fontFamily: IF, fontSize: 13.5, color: TEXT, lineHeight: 1.5 }}>
                    <span style={{ color: TEAL, flexShrink: 0 }}>✓</span>{t}
                  </li>
                ))}
              </ul>
            </div>

            {/* Pending */}
            <div style={{ background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 14, padding: 'clamp(22px, 3vw, 28px)' }}>
              <p style={{ fontFamily: IF, fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: CORAL, margin: '0 0 14px' }}>○ Pending decisions</p>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 11 }}>
                {[
                  'Pick the homepage subheadline (Part 2) — A1 preferred.',
                  'Pick the hero structure (Part 3).',
                  'Pick the membership hero (Part 5).',
                  'Add real dashboard screenshots to the homepage.',
                  'Draft the FAQ question list (Aman + Drew).',
                  'Pricing: separate page or absorbed into Membership?',
                  'Replace two placeholder testimonials before any external share.',
                ].map(t => (
                  <li key={t} style={{ display: 'flex', gap: 9, fontFamily: IF, fontSize: 13.5, color: TEXT, lineHeight: 1.5 }}>
                    <span style={{ color: CORAL, flexShrink: 0 }}>○</span>{t}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Known dev bugs */}
          <div style={{ marginTop: 20, background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 14, padding: 'clamp(22px, 3vw, 28px)' }}>
            <p style={{ fontFamily: IF, fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#9A7B00', margin: '0 0 14px' }}>⚙ Known site bugs (independent of copy)</p>
            <div className="msg-col2">
              {[
                ['Hero copy typo', 'Reads "Start your health now. journey" — fix to "Start your health journey now."'],
                ['Section duplication', 'Loop + Performance Radar blocks render twice (desktop + mobile containers). Remove the hidden duplicate.'],
                ['Carousel → static grid', 'Replace the scrolling Track/Tailor/Act cards with a scannable static layout.'],
                ['Placeholder testimonials', 'Two of three homepage member cards are still placeholder copy.'],
              ].map(([t, d]) => (
                <div key={t} style={{ fontFamily: IF, fontSize: 13.5, lineHeight: 1.55, color: TEXT }}>
                  <strong style={{ color: DARK }}>{t}</strong> — <span style={{ color: MUTED }}>{d}</span>
                </div>
              ))}
            </div>
          </div>

          {/* UAT protocol */}
          <div style={{ marginTop: 20, background: DARK, borderRadius: 14, padding: 'clamp(24px, 3.5vw, 34px)' }}>
            <p style={{ fontFamily: IF, fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: YELLOW, margin: '0 0 10px' }}>How we validate — think-aloud UAT</p>
            <p style={{ fontFamily: GF, fontSize: 'clamp(16px, 2vw, 19px)', fontWeight: 300, lineHeight: 1.5, color: 'rgba(255,255,255,0.85)', margin: '0 0 20px', maxWidth: '64ch' }}>
              Prioritise layout structure over final phrasing. Don't wait for perfect copy — ship a clean single-page version and refine it through live user interaction.
            </p>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                'Run 30-minute screen-share calls with internal testers and early guinea pigs — not written surveys (they overcomplicate).',
                'Give direct tasks: "Find what happens to your data if you don’t own an Oura ring", "Locate exactly what’s included in the £320 price".',
                'Watch where the cursor lingers or falters — that surfaces hidden friction far faster than a questionnaire.',
                'Olga remote: screen share, or a half-day at LBS if remote testing is an issue.',
              ].map(t => (
                <li key={t} style={{ display: 'flex', gap: 11, fontFamily: IF, fontSize: 14, color: 'rgba(255,255,255,0.78)', lineHeight: 1.55 }}>
                  <span style={{ color: CORAL, flexShrink: 0, marginTop: 3, fontSize: 10 }}>✦</span>{t}
                </li>
              ))}
            </ul>
          </div>
        </Section>

      </div>
    </>
  )
}
