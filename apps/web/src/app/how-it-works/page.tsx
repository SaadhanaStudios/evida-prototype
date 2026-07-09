import type { Metadata } from "next";
import HowItWorksHero from "@/components/HowItWorksHero";
import PullQuote from "@/components/PullQuote";
import CtaGroup from "@/components/CtaGroup";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "How Evida works: join and book a baseline blood draw, meet your lifestyle-medicine GP for 45 minutes, follow a personalised prevention plan, and return for a 15-minute follow-up at six months.",
  alternates: { canonical: "/how-it-works" },
  openGraph: { title: "How it works — Evida", url: "/how-it-works" },
};

/*
 * How it works — whiteboard structure: six numbered steps grouped two per
 * stage (Initial / First six months / Ongoing), with editorial pull-quote
 * banners between stages where the whiteboard drew squiggle dividers.
 * Kept as its own page deliberately — "how does X work" is a common
 * search/AI query (SEO decision from the July 3 review).
 */

type Step = { n: number; title: string; body: string; detail: string };

const STAGE_1: Step[] = [
  {
    n: 1,
    title: "Join and connect",
    body: "Create your account, complete your medical history questionnaire, and pair your wearable if you have one — Apple Health, Oura, Whoop or Garmin.",
    detail: "Takes about 20 minutes, from anywhere.",
  },
  {
    n: 2,
    title: "Your baseline blood draw",
    body: "Book a slot at a Randox clinic near you. One draw covers 100+ biomarkers — heart, metabolic, hormonal, liver, kidney, vitamins and inflammation.",
    detail: "Results land in your record, not your inbox.",
  },
];

const STAGE_2: Step[] = [
  {
    n: 3,
    title: "Meet your GP — 45 minutes",
    body: "A video consultation with a lifestyle-medicine GP who has already read your bloods, your wearable trends and your history. Unhurried, in plain language.",
    detail: "This is the appointment most healthcare never gives you.",
  },
  {
    n: 4,
    title: "Your prevention plan",
    body: "You leave with a plan agreed together — specific, small, sustainable. Evi, your GP-monitored assistant, keeps it moving between visits.",
    detail: "Every recommendation comes from a licensed GP, never from an algorithm alone.",
  },
];

const STAGE_3: Step[] = [
  {
    n: 5,
    title: "Six-month follow-up — 15 minutes",
    body: "Retest what matters, then sit down with your GP again to measure progress against your own baseline — not a population average.",
    detail: "Plus two optional 15-minute check-ins whenever you need them.",
  },
  {
    n: 6,
    title: "Monitoring that compounds",
    body: "Your record deepens every year: annual retesting, continuous wearable context, and a GP who already knows your story. Prevention is a practice, not an event.",
    detail: "Bespoke scans and blood packs available as clinically advised.",
  },
];

function StageSection({
  id,
  eyebrow,
  title,
  intro,
  steps,
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro: string;
  steps: Step[];
}) {
  return (
    <section id={id} className="container-site scroll-mt-24 py-14 md:py-16">
      <div className="grid gap-10 md:grid-cols-[1fr_2fr] md:gap-16">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="h-display mt-3 text-3xl md:text-4xl">{title}</h2>
          <p className="mt-4 max-w-xs leading-relaxed text-ink-soft">{intro}</p>
        </div>
        <ol className="space-y-6">
          {steps.map((s, i) => (
            <Reveal key={s.n} as="li" delay={i * 100} className="card flex gap-6">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal font-mono text-sm font-semibold tabular-nums text-cream">
                {s.n}
              </span>
              <div>
                <h3 className="h-display text-xl">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.body}</p>
                <p className="mt-3 text-xs font-medium text-teal">{s.detail}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default function HowItWorksPage() {
  return (
    <>
      <HowItWorksHero />

      <StageSection
        id="initial"
        eyebrow="Stage one · Initial"
        title="Your first two weeks"
        intro="Set up your record and capture your baseline. Everything else builds on this."
        steps={STAGE_1}
      />

      <div className="hairline-t hairline-b bg-surface">
        <PullQuote source="Evida">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
        </PullQuote>
      </div>

      <StageSection
        id="six-months"
        eyebrow="Stage two · Grounding"
        title="Your first six months"
        intro="Data becomes insight, and insight becomes a plan — with a GP, not a PDF."
        steps={STAGE_2}
      />

      <div className="hairline-t hairline-b bg-surface">
        <PullQuote>
          Rushed appointments won&rsquo;t protect your health. Time will.
        </PullQuote>
      </div>

      <StageSection
        id="ongoing"
        eyebrow="Stage three · Ongoing"
        title="Year after year"
        intro="This is where Evida stops being a health check and becomes a health practice."
        steps={STAGE_3}
      />

      {/* ————— Closing CTA ————— */}
      <section className="hairline-t bg-surface">
        <div className="container-site py-20 text-center md:py-24">
          <h2 className="h-display mx-auto max-w-xl text-3xl md:text-4xl">
            Step one takes <span className="accent-word">twenty minutes.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-ink-soft">
            Join today and your baseline can be drawn within two weeks.
          </p>
          <div className="mt-8">
            <CtaGroup
              center
              primaryLabel="Start your journey"
              secondaryLabel="See what's included"
              secondaryHref="/membership"
            />
          </div>
        </div>
      </section>
    </>
  );
}
