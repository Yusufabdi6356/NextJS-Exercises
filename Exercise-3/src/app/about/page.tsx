import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - MyApp",
  description: "Learn more about our company and mission.",
};

export default function AboutPage() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">About Us</h1>
    </div>
  );
}
