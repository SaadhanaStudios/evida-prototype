import { LINKS } from "@/lib/site";
import AnnouncementBar from "./AnnouncementBar";
import JourneySvg from "./JourneySvg";

export default function VideoHero() {
  return (
    <section className="px-2 pt-2">
      <AnnouncementBar>Pilot now live &mdash; book your Baseline today</AnnouncementBar>

      <div className="relative flex min-h-[clamp(460px,60vw,680px)] flex-col justify-end overflow-hidden rounded-b-3xl px-10 pb-12 md:px-14 md:pb-16 bg-ink">
        {/* Video background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/video/hero.mp4" type="video/mp4" />
          <source src="/video/hero.webm" type="video/webm" />
        </video>

        {/* Gradient overlay — matches the dark-hero card style */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(-260deg, rgba(0,0,0,0.26), rgba(11,11,11,0.65))" }}
        />

        {/* Content */}
        <div className="relative z-10 flex w-full flex-row items-end justify-between">
          <div className="shrink-0">
            <h1 className="text-hero-display font-normal leading-[1.05] tracking-tight text-cream">
              More than a<br />
              <span className="accent-word">health check.</span>
            </h1>
            <p className="mt-4 text-base font-normal leading-snug text-cream/80 md:text-lg xl:text-xl">
              Blood Test &nbsp;|&nbsp; GP Consult &nbsp;|&nbsp; Wearable Data &nbsp;|&nbsp; Health Check
            </p>
            <p className="mt-2 text-base font-normal leading-snug text-cream md:text-lg xl:text-2xl">
              The data upgrade for your GP consult
            </p>
            <a href={LINKS.book} className="btn-hero">
              Get Started
            </a>
            <p className="mt-8 text-xs font-medium uppercase tracking-wider text-cream/50">
              CQC Registered &nbsp;&middot;&nbsp; GMC Licensed GPs &nbsp;&middot;&nbsp; UK GDPR Compliant
            </p>
          </div>
          <JourneySvg />
        </div>
      </div>
    </section>
  );
}
