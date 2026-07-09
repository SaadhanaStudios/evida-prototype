import type { Metadata } from "next";
import PullQuote from "@/components/PullQuote";
import CtaGroup from "@/components/CtaGroup";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";

export const metadata: Metadata = {
  title: "About",
  description:
    "Why Evida exists: shifting healthcare from reactive to preventative, with GP-led lifestyle medicine and data that's finally joined up.",
  alternates: { canonical: "/about" },
  openGraph: { title: "About — Evida", url: "/about" },
};

/*
 * About — whiteboard structure: Why · History · Team · Extend.
 * This page carries the "why it exists" messaging that was crowding the
 * old homepage (July 3 decision), written for customers, investors and
 * stakeholders alike.
 *
 * NOTE: History milestones and Team members are PLACEHOLDERS pending real
 * content — swap before any external sharing.
 */

const HISTORY = [
  {
    when: "The itch",
    what: "Health checks kept failing the same two ways: advice limited by thin data, and no follow-through once the report was sent. We'd lived both.",
  },
  {
    when: "The insight",
    what: "Half of UK adults already wear a health tracker — yet almost none of that data ever reaches a clinician. The data exists. The joining-up doesn't.",
  },
  {
    when: "The build",
    what: "We designed a service around the gap: comprehensive baselines, wearable integration, and — rarest of all — GP time protected for prevention.",
  },
  {
    when: "Today",
    what: "Launching in the UK with our founding members: clinician-led, data-powered, and built to work alongside the NHS.",
  },
];

const PRINCIPLES = [
  {
    title: "Prevention before cure",
    body: "Healthcare today is brilliant at reacting and poor at preventing. We exist to move the intervention point earlier — years earlier.",
  },
  {
    title: "Humans in the loop, always",
    body: "AI helps our GPs catch subtle trends across thousands of data points. But every recommendation comes from a licensed GP, and you are always seen by a real person.",
  },
  {
    title: "Lifestyle is medicine",
    body: "Movement, sleep, nutrition and stress shape health outcomes more than most prescriptions. Our GPs are trained to treat them that seriously.",
  },
  {
    title: "In service of our members",
    body: "Evida is not an app. It's a human clinical service with technology in support — and we write, price and build like it.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ————— Why ————— */}
      <section className="hero-wash container-site pb-8 pt-16 md:pt-24">
        <div className="max-w-2xl">
          <p className="eyebrow">Why we exist</p>
          <h1 className="h-display mt-4 text-4xl leading-tight md:text-5xl">
            Healthcare waits for you to get sick.{" "}
            <span className="accent-word">We couldn&rsquo;t accept that.</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-ink-soft">
            The average UK life lasts 81 years, but only around 47 of them are lived
            in good health. The gap isn&rsquo;t genetic destiny — it&rsquo;s decades
            of small, invisible drift that no ten-minute appointment was ever going
            to catch. Evida exists to catch it: comprehensive data, unhurried GP
            time, and a plan that turns both into healthier years.
          </p>
        </div>
      </section>

      {/* ————— Stats ————— */}
      <section className="hairline-t bg-surface">
        <div className="container-site grid items-center gap-10 py-16 md:grid-cols-2 md:gap-16 md:py-20">
          <Reveal>
            <h2 className="h-display mt-3 text-3xl md:text-4xl">
              Healthcare waits for you to get sick.{" "}
              <span className="accent-word accent-coral">We don&rsquo;t.</span>
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-ink-soft">
              The average UK life lasts 81 years — but only around 47 of them are spent
              in good health. Closing that gap takes clinician time, lifestyle medicine,
              and data that&rsquo;s actually joined up. That&rsquo;s what we built.
            </p>
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

      <PullQuote source="The Evida principle">
        No single data point tells the whole story.
      </PullQuote>

      {/* ————— Principles ————— */}
      <section className="hairline-t hairline-b bg-surface">
        <div className="container-site py-16 md:py-20">
          <p className="eyebrow">What we believe</p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {PRINCIPLES.map((p, i) => (
              <Reveal key={p.title} delay={(i % 2) * 100} className="card">
                <h2 className="h-display text-2xl">{p.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ————— History ————— */}
      <section className="container-site py-16 md:py-20">
        <p className="eyebrow">Our story</p>
        <h2 className="h-display mt-3 text-3xl md:text-4xl">How we got here</h2>
        <ol className="mt-10 grid gap-6 md:grid-cols-4">
          {HISTORY.map((h, i) => (
            <li key={h.when} className="card">
              <div className="font-mono text-xs font-semibold tabular-nums text-teal">0{i + 1}</div>
              <h3 className="h-display mt-2 text-xl">{h.when}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{h.what}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ————— Team ————— */}
      <section className="hairline-t hairline-b bg-surface">
        <div className="container-site py-16 md:py-20">
          <p className="eyebrow">The team</p>
          <h2 className="h-display mt-3 text-3xl md:text-4xl">
            Clinicians and builders, in equal measure
          </h2>
          <p className="mt-4 max-w-lg text-ink-soft">
            Evida is led by GMC-registered doctors with NHS backgrounds, working
            alongside the technologists who make joined-up data possible.
          </p>
          {/* PLACEHOLDER team cards — replace with real names, roles and photos */}
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {["Medical leadership", "Product & engineering", "Member experience"].map((role) => (
              <div key={role} className="card">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-teal-light text-teal">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5" />
                  </svg>
                </div>
                <h3 className="h-display mt-4 text-xl">{role}</h3>
                <p className="mt-2 text-sm text-ink-soft">
                  Full team profiles coming soon.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ————— Extend ————— */}
      <section className="container-site py-16 md:py-20">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <p className="eyebrow">Where this goes</p>
            <h2 className="h-display mt-3 text-3xl md:text-4xl">
              The baseline is just the beginning.
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-ink-soft">
              A membership that starts with bloods and a consultation extends
              naturally: deeper diagnostics as they earn their place, a partner
              network for the specialist support your plan calls for, and a record
              that grows more valuable with every year it holds.
            </p>
          </div>
          <div className="card">
            <ul className="space-y-4 text-sm leading-relaxed text-ink-soft">
              <li className="flex gap-3"><span className="text-teal">—</span> Bespoke scans and blood packs, as clinically advised</li>
              <li className="flex gap-3"><span className="text-teal">—</span> A growing partner network for nutrition, movement and mental health</li>
              <li className="flex gap-3"><span className="text-teal">—</span> Your data, portable and useful — to you and any clinician you choose</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ————— Closing CTA ————— */}
      <section className="hairline-t bg-surface">
        <div className="container-site py-20 text-center md:py-24">
          <h2 className="h-display mx-auto max-w-xl text-3xl md:text-4xl">
            Be one of the members we <span className="accent-word">build this with.</span>
          </h2>
          <div className="mt-8">
            <CtaGroup center />
          </div>
        </div>
      </section>
    </>
  );
}
