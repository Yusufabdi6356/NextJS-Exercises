import Link from "next/link";

export default function Home() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-24 text-center">
      <h1 className="text-4xl font-bold text-blue-600">TaskFlow</h1>
      <p className="mt-4 text-lg text-gray-600">
        A simple task manager. Add your tasks and drag them from To Do to Done.
      </p>

      <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
        <Link
          href="/register"
          className="px-5 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Create an account
        </Link>
        <Link
          href="/dashboard"
          className="px-5 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
        >
          Go to dashboard
        </Link>
      </div>
    </main>
  );
}
