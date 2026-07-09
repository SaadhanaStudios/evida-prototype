import { LINKS } from "@/lib/site";

function JourneySvg() {
  return (
    <svg
      viewBox="0 0 800 500"
      role="img"
      aria-label="Your health journey rising from Evida through Data, Insights and Action to confidence in your future health"
      className="hidden min-w-[45%] self-end md:block"
      style={{ width: "100%", height: "auto", maxWidth: 798, overflow: "visible" }}
    >
      <path
        d="M40 470 L170 470"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M170 470 L275 468 C360 464 430 430 495 380 C560 335 600 300 625 255 C665 190 695 130 720 70"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeDasharray="2 8"
      />
      <path
        d="M275 462 L275 380"
        stroke="rgba(255,255,255,0.32)"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeDasharray="2 7"
      />
      <path
        d="M495 374 L495 302"
        stroke="rgba(255,255,255,0.32)"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeDasharray="2 7"
      />
      <path
        d="M625 249 L625 172"
        stroke="rgba(255,255,255,0.32)"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeDasharray="2 7"
      />
      <rect x="166" y="466" width="8" height="8" fill="#fef2a7" rx="1" />
      <rect x="271" y="464" width="8" height="8" fill="#fef2a7" rx="1" />
      <rect x="491" y="376" width="8" height="8" fill="#fef2a7" rx="1" />
      <rect x="621" y="251" width="8" height="8" fill="#fef2a7" rx="1" />
      <rect x="716" y="66" width="8" height="8" fill="#fef2a7" rx="1" />
      <text
        x="40" y="444" textAnchor="start"
        style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 20, letterSpacing: "0.06em" }}
        fill="#fff"
      >
        EVIDA
      </text>
      <text
        x="275" y="332" textAnchor="middle"
        style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 20, letterSpacing: "0.08em" }}
        fill="#fff"
      >
        DATA
      </text>
      <text
        x="275" y="353" textAnchor="middle"
        style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: 12.5 }}
        fill="rgba(255,255,255,0.62)"
      >
        Understand your
      </text>
      <text
        x="275" y="369" textAnchor="middle"
        style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: 12.5 }}
        fill="rgba(255,255,255,0.62)"
      >
        health signals
      </text>
      <text
        x="495" y="252" textAnchor="middle"
        style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 20, letterSpacing: "0.08em" }}
        fill="#fff"
      >
        INSIGHTS
      </text>
      <text
        x="495" y="273" textAnchor="middle"
        style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: 12.5 }}
        fill="rgba(255,255,255,0.62)"
      >
        Personalised insights and
      </text>
      <text
        x="495" y="289" textAnchor="middle"
        style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: 12.5 }}
        fill="rgba(255,255,255,0.62)"
      >
        recommendations
      </text>
      <text
        x="625" y="122" textAnchor="middle"
        style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 20, letterSpacing: "0.08em" }}
        fill="#fff"
      >
        ACTION
      </text>
      <text
        x="625" y="143" textAnchor="middle"
        style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: 12.5 }}
        fill="rgba(255,255,255,0.62)"
      >
        Take the right
      </text>
      <text
        x="625" y="159" textAnchor="middle"
        style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: 12.5 }}
        fill="rgba(255,255,255,0.62)"
      >
        next step
      </text>
      <text
        x="706" y="30" textAnchor="middle"
        style={{ fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: 13 }}
        fill="rgba(255,255,255,0.85)"
      >
        Confidence in your
      </text>
      <text
        x="706" y="47" textAnchor="middle"
        style={{ fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: 13 }}
        fill="rgba(255,255,255,0.85)"
      >
        future health
      </text>
    </svg>
  );
}

export default function HowItWorksHero() {
  return (
    <section className="px-2 pt-2">
      <div className="announcement-bar">
        Pilot now live &mdash; book your Baseline today
      </div>
      <div
        className="relative flex min-h-[clamp(460px,60vw,680px)] flex-col justify-end overflow-hidden rounded-b-3xl px-10 pb-12 md:px-14 md:pb-16"
        style={{
          backgroundImage:
            "linear-gradient(-260deg, rgba(0,0,0,0.26), rgba(11,11,11,0.65)), url('/images/how-it-works-hero.png')",
          backgroundSize: "cover",
          backgroundPosition: "38% 50%",
        }}
      >
        <div className="flex w-full flex-row items-end justify-between">
          <div className="shrink-0">
            <h1 className="text-hero-display whitespace-nowrap font-normal leading-[1.05] tracking-tight text-cream">
              Your Health Journey,
            </h1>
            <div className="mt-1 flex flex-wrap items-center gap-x-3">
              <h1 className="text-hero-display font-normal leading-[1.05] tracking-tight text-cream">
                Guided by
              </h1>
              <h1 className="text-hero-display font-display font-normal italic leading-[1.05] tracking-tight text-cream">
                Evida
              </h1>
            </div>
            <p className="mt-4 text-base font-normal leading-snug text-cream md:text-lg xl:text-2xl">
              Data. Insights. Action &mdash; three steps to a healthier you.
            </p>
            <a href={LINKS.book} className="btn-hero">
              Get Started
            </a>
          </div>
          <JourneySvg />
        </div>
      </div>
    </section>
  );
}
