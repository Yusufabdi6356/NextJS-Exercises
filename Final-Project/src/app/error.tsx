"use client";

export default function Error({ retry }: { error: Error; retry: () => void }) {
  return (
    <main className="max-w-md mx-auto px-6 py-24 text-center">
      <h1 className="text-2xl font-bold text-gray-800">Something went wrong</h1>
      <p className="mt-2 text-gray-600">Please try again in a moment.</p>
      <button
        onClick={() => retry()}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Try again
      </button>
    </main>
  );
}
