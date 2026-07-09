import type { Metadata } from "next";
import Image from "next/image";
import BlogHero from "@/components/BlogHero";
import CtaGroup from "@/components/CtaGroup";
import { LINKS } from "@/lib/site";
import { getAllPosts, formatDate } from "@/lib/posts";
import type { PostMeta } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Writing on prevention, healthspan and lifestyle medicine from the Evida team.",
  alternates: { canonical: "/blog" },
  openGraph: { title: "Blog — Evida", url: "/blog" },
};

function TagPill({ tag }: { tag: string }) {
  return (
    <span className="rounded-full bg-teal/10 px-2.5 py-0.5 text-[11px] font-semibold tracking-wide text-teal">
      {tag}
    </span>
  );
}

function FeaturedCard({ post }: { post: PostMeta }) {
  return (
    <a
      href={`/blog/${post.slug}`}
      className="card card-lift group mb-10 grid overflow-hidden p-0 md:grid-cols-[3fr_2fr]"
    >
      <div className="relative aspect-video overflow-hidden md:aspect-auto md:h-full">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, 60vw"
          priority
        />
      </div>
      <div className="flex flex-col justify-end p-7 md:p-10">
        <div className="flex flex-wrap gap-1.5">
          {post.tags.slice(0, 3).map((tag) => (
            <TagPill key={tag} tag={tag} />
          ))}
        </div>
        <h2
          style={{ fontFamily: "var(--font-display)" }}
          className="mt-4 text-2xl font-medium leading-snug tracking-tight text-teal-dark transition-colors group-hover:text-teal md:text-3xl"
        >
          {post.title}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">
          {post.excerpt}
        </p>
        <p className="mt-4 text-xs text-ink-soft">
          {post.author} · {formatDate(post.date)}
        </p>
        <span className="btn-ghost mt-5 self-start">Read article →</span>
      </div>
    </a>
  );
}

function PostCard({ post }: { post: PostMeta }) {
  return (
    <a
      href={`/blog/${post.slug}`}
      className="card card-lift group flex flex-col overflow-hidden p-0"
    >
      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <div className="flex flex-wrap gap-1.5">
          {post.tags.slice(0, 2).map((tag) => (
            <TagPill key={tag} tag={tag} />
          ))}
        </div>
        <h2
          style={{ fontFamily: "var(--font-display)" }}
          className="mt-3 text-lg font-medium leading-snug tracking-tight text-teal-dark transition-colors group-hover:text-teal"
        >
          {post.title}
        </h2>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-soft">
          {post.excerpt}
        </p>
        <p className="mt-auto pt-4 text-xs text-ink-soft">
          {post.author} · {formatDate(post.date)}
        </p>
      </div>
    </a>
  );
}

export default function BlogPage() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <>
      <BlogHero />

      {/* Posts */}
      <section className="container-site py-12 md:py-16">
        {featured && <FeaturedCard post={featured} />}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {rest.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="hairline-t bg-surface">
        <div className="container-site py-16 md:py-20">
          <div className="mx-auto max-w-md text-center">
            <p className="eyebrow">Newsletter</p>
            <h2
              style={{ fontFamily: "var(--font-display)" }}
              className="mt-3 text-2xl font-medium tracking-tight text-teal-dark md:text-3xl"
            >
              Get the next one first.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              One considered piece at a time, straight to your inbox via
              Substack. No spam, ever.
            </p>
            <a
              href={LINKS.substack}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-6 inline-flex"
            >
              Subscribe on Substack
            </a>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="hairline-t bg-surface">
        <div className="container-site py-16 text-center md:py-20">
          <h2 className="h-display mx-auto max-w-lg text-3xl">
            Ready to move from reading to{" "}
            <span className="accent-word">doing?</span>
          </h2>
          <div className="mt-8">
            <CtaGroup center />
          </div>
        </div>
      </section>
    </>
  );
}
