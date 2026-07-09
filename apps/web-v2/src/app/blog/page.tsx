import type { Metadata } from "next";
import CtaGroup from "@/components/CtaGroup";
import { LINKS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Writing on prevention, healthspan and lifestyle medicine from the Evida team.",
  alternates: { canonical: "/blog" },
  openGraph: { title: "Blog — Evida", url: "/blog" },
};

/*
 * Blog index — content lives on Substack for now; this page keeps readers
 * on-site with a CTA (July 3 decision) rather than being a bare redirect.
 * Wire to the Substack feed when the pipeline is ready.
 */

const POSTS = [
  {
    title: "Why Staying Healthy Isn't About Motivation",
    excerpt:
      "Generational drift and how a systems-based approach can help us live healthier. You don't rise to the level of your goals — you fall to the level of your systems.",
    author: "Abhishek Kumar",
    date: "1 April 2026",
    href: "https://evidahealth.substack.com/p/why-staying-healthy-isnt-about-motivation",
  },
];

export default function BlogPage() {
  return (
    <>
      <section className="container-site pb-8 pt-16 md:pt-24">
        <div className="max-w-2xl">
          <p className="eyebrow">Blog</p>
          <h1 className="h-display mt-4 text-4xl leading-tight md:text-5xl">
            Insight, grounded in evidence.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-ink-soft">
            Writing on prevention, healthspan and lifestyle medicine — because
            understanding your health shouldn&rsquo;t require a medical degree.
          </p>
        </div>
      </section>

      <section className="container-site py-12 md:py-16">
        <div className="grid gap-6 md:grid-cols-2">
          {POSTS.map((post) => (
            <a
              key={post.href}
              href={post.href}
              target="_blank"
              rel="noopener noreferrer"
              className="card card-lift group"
            >
              <div className="text-xs font-medium uppercase tracking-wider text-ink-soft">
                {post.author} · {post.date}
              </div>
              <h2 className="h-display mt-3 text-2xl group-hover:text-teal">{post.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{post.excerpt}</p>
              <span className="btn-ghost mt-5">Read the article →</span>
            </a>
          ))}

          {/* Newsletter card */}
          <div className="card flex flex-col justify-between border-teal/30 bg-teal-light/30">
            <div>
              <div className="eyebrow">Newsletter</div>
              <h2 className="h-display mt-3 text-2xl">Get the next one first.</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                One considered piece at a time, straight to your inbox via Substack.
                No spam, ever.
              </p>
            </div>
            <a
              href={LINKS.substack}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-6 self-start"
            >
              Subscribe on Substack
            </a>
          </div>
        </div>
      </section>

      <section className="hairline-t bg-surface">
        <div className="container-site py-16 text-center md:py-20">
          <h2 className="h-display mx-auto max-w-lg text-3xl">
            Ready to move from reading to <span className="accent-word">doing?</span>
          </h2>
          <div className="mt-8">
            <CtaGroup center />
          </div>
        </div>
      </section>
    </>
  );
}
