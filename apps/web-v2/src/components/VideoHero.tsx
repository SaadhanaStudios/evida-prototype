import Link from "next/link";
import { LINKS } from "@/lib/site";

export default function VideoHero() {
  return (
    <section className="relative flex min-h-[calc(100svh-4rem)] items-center justify-center overflow-hidden bg-ink">
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

      {/* Overlay — darkest at top/bottom to frame the content, lighter in centre */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/75 via-ink/50 to-ink/72" />

      <div className="relative z-10 mx-auto max-w-3xl px-6 py-24 text-center">
        <h1
          style={{ fontFamily: "var(--font-display)" }}
          className="text-4xl font-medium leading-[1.05] tracking-tight text-cream md:text-6xl"
        >
          More than a<br />
          <span className="accent-word">health check.</span>
        </h1>

        <p className="mt-6 text-xl font-normal leading-snug text-cream/80">
          Blood Test &nbsp;|&nbsp; GP Consult &nbsp;|&nbsp; Wearable Data &nbsp;|&nbsp; Health Check
        </p>

        <p className="mt-2 text-2xl font-normal leading-snug text-cream">
          The data upgrade for your GP consult
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/how-it-works"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-7 py-3.5 text-sm font-semibold text-cream transition-all duration-150 hover:bg-white/10"
          >
            How it works
          </Link>
          <a
            href={LINKS.book}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-teal px-7 py-3.5 text-sm font-semibold text-cream shadow-[0_2px_16px_rgba(33,106,115,0.45)] transition-all duration-150 hover:bg-teal-dark"
          >
            Get started
          </a>
        </div>

        <p className="mt-8 text-xs font-medium uppercase tracking-wider text-cream/50">
          CQC Registered &nbsp;·&nbsp; GMC Licensed GPs &nbsp;·&nbsp; UK GDPR Compliant
        </p>
      </div>
    </section>
  );
}
