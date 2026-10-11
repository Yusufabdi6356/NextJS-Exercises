type Post = {
  id: number;
  title: string;
  body: string;
};

export async function fetchPostBySlug(slug: string) {
  const res = await fetch(`https://dummyjson.com/posts/${encodeURIComponent(slug)}`);

  if (!res.ok) {
    return {
      title: "Post Not Found",
      excerpt: "This post does not exist.",
      body: "",
      ogImage: `https://og-image.vercel.app/${encodeURIComponent(slug)}.png?theme=light`,
    };
  }

  const post: Post = await res.json();

  return {
    title: post.title,
    excerpt: post.body.slice(0, 120),
    body: post.body,
    ogImage: `https://og-image.vercel.app/${encodeURIComponent(post.title)}.png?theme=light`,
  };
}
