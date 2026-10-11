import Link from "next/link";

export default function Home() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Rendering in Next.js</h1>
      <ul className="mt-4 space-y-2">
        <li>
          <Link href="/products" className="text-blue-600 hover:underline">Products</Link>
        </li>
        <li>
          <Link href="/counter" className="text-blue-600 hover:underline">Counter</Link>
        </li>
        <li>
          <Link href="/time" className="text-blue-600 hover:underline">Server Time</Link>
        </li>
        <li>
          <Link href="/about" className="text-blue-600 hover:underline">About Us</Link>
        </li>
        <li>
          <Link href="/dashboard" className="text-blue-600 hover:underline">Dashboard</Link>
        </li>
      </ul>
    </main>
  );
}
