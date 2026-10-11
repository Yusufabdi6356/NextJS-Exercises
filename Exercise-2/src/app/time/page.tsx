export const dynamic = "force-dynamic";

export default function TimePage() {
  const now = new Date().toLocaleTimeString();
  return <p className="p-6">Current server time: {now}</p>;
}
