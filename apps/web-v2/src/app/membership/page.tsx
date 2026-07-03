import type { Metadata } from "next";
import PullQuote from "@/components/PullQuote";
import TwoCol from "@/components/TwoCol";
import CtaGroup from "@/components/CtaGroup";
import Reveal from "@/components/Reveal";
import TeamPhoto from "@/components/TeamPhoto";
import { DataSourcesCard, ConsultCard, PlanCard } from "@/components/ProductVisuals";
import { PRICE, SCARCITY } from "@/lib/site";

export const metadata: Metadata = {
  title: "Membership",
  description:
    "One membership, everything included: 100+ biomarkers at a Randox clinic, wearable integration, 90 minutes of lifestyle-focused GP time, and a prevention plan. £27 a month, billed annually at £320.",
};

/*
 * Membership — whiteboard layout: Pricing ++ at the top, then the
 * Data → Insights → Action pillars as alternating two-column sections,
 * comparison table, FAQ anchor.
 */

const INCLUSIONS = [
  "Baseline blood panel — 100+ biomarkers at a Randox clinic",
  "Wearable integration — Apple Health, Oura, Whoop, Garmin",
  "Full medical history, brought into one secure record",
  "45-minute baseline consultation with a lifestyle-medicine GP",
  "45-minute follow-up consultation at six months",
  "2 × optional 15-minute check-in consultations",
  "A personal prevention plan, agreed with your GP",
  "Evi — GP-monitored support between appointments",
  "Results delivered to one place, in plain language",
];

const COMPARISON: { label: string; evida: string; kit: string; nhs: string }[] = [
  { label: "Blood biomarkers", evida: "100+ at a clinic", kit: "20–50 finger-prick", nhs: "A handful, if indicated" },
  { label: "Wearable data", evida: "Integrated & clinically read", kit: "Not connected", nhs: "Not connected" },
  { label: "GP time", evida: "90 min core across the year", kit: "None — PDF report", nhs: "~10 min, when ill" },
  { label: "Focus", evida: "Prevention & lifestyle", kit: "Point-in-time snapshot", nhs: "Reactive treatment" },
  { label: "Follow-up", evida: "Built in from day one", kit: "Buy another kit", nhs: "Only if something's wrong" },
];

const FAQS = [
  {
    q: "What exactly is included in the blood panel?",
    a: "Your baseline is drawn at a Randox clinic and covers 100+ biomarkers across heart, metabolic, hormonal, liver, kidney, vitamin and inflammation markers. Your GP walks you through every flag — nothing arrives as an unexplained PDF.",
  },
  {
    q: "Which wearables work with Evida?",
    a: "Apple Health, Oura, Whoop and Garmin connect out of the box. Your daily data — sleep, heart rate, activity — is read alongside your bloods by your GP, not just charted.",
  },
  {
    q: "What if I don't have a wearable?",
    a: "The membership works fully without one. Your baseline bloods, history and GP consultations stand on their own; a wearable simply adds a continuous stream between tests.",
  },
  {
    q: "How does this work with my NHS GP?",
    a: "Evida is preventative care that works alongside the NHS, not instead of it. Anything that needs treatment is referred back into your existing care with a clear summary you can share.",
  },
  {
    q: "How is my data protected?",
    a: "Your record is held securely in the UK under UK GDPR. It is shared only with the clinicians who treat you — never sold, never used for advertising.",
  },
  {
    q: "Why is it billed annually?",
    a: `Prevention is a year-round practice, not a one-off test — the membership is priced as ${PRICE.perYear} for the full year (which works out at ${PRICE.exactPerMonth} a month). You get the baseline, the six-month follow-up, and everything between.`,
  },
];

export default function MembershipPage() {
  return (
    <>
      {/* ————— Pricing hero ————— */}
      <section className="hero-wash">
      <div className="container-site grid items-start gap-12 pb-16 pt-16 md:grid-cols-2 md:gap-16 md:pt-24">
        <div>
          <p className="eyebrow">Membership</p>
          <h1 className="h-display mt-4 text-4xl leading-tight md:text-5xl">
            Your membership to <span className="accent-word">healthier years.</span>
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">
            One membership, everything included. No tiers, no add-ons, no upsell
            at the clinic door.
          </p>
          <div className="mt-8 flex items-baseline gap-3">
            <span className="h-display font-mono text-6xl tabular-nums">{PRICE.perMonth}</span>
            <span className="text-lg text-ink-soft">a month</span>
          </div>
          <p className="mt-2 text-sm text-ink-soft">
            Billed annually at {PRICE.perYear} ({PRICE.exactPerMonth}/month — about {PRICE.perDay} a day).
          </p>
          <div className="mt-8">
            <CtaGroup
              primaryLabel="Activate membership"
              secondaryLabel="Read the FAQs"
              secondaryHref="#faq"
            />
          </div>
        </div>

        <Reveal className="card">
          <div className="eyebrow">Everything included</div>
          <ul className="mt-5 space-y-3">
            {INCLUSIONS.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-ink">
                <svg className="mt-0.5 shrink-0 text-teal" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-5 border-t border-line pt-4 text-xs text-ink-soft">
            * Bespoke scans and additional blood packs available as clinically advised.
          </p>
        </Reveal>
      </div>
      </section>

      {/* ————— Pillar 1: Data ————— */}
      <div className="hairline-t">
        <TwoCol media={<Reveal><DataSourcesCard /></Reveal>}>
          <p className="eyebrow">01 · Data</p>
          <h2 className="h-display mt-3 text-3xl md:text-4xl">
            Your health data, finally in one place.
          </h2>
          <p className="mt-5 max-w-md leading-relaxed text-ink-soft">
            Most health data sits scattered — a blood test here, a sleep score there,
            a paper history somewhere else, none of it talking. Evida joins your
            100+ baseline biomarkers, your wearable&rsquo;s daily stream and your
            medical history into a single record your GP reads before you ever meet.
          </p>
          <p className="mt-4 max-w-md text-sm text-ink-soft">
            Works with Apple Health, Oura, Whoop and Garmin — and works fully without one.
          </p>
        </TwoCol>
      </div>

      {/* ————— Pillar 2: Insights ————— */}
      <div className="hairline-t bg-surface">
        <TwoCol
          flip
          media={
            <Reveal className="space-y-6">
              <ConsultCard />
              {/* Renders only once a real photo lands — see lib/site.ts (S7) */}
              <TeamPhoto caption="Your consultation is a real conversation with a real GP — 45 unhurried minutes." />
            </Reveal>
          }
        >
          <p className="eyebrow">02 · Insight</p>
          <h2 className="h-display mt-3 text-3xl md:text-4xl">
            A GP with the time to actually look.
          </h2>
          <p className="mt-5 max-w-md leading-relaxed text-ink-soft">
            The typical appointment lasts ten minutes and starts from zero. Your Evida
            GP starts from your data and gives you 45 unhurried minutes — twice a
            year — focused on lifestyle medicine and prevention, not prescriptions.
          </p>
          <p className="mt-4 max-w-md text-sm text-ink-soft">
            90 minutes of core GP time across the year, plus two optional 15-minute
            check-ins when you need them.
          </p>
        </TwoCol>
      </div>

      {/* ————— Pillar 3: Action ————— */}
      <div className="hairline-t">
        <TwoCol media={<Reveal><PlanCard /></Reveal>}>
          <p className="eyebrow">03 · Action</p>
          <h2 className="h-display mt-3 text-3xl md:text-4xl">
            A plan you&rsquo;ll actually follow.
          </h2>
          <p className="mt-5 max-w-md leading-relaxed text-ink-soft">
            Insight without action is trivia. You leave your consultation with a
            prevention plan agreed with your GP — specific, small, sustainable — and
            Evi keeps it moving between visits. At six months, you measure what
            changed against your own baseline.
          </p>
        </TwoCol>
      </div>

      <PullQuote>
        Your wearable spots the trends. We give your GP time to read them.
      </PullQuote>

      {/* ————— Comparison ————— */}
      <section className="hairline-t hairline-b bg-surface">
        <div className="container-site py-16 md:py-20">
          <p className="eyebrow">The honest comparison</p>
          <h2 className="h-display mt-3 text-3xl md:text-4xl">
            More than a test kit. More than a check-up.
          </h2>
          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-line text-xs uppercase tracking-wider text-ink-soft">
                  <th className="py-3 pr-4 font-semibold" scope="col"></th>
                  <th className="py-3 pr-4 font-semibold text-teal" scope="col">Evida</th>
                  <th className="py-3 pr-4 font-semibold" scope="col">One-off test kit</th>
                  <th className="py-3 font-semibold" scope="col">Standard GP visit</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row) => (
                  <tr key={row.label} className="border-b border-line">
                    <th scope="row" className="py-4 pr-4 font-semibold text-ink">{row.label}</th>
                    <td className="py-4 pr-4 font-medium text-teal-dark">{row.evida}</td>
                    <td className="py-4 pr-4 text-ink-soft">{row.kit}</td>
                    <td className="py-4 text-ink-soft">{row.nhs}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-ink-soft">
            Evida is complementary preventative care — it works alongside your NHS GP, not instead of them.
          </p>
        </div>
      </section>

      {/* ————— FAQ ————— */}
      <section id="faq" className="container-site py-16 md:py-20">
        <p className="eyebrow">Questions, answered</p>
        <h2 className="h-display mt-3 text-3xl md:text-4xl">Before you ask</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {FAQS.map((f) => (
            <details key={f.q} className="card group p-0">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6 text-sm font-semibold text-ink [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="text-teal transition-transform group-open:rotate-45">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </summary>
              <p className="px-6 pb-6 text-sm leading-relaxed text-ink-soft">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ————— Closing CTA ————— */}
      <section className="hairline-t bg-surface">
        <div className="container-site py-20 text-center md:py-24">
          <p className="eyebrow">{SCARCITY}</p>
          <h2 className="h-display mx-auto mt-4 max-w-xl text-3xl md:text-4xl">
            The years ahead are the ones you can{" "}
            <span className="accent-word">still change.</span>
          </h2>
          <div className="mt-8">
            <CtaGroup
              center
              primaryLabel="Activate membership"
              secondaryLabel="See how it works"
              secondaryHref="/how-it-works"
            />
          </div>
        </div>
      </section>
    </>
  );
}
