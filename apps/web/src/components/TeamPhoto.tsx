import { SHOW_CONSULT_PHOTO } from "@/lib/site";

/*
 * Real-photo slot (S7). The July 3 review banned *generic* stock imagery
 * (smiling stock doctor, running-lady video) — but one authentic photo of
 * the actual team/clinic adds warmth CSS cards can't.
 *
 * Drop the real image at public/images/consult.jpg and flip
 * SHOW_CONSULT_PHOTO in lib/site.ts. Renders nothing until then, so no
 * placeholder ever ships externally.
 */
export default function TeamPhoto({ caption }: { caption: string }) {
  if (!SHOW_CONSULT_PHOTO) return null;

  return (
    <figure className="overflow-hidden rounded-3xl border border-line shadow-[0_2px_16px_rgba(34,49,47,0.05)]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/consult.jpg" alt={caption} className="aspect-[4/3] w-full object-cover" />
      <figcaption className="bg-surface px-6 py-4 text-xs text-ink-soft">{caption}</figcaption>
    </figure>
  );
}
