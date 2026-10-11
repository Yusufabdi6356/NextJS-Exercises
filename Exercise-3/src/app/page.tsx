import Link from "next/link";

export default function Home() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">SEO and Metadata</h1>
      <ul className="mt-4 space-y-2">
        <li>
          <Link href="/about" className="text-blue-600 hover:underline">About Us</Link>
        </li>
        <li>
          <Link href="/dashboard" className="text-blue-600 hover:underline">Dashboard</Link>
        </li>
        <li>
          <Link href="/user/vercel" className="text-blue-600 hover:underline">User Profile</Link>
        </li>
        <li>
          <Link href="/blog/1" className="text-blue-600 hover:underline">Blog Post</Link>
        </li>
      </ul>
    </main>
  );
}
