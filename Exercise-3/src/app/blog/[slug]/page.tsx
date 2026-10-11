import type { Metadata } from "next";
import { fetchPostBySlug } from "@/lib/posts";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchPostBySlug(slug);

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      siteName: "MyApp",
      images: [
        {
          url: post.ogImage,
          width: 1200,
          height: 630,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.ogImage],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await fetchPostBySlug(slug);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">{post.title}</h1>
      <p className="mt-2">{post.body}</p>
    </div>
  );
}
