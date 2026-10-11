import type { Metadata } from "next";
import { fetchUser } from "@/lib/users";

type Props = {
  params: Promise<{ username: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;
  const user = await fetchUser(username);
  const ogImage = `https://og-image.vercel.app/${encodeURIComponent(user.name)}.png?theme=light`;

  return {
    title: `${user.name} - MyApp`,
    description: user.bio,
    openGraph: {
      title: user.name,
      description: user.bio,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
        },
      ],
      type: "profile",
    },
  };
}

export default async function UserPage({ params }: Props) {
  const { username } = await params;
  const user = await fetchUser(username);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">{user.name}</h1>
      <p className="mt-2">{user.bio}</p>
    </div>
  );
}
