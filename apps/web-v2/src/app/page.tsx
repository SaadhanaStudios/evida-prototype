import Link from "next/link";
import PullQuote from "@/components/PullQuote";
import { DashboardCard } from "@/components/ProductVisuals";
import { LINKS, PRICE } from "@/lib/site";

/*
 * Home — a summary hub, per the July 3 whiteboard. Flow:
 * Hero → Membership summary (Data | Insight | Action) → pull-quote →
 * How-it-works summary (Initial / 6 months / Ongoing) → About teaser →
 * Blog + evidence carousel → closing pricing CTA.
 * Each block anchors out to its full page.
 */

const PILLARS = [
  {
    title: "Data",
    body: "A baseline blood panel of 100+ biomarkers at a Randox clinic, your wearable's daily stream, and your medical history — finally in one place.",
  },
  {
    title: "Insight",
    body: "90 minutes of core GP time across the year. Unhurried, lifestyle-focused consultations with a doctor who has actually read your data.",
  },
  {
    title: "Action",
    body: "A prevention plan agreed with your GP, support from Evi between visits, and a six-month follow-up to measure what changed.",
  },
];

const STAGES = [
  {
    n: "01",
    title: "Initial",
    when: "Your first two weeks",
    body: "Join, connect your wearable, complete your history, and have your baseline bloods drawn at a Randox clinic.",
    href: "/how-it-works#initial",
  },
  {
    n: "02",
    title: "Grounding",
    when: "Your first six months",
    body: "A 45-minute consultation with a lifestyle-medicine GP, and a prevention plan built around your own numbers.",
    href: "/how-it-works#six-months",
  },
  {
    n: "03",
    title: "Ongoing",
    when: "Year after year",
    body: "A 45-minute follow-up at month six, optional check-ins, and monitoring that compounds — every year adds context.",
    href: "/how-it-works#ongoing",
  },
];

const EVIDENCE = [
  {
    quote: "Around half of UK adults now track their health with a wearable — yet that data rarely reaches a clinician.",
    source: "LondonWorld, on UK health-tracking adoption",
  },
  {
    quote: "We live to 81 on average in the UK — but only around 47 of those years are spent in good health.",
    source: "The Health Foundation, REAL Centre",
  },
  {
    quote: "Forming a healthy habit alone succeeds 29% of the time. With someone in the loop, 59%. Add commitment: 72%.",
    source: "Micro Habits, Humphrey & Hughes",
  },
];

export default function Home() {
  return (
    <>
      {/* ————— Hero ————— */}
      <section className="container-site grid items-center gap-12 pb-16 pt-16 md:grid-cols-2 md:gap-16 md:pt-24">
        <div>
          <p className="eyebrow">Preventative health membership</p>
          <h1 className="h-display mt-4 text-5xl leading-[1.05] md:text-6xl">
            More than a<br />health check.
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">
            Your membership to healthier years. Evida unites your blood biomarkers,
            wearable data and medical history in one place — and gives a GP the time
            to actually read them.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link href="/how-it-works" className="btn-secondary">
              How it works
            </Link>
            <a href={LINKS.book} className="btn-primary">
              Book your baseline
            </a>
          </div>
          <p className="mt-8 text-xs font-medium uppercase tracking-wider text-ink-soft">
            GMC-registered GPs &nbsp;·&nbsp; Randox diagnostics &nbsp;·&nbsp; UK GDPR compliant
          </p>
        </div>
        <DashboardCard />
      </section>

      {/* ————— Membership summary: Data | Insight | Action ————— */}
      <section className="container-site py-16 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">The membership</p>
            <h2 className="h-display mt-3 text-3xl md:text-4xl">
              Data. Insight. Action.
            </h2>
          </div>
          <Link href="/membership" className="btn-ghost">
            Explore the membership →
          </Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {PILLARS.map((p, i) => (
            <Link key={p.title} href="/membership" className="card group transition-colors hover:border-teal/40">
              <div className="font-mono text-xs font-semibold tabular-nums text-ink-soft">0{i + 1}</div>
              <h3 className="h-display mt-3 text-2xl group-hover:text-teal">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{p.body}</p>
            </Link>
          ))}
        </div>
        <p className="mt-6 text-sm text-ink-soft">
          No wearable? No problem — the membership works fully without one.
        </p>
      </section>

      {/* ————— Editorial pull-quote ————— */}
      <PullQuote source="The Evida principle">
        No single data point tells the whole story.
      </PullQuote>

      {/* ————— How it works summary ————— */}
      <section className="border-y border-line bg-surface">
        <div className="container-site py-16 md:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">How it works</p>
              <h2 className="h-display mt-3 text-3xl md:text-4xl">
                Three stages. One continuous picture.
              </h2>
            </div>
            <Link href="/how-it-works" className="btn-ghost">
              See the full journey →
            </Link>
          </div>
          <ol className="mt-10 grid gap-6 md:grid-cols-3">
            {STAGES.map((s) => (
              <li key={s.n}>
                <Link href={s.href} className="card group block h-full transition-colors hover:border-teal/40">
                  <div className="flex items-baseline justify-between">
                    <span className="font-mono text-xs font-semibold tabular-nums text-teal">{s.n}</span>
                    <span className="text-xs font-medium uppercase tracking-wider text-ink-soft">{s.when}</span>
                  </div>
                  <h3 className="h-display mt-3 text-2xl group-hover:text-teal">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">{s.body}</p>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ————— Why Evida exists (About teaser) ————— */}
      <section className="container-site grid items-center gap-10 py-16 md:grid-cols-2 md:gap-16 md:py-20">
        <div>
          <p className="eyebrow">Why we exist</p>
          <h2 className="h-display mt-3 text-3xl md:text-4xl">
            Healthcare waits for you to get sick. We don&rsquo;t.
          </h2>
          <p className="mt-5 max-w-md leading-relaxed text-ink-soft">
            The average UK life lasts 81 years — but only around 47 of them are spent
            in good health. Closing that gap takes clinician time, lifestyle medicine,
            and data that&rsquo;s actually joined up. That&rsquo;s what we built.
          </p>
          <Link href="/about" className="btn-ghost mt-6">
            Read our why →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="card text-center">
            <div className="h-display font-mono text-5xl tabular-nums">81</div>
            <div className="mt-2 text-sm text-ink-soft">years of average UK lifespan</div>
          </div>
          <div className="card border-coral/30 text-center">
            <div className="h-display font-mono text-5xl tabular-nums text-coral">47</div>
            <div className="mt-2 text-sm text-ink-soft">of them in good health</div>
          </div>
          <div className="card col-span-2 text-center">
            <div className="h-display text-2xl">The other 34 are the point.</div>
          </div>
        </div>
      </section>

      {/* ————— Evidence strip + blog ————— */}
      <section className="border-y border-line bg-surface">
        <div className="container-site py-16 md:py-20">
          <p className="eyebrow">Insight, grounded in evidence</p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {EVIDENCE.map((e) => (
              <figure key={e.source} className="card">
                <span aria-hidden className="font-[family-name:var(--font-display)] text-4xl leading-none text-coral">“</span>
                <blockquote className="mt-1 text-sm leading-relaxed text-ink">{e.quote}</blockquote>
                <figcaption className="mt-4 text-xs font-medium uppercase tracking-wider text-ink-soft">
                  {e.source}
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-ink-soft">
              We write about prevention, healthspan and lifestyle medicine.
            </p>
            <Link href="/blog" className="btn-ghost">
              Read the blog →
            </Link>
          </div>
        </div>
      </section>

      {/* ————— Closing pricing CTA ————— */}
      <section className="container-site py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="h-display text-4xl md:text-5xl">
            {PRICE.perMonth} a month.
          </h2>
          <p className="mt-4 text-lg text-ink-soft">
            Billed annually at {PRICE.perYear} — everything included, no tiers,
            no surprise extras. Less than a gym membership, for the years the gym
            is working towards.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href="/membership" className="btn-secondary">
              See what&rsquo;s included
            </Link>
            <a href={LINKS.book} className="btn-primary">
              Book your baseline
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
