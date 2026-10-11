"use client";

import { useState } from "react";
import { Status, Task } from "@/types/task";

type TaskCardProps = {
  task: Task;
  onUpdate: (id: string, data: Partial<Task>) => Promise<string | null>;
  onDelete: (id: string) => Promise<void>;
};

export default function TaskCard({ task, onUpdate, onDelete }: TaskCardProps) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState<Status>(task.status);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [dragging, setDragging] = useState(false);

  function startEditing() {
    setTitle(task.title);
    setDescription(task.description);
    setStatus(task.status);
    setError("");
    setEditing(true);
  }

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    if (title.trim() === "") {
      setError("Title is required");
      return;
    }

    setError("");
    setSaving(true);

    const result = await onUpdate(task._id, { title, description, status });

    setSaving(false);

    if (result) {
      setError(result);
      return;
    }

    setEditing(false);
  }

  async function handleDelete() {
    if (!confirm("Delete this task?")) {
      return;
    }

    setSaving(true);
    await onDelete(task._id);
    setSaving(false);
  }

  if (editing) {
    return (
      <form onSubmit={handleSubmit} className="bg-white rounded-md border border-blue-300 p-3 space-y-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          maxLength={100}
          className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={500}
          rows={2}
          className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as Status)}
          className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={saving}
            className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            onClick={() => setEditing(false)}
            className="px-3 py-1.5 text-sm border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    );
  }

  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("text/plain", task._id);
        setDragging(true);
      }}
      onDragEnd={() => setDragging(false)}
      className={`bg-white rounded-md border border-gray-200 p-3 cursor-grab shadow-sm hover:shadow-md transition ${dragging ? "opacity-50" : ""}`}
    >
      <h3 className="font-medium text-gray-800 wrap-break-word">{task.title}</h3>

      {task.description && (
        <p className="mt-1 text-sm text-gray-600 wrap-break-word">{task.description}</p>
      )}

      <div className="mt-3 flex gap-3 text-sm">
        <button
          onClick={startEditing}
          disabled={saving}
          className="text-blue-600 hover:underline disabled:opacity-50"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          disabled={saving}
          className="text-red-600 hover:underline disabled:opacity-50"
        >
          {saving ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
}
