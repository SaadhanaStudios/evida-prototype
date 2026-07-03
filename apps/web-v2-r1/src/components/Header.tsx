"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import { LINKS, NAV } from "@/lib/site";

/*
 * Persistent header, per the July 3 whiteboard: logo left, nav centre,
 * login + the single primary CTA top-right on every page (primary sits
 * rightmost — "primary on the right").
 */
export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-cream/90 backdrop-blur">
      <div className="container-site flex h-16 items-center justify-between gap-6">
        <Link href="/" className="text-teal" aria-label="Evida home">
          <Logo className="h-6 w-auto" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-ink-soft transition-colors hover:text-teal"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          <a href={LINKS.login} className="text-sm font-medium text-ink-soft hover:text-teal">
            Log in
          </a>
          <a href={LINKS.book} className="btn-primary">
            Book your baseline
          </a>
        </div>

        <button
          type="button"
          className="text-teal md:hidden"
          aria-expanded={open}
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="border-t border-line bg-cream px-6 pb-6 pt-3 md:hidden" aria-label="Mobile">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block py-3 text-base font-medium text-ink"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-4 flex items-center gap-4">
            <a href={LINKS.login} className="btn-secondary flex-1">
              Log in
            </a>
            <a href={LINKS.book} className="btn-primary flex-1">
              Book now
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
