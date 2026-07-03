/*
 * Editorial pull-quote band — the "no single data point" device from the
 * July 3 review: a magazine-style quote interleaved between sections
 * (and between How-it-works stages on the whiteboard). Optionally cites
 * a linkable source for credibility/backlinks.
 */
export default function PullQuote({
  children,
  source,
  href,
}: {
  children: React.ReactNode;
  source?: string;
  href?: string;
}) {
  return (
    <figure className="container-site py-16 md:py-20">
      <blockquote className="relative mx-auto max-w-3xl text-center">
        <span aria-hidden className="block font-[family-name:var(--font-display)] text-6xl leading-none text-coral">
          “
        </span>
        <p className="h-display mt-2 text-3xl leading-snug md:text-4xl">{children}</p>
        {source && (
          <figcaption className="mt-6 text-sm font-medium uppercase tracking-[0.15em] text-ink-soft">
            {href ? (
              <a href={href} target="_blank" rel="noopener noreferrer" className="hover:text-teal">
                {source}
              </a>
            ) : (
              source
            )}
          </figcaption>
        )}
      </blockquote>
    </figure>
  );
}
