import AnnouncementBar from "./AnnouncementBar";
import Logo from "./Logo";

export default function AboutHero() {
  return (
    <section className="px-2 pt-2">
      <AnnouncementBar>Pilot now live &mdash; book your Baseline today</AnnouncementBar>
      <div className="flex min-h-[clamp(460px,60vw,680px)] flex-col items-center justify-center rounded-b-3xl bg-teal px-6 text-center">
        <Logo className="h-14 w-auto text-cream" />
        <div className="mx-auto mt-8 h-px w-16 bg-cream/25" />
        <h1 className="mt-8 text-hero-display font-normal leading-[1.05] tracking-tight text-cream">
          Our<br />
          <span className="font-display italic">Mission</span>
        </h1>
        <p className="mt-4 max-w-sm text-base font-normal leading-snug text-cream/70 md:text-lg xl:text-2xl">
          Adding healthy years to lives around the world.
        </p>
      </div>
    </section>
  );
}
