"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { LINKS, NAV } from "@/lib/site";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-cream/90 backdrop-blur">
      <div className="container-site flex h-16 items-center justify-between gap-6">
        <Link href="/" className="text-teal" aria-label="Evida home">
          <Logo className="h-6 w-auto" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {NAV.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`text-sm font-medium transition-colors hover:text-teal ${
                  active ? "text-teal" : "text-ink-soft"
                }`}
              >
                {item.label}
                {active && (
                  <span className="mt-0.5 block h-0.5 rounded-full bg-teal" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          <a href={LINKS.login} className="text-sm font-medium text-ink-soft hover:text-teal">
            Log in
          </a>
          <a href={LINKS.book} className="btn-primary">
            Get Started
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
          {NAV.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`block py-3 text-base font-medium ${active ? "text-teal" : "text-ink"}`}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
          <div className="mt-4 flex items-center gap-4">
            <a href={LINKS.login} className="btn-secondary flex-1">
              Log in
            </a>
            <a href={LINKS.book} className="btn-primary flex-1">
              Get Started
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
