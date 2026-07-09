import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageClient from "@/components/PageClient";
import { BLOG_SLUGS, getBlogPost } from "@/lib/blog-posts";
import { SHARED_SCRIPT_QUEUE } from "@/lib/site-scripts";

export function generateStaticParams() {
  return BLOG_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: post.meta.title,
    description: post.meta.description,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return <PageClient html={post.html} scripts={SHARED_SCRIPT_QUEUE} />;
}
