import { LINKS } from "@/lib/site";
import AnnouncementBar from "./AnnouncementBar";

export default function HowItWorksHero() {
  return (
    <section className="px-2 pt-2">
      <AnnouncementBar>Pilot now live &mdash; book your Baseline today</AnnouncementBar>
      <div
        className="relative flex min-h-[clamp(460px,60vw,680px)] flex-col justify-end overflow-hidden rounded-b-3xl px-10 pb-12 md:px-14 md:pb-16"
        style={{
          backgroundImage:
            "linear-gradient(-260deg, rgba(0,0,0,0.26), rgba(11,11,11,0.65)), url('/images/how-it-works-hero.png')",
          backgroundSize: "cover",
          backgroundPosition: "38% 50%",
        }}
      >
        <div className="max-w-lg">
          <h1 className="text-hero-display font-normal leading-[1.05] tracking-tight text-cream">
            Your Health Journey,<br />
            Guided by{" "}
            <span className="font-display italic">Evida</span>
          </h1>
          <p className="mt-4 text-base font-normal leading-snug text-cream md:text-lg xl:text-2xl">
            Data. Insights. Action &mdash; three steps to a healthier you.
          </p>
          <a href={LINKS.book} className="btn-hero">
            Get Started
          </a>
        </div>
      </div>
    </section>
  );
}
