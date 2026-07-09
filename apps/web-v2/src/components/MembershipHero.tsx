import Link from "next/link";
import { LINKS } from "@/lib/site";

export default function MembershipHero() {
  return (
    <section className="px-2 pt-2">
      {/* Announcement bar */}
      <div className="announcement-bar">
        Pilot now live — book your Baseline today
      </div>

      {/* Hero card */}
      <div
        className="relative flex min-h-[clamp(460px,60vw,680px)] flex-col justify-end overflow-hidden rounded-b-3xl px-10 pb-12 md:px-14 md:pb-16"
        style={{
          backgroundImage:
            "linear-gradient(-260deg, rgba(0,0,0,0.26), rgba(11,11,11,0.65)), url('/images/membership-hero.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-lg">
          <h1 className="text-4xl font-normal leading-[1.05] tracking-tight text-cream md:text-6xl">
            The Evida<br />
            Membership
          </h1>
          <p className="mt-4 text-lg font-normal leading-snug text-cream md:text-2xl">
            A full year of care, not a single appointment.
          </p>
          <a
            href={LINKS.book}
            className="mt-6 inline-flex items-center justify-center rounded-full bg-teal px-7 py-3.5 text-sm font-semibold text-cream shadow-[0_2px_16px_rgba(33,106,115,0.45)] transition-all duration-150 hover:bg-teal-dark"
          >
            Get Started
          </a>
        </div>
      </div>
    </section>
  );
}
