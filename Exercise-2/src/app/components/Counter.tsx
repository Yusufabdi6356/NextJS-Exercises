"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button
      onClick={() => setCount(count + 1)}
      className="mt-4 rounded bg-blue-600 px-4 py-2 text-white"
    >
      Count: {count}
    </button>
  );
}
