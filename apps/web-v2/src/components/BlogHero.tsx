export default function BlogHero() {
  return (
    <section
      className="relative flex min-h-[clamp(400px,50vw,580px)] flex-col justify-end overflow-hidden px-10 pb-14 md:px-14 md:pb-18"
      style={{
        backgroundImage:
          "linear-gradient(to top, rgba(11,11,11,0.78) 0%, rgba(11,11,11,0.38) 55%, rgba(11,11,11,0.18) 100%), url('/images/blog-hero.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center 30%",
      }}
    >
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-cream/60">
          The blog
        </p>
        <h1
          style={{ fontFamily: "var(--font-display)" }}
          className="mt-3 text-4xl font-medium leading-[1.08] tracking-tight text-cream md:text-5xl"
        >
          No single data point<br />
          tells the whole story.
        </h1>
        <p className="mt-4 text-lg font-normal leading-relaxed text-cream/70">
          Writing on prevention, healthspan and lifestyle medicine — from the Evida team.
        </p>
      </div>
    </section>
  );
}
