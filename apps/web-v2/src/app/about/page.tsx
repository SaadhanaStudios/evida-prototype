import type { Metadata } from "next";
import Image from "next/image";
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
          <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {[
              { name: "Abhishek Kumar",        role: "CEO",                              photo: "/images/team/abhishek-kumar.png",       linkedin: "https://www.linkedin.com/in/akumarevida/" },
              { name: "Dr. Jonathan Andrews",  role: "Medical Director",                 photo: "/images/team/jonathan-andrews.png",     linkedin: "https://www.linkedin.com/in/drjonathanandrews/" },
              { name: "Mark Woodward",         role: "Chief Technology Officer",         photo: "/images/team/mark-woodward.png",        linkedin: "https://www.linkedin.com/in/markwoodward23/" },
              { name: "Laura Kubica Grigerova",role: "Chief Marketing Officer",          photo: "/images/team/laura-grigerova.png",      linkedin: "https://www.linkedin.com/in/lauragrigerova/" },
              { name: "Dr Dominique O'Sullivan",role: "GP, Lifestyle Medicine Specialist",photo: "/images/team/dominique-osullivan.png", linkedin: "https://www.linkedin.com/in/dr-dominique-o-sullivan-b1155751/" },
              { name: "Dhruv Gupta",           role: "AI Product Manager",              photo: "/images/team/dhruv-gupta.png",          linkedin: "https://www.linkedin.com/in/dhruv-gupta648/" },
              { name: "Olga Shatalova",        role: "Voice of Customer Lead",          photo: "/images/team/olga-shatalova.png",       linkedin: "https://www.linkedin.com/in/shatalovaolga/" },
            ].map((member) => (
              <Reveal key={member.name}>
                <div className="card group flex flex-col gap-4 p-0 overflow-hidden">
                  <div className="relative aspect-square w-full overflow-hidden bg-surface">
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                  <div className="flex items-end justify-between px-5 pb-5">
                    <div>
                      <p className="font-semibold text-ink leading-snug">{member.name}</p>
                      <p className="mt-0.5 text-xs text-ink-soft">{member.role}</p>
                    </div>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} on LinkedIn`}
                      className="shrink-0 text-ink-soft transition-colors hover:text-teal"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </Reveal>
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
