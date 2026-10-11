import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - MyApp",
  description: "Manage your account and products.",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <section className="p-6">{children}</section>;
}
