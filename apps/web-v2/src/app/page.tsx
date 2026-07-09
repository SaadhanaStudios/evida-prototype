import type { Metadata } from "next";
import Link from "next/link";
import PullQuote from "@/components/PullQuote";
import CtaGroup from "@/components/CtaGroup";
import EviMoment from "@/components/EviMoment";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import VideoHero from "@/components/VideoHero";
import { EVIDENCE, LINKS, PRICE, SCARCITY } from "@/lib/site";

export const metadata: Metadata = {
  title: "Evida — More than a health check",
  description:
    "Evida gives you a 100+ biomarker blood panel, wearable integration and a 45-minute GP consultation — all joined up in one preventative health membership. £320/year.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Evida — More than a health check",
    description:
      "Evida gives you a 100+ biomarker blood panel, wearable integration and a 45-minute GP consultation — all joined up in one preventative health membership. £320/year.",
    url: "/",
  },
};

/*
 * Home — a summary hub, per the July 3 whiteboard. Flow:
 * Hero → offer bar → Membership summary (Data | Insight | Action) →
 * pull-quote → How-it-works summary → Evi between-visits → why-we-exist →
 * evidence + blog → closing pricing CTA.
 * Each block anchors out to its full page.
 */

const SERVICE_CARDS = [
  {
    kicker: ["DATA", "-LED"],
    title: "What we combine",
    items: [
      "Blood panel — 100+ biomarkers at a Randox clinic",
      "Wearable integration (Oura, Apple, Garmin, Whoop)",
      "Medical history in one secure record",
    ],
  },
  {
    kicker: ["GP-LED ", "INSIGHTS"],
    title: "What we discover",
    items: [
      "60 min of core GP time across the year",
      "Unhurried, lifestyle-focused consultations",
      "Prevention plan in plain English",
    ],
  },
  {
    kicker: ["INFORMED ", "ACTION"],
    title: "How you act",
    items: [
      "Personalised prevention plan",
      "Support from Evi between visits",
      "Partner wellness network",
      "Ongoing GP for continuity of care",
    ],
  },
];


const STAGES = [
  {
    n: "01",
    title: "Initial",
    when: "Your first two weeks",
    stat: "100+ biomarkers drawn",
    body: "Join, connect your wearable, complete your history, and have your baseline bloods drawn at a Randox clinic.",
    href: "/how-it-works#initial",
  },
  {
    n: "02",
    title: "Grounding",
    when: "Your first six months",
    stat: "45-minute GP consultation",
    body: "An unhurried consultation with a lifestyle-medicine GP, and a prevention plan built around your own numbers.",
    href: "/how-it-works#six-months",
  },
  {
    n: "03",
    title: "Ongoing",
    when: "Year after year",
    stat: "15-minute follow-up + check-ins",
    body: "A full follow-up at month six, optional check-ins, and monitoring that compounds — every year adds context.",
    href: "/how-it-works#ongoing",
  },
];

export default function Home() {
  return (
    <>
      {/* ————— Hero ————— */}
      <VideoHero />

      {/* ————— The Evida Service ————— */}
      <section className="container-site py-16 md:py-20">
        <Reveal>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="eyebrow">The Evida service</p>
              <h2
                style={{ fontFamily: "var(--font-display)" }}
                className="mt-3 text-3xl font-medium leading-tight tracking-tight text-ink md:text-4xl"
              >
                Your membership to{" "}
                <span className="accent-word">healthier years</span>
              </h2>
              <p className="mt-3 max-w-lg text-base leading-relaxed text-ink-soft">
                What we combine, what we discover, and how we help you act.
              </p>
            </div>
            <div className="text-right">
              <Link href="/membership" className="btn-ghost">
                Explore the membership →
              </Link>
              <p className="mt-1 text-sm text-ink-soft">
                {PRICE.perMonth}/month, everything included
              </p>
            </div>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {SERVICE_CARDS.map((card, i) => (
            <Reveal key={card.title} delay={i * 100}>
              <div className="card h-full">
                <p className="text-xs font-bold uppercase tracking-widest text-coral">
                  {card.kicker[0]}
                  <span className="font-extrabold">{card.kicker[1]}</span>
                </p>
                <h3 className="mt-3 text-xl font-semibold text-ink">{card.title}</h3>
                <ul className="mt-4 space-y-2">
                  {card.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-ink-soft">
                      <span className="mt-0.5 shrink-0 text-teal" aria-hidden>+</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
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
      <section className="hairline-t hairline-b bg-surface">
        <div className="container-site py-16 md:py-20">
          <Reveal>
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
          </Reveal>
          <ol className="mt-10 grid gap-6 md:grid-cols-3">
            {STAGES.map((s, i) => (
              <Reveal key={s.n} as="li" delay={i * 100}>
                <Link href={s.href} className="card card-lift group block h-full">
                  <div className="flex items-baseline justify-between">
                    <span className="font-mono text-xs font-semibold tabular-nums text-teal">{s.n}</span>
                    <span className="text-xs font-medium uppercase tracking-wider text-ink-soft">{s.when}</span>
                  </div>
                  <h3 className="h-display mt-3 text-2xl group-hover:text-teal">{s.title}</h3>
                  <span className="mt-3 inline-block rounded-full bg-teal-light px-3 py-1 font-mono text-xs font-semibold tabular-nums text-teal-dark">
                    {s.stat}
                  </span>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">{s.body}</p>
                </Link>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ————— Between visits: Evi ————— */}
      <section className="container-site grid items-center gap-10 py-16 md:grid-cols-2 md:gap-16 md:py-20">
        <Reveal>
          <p className="eyebrow">Between visits</p>
          <h2 className="h-display mt-3 text-3xl md:text-4xl">
            The membership doesn&rsquo;t pause between appointments.
          </h2>
          <p className="mt-5 max-w-md leading-relaxed text-ink-soft">
            Evi — your GP-monitored assistant — keeps your plan moving: gentle
            check-ins, trends flagged to your doctor, questions answered in plain
            language. Every recommendation still comes from a licensed GP.
          </p>
          <Link href="/membership" className="btn-ghost mt-6">
            See what&rsquo;s included →
          </Link>
        </Reveal>
        <Reveal delay={120}>
          <EviMoment />
        </Reveal>
      </section>

      {/* ————— Why Evida exists (About teaser) ————— */}
      <section className="hairline-t bg-surface">
        <div className="container-site grid items-center gap-10 py-16 md:grid-cols-2 md:gap-16 md:py-20">
          <Reveal>
            <p className="eyebrow">Why we exist</p>
            <h2 className="h-display mt-3 text-3xl md:text-4xl">
              Healthcare waits for you to get sick.{" "}
              <span className="accent-word accent-coral">We don&rsquo;t.</span>
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-ink-soft">
              The average UK life lasts 81 years — but only around 47 of them are spent
              in good health. Closing that gap takes clinician time, lifestyle medicine,
              and data that&rsquo;s actually joined up. That&rsquo;s what we built.
            </p>
            <Link href="/about" className="btn-ghost mt-6">
              Read our why →
            </Link>
          </Reveal>
          <Reveal delay={120}>
            <div className="grid grid-cols-2 gap-6">
              <div className="card text-center">
                <div className="h-display font-mono text-5xl tabular-nums">
                  <CountUp to={81} />
                </div>
                <div className="mt-2 text-sm text-ink-soft">years of average UK lifespan</div>
              </div>
              <div className="card border-coral/30 text-center">
                <div className="h-display font-mono text-5xl tabular-nums text-coral">
                  <CountUp to={47} />
                </div>
                <div className="mt-2 text-sm text-ink-soft">of them in good health</div>
              </div>
              <div className="card col-span-2 text-center">
                <div className="h-display text-2xl">The other 34 are the point.</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ————— Evidence strip + blog ————— */}
      <section className="container-site py-16 md:py-20">
        <Reveal>
          <p className="eyebrow">Insight, grounded in evidence</p>
        </Reveal>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {EVIDENCE.map((e, i) => (
            <Reveal key={e.source} as="figure" delay={i * 100} className="card">
              <span aria-hidden className="font-[family-name:var(--font-display)] text-4xl leading-none text-coral">“</span>
              <blockquote className="mt-1 text-sm leading-relaxed text-ink">{e.quote}</blockquote>
              <figcaption className="mt-4 text-xs font-medium uppercase tracking-wider text-ink-soft">
                {e.href ? (
                  <a href={e.href} target="_blank" rel="noopener noreferrer" className="hover:text-teal">
                    {e.source} ↗
                  </a>
                ) : (
                  e.source
                )}
              </figcaption>
            </Reveal>
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
      </section>

      {/* ————— Closing pricing CTA ————— */}
      <section className="hairline-t bg-surface">
        <div className="container-site py-20 md:py-28">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">{SCARCITY}</p>
            <h2 className="h-display mt-4 text-4xl md:text-5xl">
              {PRICE.perMonth} a month, for{" "}
              <span className="accent-word">healthier years.</span>
            </h2>
            <p className="mt-4 text-lg text-ink-soft">
              Billed annually at {PRICE.perYear} — everything included, no tiers,
              no surprise extras.
            </p>
            <div className="mt-8">
              <CtaGroup
                center
                secondaryLabel="See what's included"
                secondaryHref="/membership"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
