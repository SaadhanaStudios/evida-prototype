import type { ReactNode } from "react";

export default function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
}) {
  return (
    <section className="hero-wash border-b border-line">
      <div className="container-site pb-12 pt-16 md:pb-16 md:pt-24">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="h-display mt-4 max-w-2xl text-4xl leading-tight md:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
