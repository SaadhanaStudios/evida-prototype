import Logo from "./Logo";

export default function AboutHero() {
  return (
    <section className="flex min-h-[clamp(360px,44vw,520px)] flex-col items-center justify-center bg-teal px-6 text-center">
      <Logo className="h-14 w-auto text-cream" />
      <div className="mx-auto mt-8 h-px w-16 bg-cream/25" />
      <h1 className="mt-8 max-w-xl text-4xl font-normal leading-tight tracking-tight text-cream md:text-6xl">
        More than a health check.
      </h1>
      <p className="mt-4 text-lg font-normal leading-relaxed text-cream/70 md:text-2xl">
        Adding healthy years to your life.
      </p>
    </section>
  );
}
