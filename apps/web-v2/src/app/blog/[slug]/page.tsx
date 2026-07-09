import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { compileMDX } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug, formatDate } from "@/lib/posts";
import CtaGroup from "@/components/CtaGroup";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { meta } = getPostBySlug(slug);
  return {
    title: meta.title,
    description: meta.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: `${meta.title} — Evida`,
      description: meta.excerpt,
      url: `/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const { meta, content } = getPostBySlug(slug);
  const { content: mdxContent } = await compileMDX({ source: content });

  return (
    <>
      {/* Cover image */}
      <div className="relative h-[280px] w-full overflow-hidden md:h-[420px]">
        <Image
          src={meta.coverImage}
          alt={meta.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      {/* Article */}
      <div className="container-site py-10 md:py-14">
        <Link
          href="/blog"
          className="btn-ghost mb-8 inline-flex items-center gap-1.5 text-ink-soft hover:text-teal"
        >
          ← Back to blog
        </Link>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {meta.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-teal/10 px-3 py-1 text-[11px] font-semibold tracking-wide text-teal"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1
          style={{ fontFamily: "var(--font-display)" }}
          className="mt-5 max-w-3xl text-3xl font-medium leading-tight tracking-tight text-teal-dark md:text-4xl"
        >
          {meta.title}
        </h1>

        {/* Meta */}
        <p className="mt-3 text-sm text-ink-soft">
          {meta.author} · {formatDate(meta.date)}
        </p>

        <hr className="my-8 border-line" />

        {/* Body */}
        <div className="prose-evida max-w-2xl">{mdxContent}</div>

        <hr className="my-10 border-line" />

        <div className="flex items-center justify-between">
          <Link href="/blog" className="btn-ghost">
            ← Back to blog
          </Link>
          <a
            href={meta.substackUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-ink-soft hover:text-teal"
          >
            Read on Substack →
          </a>
        </div>
      </div>

      {/* Closing CTA */}
      <section className="hairline-t bg-surface">
        <div className="container-site py-20 text-center md:py-24">
          <h2 className="h-display mx-auto max-w-xl text-3xl md:text-4xl">
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
