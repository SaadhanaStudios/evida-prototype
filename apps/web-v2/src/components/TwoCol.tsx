/*
 * Alternating two-column section — the core layout rhythm agreed in the
 * July 3 review (text/image, then image/text), replacing the old
 * big-image-then-three-blocks pattern.
 */
export default function TwoCol({
  flip = false,
  media,
  children,
  id,
}: {
  flip?: boolean;
  media: React.ReactNode;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className="container-site grid items-center gap-10 py-16 md:grid-cols-2 md:gap-16 md:py-20">
      <div className={flip ? "md:order-2" : undefined}>{children}</div>
      <div className={flip ? "md:order-1" : undefined}>{media}</div>
    </section>
  );
}
