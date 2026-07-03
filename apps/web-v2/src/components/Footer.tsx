import Link from "next/link";
import Logo from "./Logo";
import { LINKS } from "@/lib/site";

/*
 * Footer layout per the July 3 whiteboard:
 * columns — About (blurb + logo + socials) | How it works | Blog
 * second row — Sitemap | Contact
 * then the copyright line. Contact lives here, not in the nav.
 */
export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="container-site grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Link href="/" className="inline-block text-teal" aria-label="Evida home">
            <Logo className="h-6 w-auto" />
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-soft">
            More than a health check. A preventative health membership that unites
            your blood biomarkers, wearable data and medical history — read by a GP
            with the time to act on them.
          </p>
          <div className="mt-6 flex items-center gap-4">
            <a href={LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-ink-soft hover:text-teal">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-ink-soft hover:text-teal">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.24 8.31h4.52V23H.24V8.31zM8.34 8.31h4.33v2h.06c.6-1.14 2.08-2.34 4.28-2.34 4.58 0 5.42 3.01 5.42 6.92V23h-4.51v-7.13c0-1.7-.03-3.89-2.37-3.89-2.37 0-2.73 1.85-2.73 3.76V23H8.34V8.31z" />
              </svg>
            </a>
            <a href={LINKS.substack} target="_blank" rel="noopener noreferrer" aria-label="Substack" className="text-ink-soft hover:text-teal">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 4H2v2.4h20V4zM2 9.2V20l10-5.4L22 20V9.2H2z" />
              </svg>
            </a>
          </div>
        </div>

        <nav aria-label="How it works">
          <div className="eyebrow">How it works</div>
          <ul className="mt-4 space-y-3 text-sm text-ink-soft">
            <li><Link href="/how-it-works#initial" className="hover:text-teal">Your first two weeks</Link></li>
            <li><Link href="/how-it-works#six-months" className="hover:text-teal">Your first six months</Link></li>
            <li><Link href="/how-it-works#ongoing" className="hover:text-teal">Ongoing care</Link></li>
            <li><Link href="/membership" className="hover:text-teal">Membership &amp; pricing</Link></li>
            <li><Link href="/membership#faq" className="hover:text-teal">FAQs</Link></li>
          </ul>
        </nav>

        <nav aria-label="Company">
          <div className="eyebrow">Company</div>
          <ul className="mt-4 space-y-3 text-sm text-ink-soft">
            <li><Link href="/about" className="hover:text-teal">About us</Link></li>
            <li><Link href="/blog" className="hover:text-teal">Blog</Link></li>
            <li>
              <a href={LINKS.substack} target="_blank" rel="noopener noreferrer" className="hover:text-teal">
                Newsletter
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-line">
        <div className="container-site grid gap-8 py-10 md:grid-cols-2">
          <div>
            <div className="eyebrow">Sitemap</div>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-soft">
              <li><Link href="/" className="hover:text-teal">Home</Link></li>
              <li><Link href="/membership" className="hover:text-teal">Membership</Link></li>
              <li><Link href="/how-it-works" className="hover:text-teal">How it works</Link></li>
              <li><Link href="/blog" className="hover:text-teal">Blog</Link></li>
              <li><Link href="/about" className="hover:text-teal">About</Link></li>
            </ul>
          </div>
          <div>
            <div className="eyebrow">Contact</div>
            <p className="mt-3 text-sm text-ink-soft">
              <a href={`mailto:${LINKS.email}`} className="font-medium text-teal hover:text-teal-dark">
                {LINKS.email}
              </a>
              <br />
              {LINKS.address}
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-site flex flex-col items-start justify-between gap-2 py-6 text-xs text-ink-soft md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} Evida. All rights reserved.</span>
          <span>Preventative healthcare that works alongside your NHS GP — not instead of them.</span>
        </div>
      </div>
    </footer>
  );
}
