"use client";

import { useEffect, useState } from "react";
import { LINKS, PRICE } from "@/lib/site";

/*
 * Sticky mobile CTA bar (S10) — on mobile the header's primary button lives
 * behind the burger menu, so conversion needs a persistent surface. Appears
 * after the visitor scrolls past the hero; hidden on md+ where the header
 * CTA is always visible.
 */
export default function StickyMobileCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-cream/95 px-4 py-3 backdrop-blur transition-transform duration-300 md:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-sm font-semibold text-ink">{PRICE.perMonth}/month</div>
          <div className="text-xs text-ink-soft">billed annually at {PRICE.perYear}</div>
        </div>
        <a href={LINKS.book} className="btn-primary shrink-0">
          Get Started
        </a>
      </div>
    </div>
  );
}
