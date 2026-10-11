"use client";

import { useState } from "react";

type TaskFormProps = {
  onAdd: (title: string, description: string) => Promise<string | null>;
};

export default function TaskForm({ onAdd }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    if (title.trim() === "") {
      setError("Title is required");
      return;
    }

    setError("");
    setSaving(true);

    const result = await onAdd(title, description);

    setSaving(false);

    if (result) {
      setError(result);
      return;
    }

    setTitle("");
    setDescription("");
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-4 space-y-3">
      <h2 className="text-lg font-semibold text-gray-800">New task</h2>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title"
        required
        maxLength={100}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description (optional)"
        maxLength={500}
        rows={2}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={saving}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
      >
        {saving ? "Adding..." : "Add task"}
      </button>
    </form>
  );
}
