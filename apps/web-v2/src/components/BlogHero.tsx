export default function BlogHero() {
  return (
    <section
      className="relative flex min-h-[clamp(360px,46vw,540px)] items-end overflow-hidden px-10 pb-14 md:px-14 md:pb-18"
      style={{
        backgroundImage:
          "linear-gradient(to top, rgba(11,11,11,0.80) 0%, rgba(11,11,11,0.42) 55%, rgba(11,11,11,0.20) 100%), url('/images/blog-hero.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center 30%",
      }}
    >
      <div className="grid w-full max-w-5xl gap-10 md:grid-cols-2 md:gap-16">
        {/* Left — title */}
        <div>
          <h1 className="text-4xl font-normal leading-[1.08] tracking-tight text-cream md:text-6xl">
            The Evida<span className="text-cream/45">y</span><br />
            Health{" "}
            <span className="font-display font-normal italic text-cream/60">
              Blog
            </span>
          </h1>
        </div>

        {/* Right — descriptor */}
        <div className="flex flex-col justify-end">
          <p className="text-lg font-normal leading-snug text-cream md:text-2xl">
            Clear, evidence-based insights to help you understand and improve your health.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-cream/65">
            We break down the science of longevity, lifestyle medicine and habits — so you can take meaningful action.
          </p>
        </div>
      </div>
    </section>
  );
}
