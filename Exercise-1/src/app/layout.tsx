import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "My Dashboard App",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gray-100 font-sans" suppressHydrationWarning>
        <header className="bg-white p-4 shadow-md">
          <h1 className="text-xl font-bold text-blue-600">My Dashboard App</h1>
          <nav className="my-4 space-x-4">
            <Link href="/" className="text-blue-600 hover:underline">Home</Link>
            <Link href="/about" className="text-blue-600 hover:underline">About</Link>
          </nav>
        </header>
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
