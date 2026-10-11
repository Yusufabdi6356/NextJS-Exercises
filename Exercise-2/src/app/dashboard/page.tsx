import { Suspense } from "react";
import { SlowComponent } from "./slow-data";

export const dynamic = "force-dynamic";

export default function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Dashboard</h1>
      <Suspense fallback="Loading...">
        <SlowComponent />
      </Suspense>
    </div>
  );
}
