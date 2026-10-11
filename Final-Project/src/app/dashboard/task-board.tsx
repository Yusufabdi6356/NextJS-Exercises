"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Status, Task } from "@/types/task";
import TaskCard from "./task-card";
import TaskForm from "./task-form";

const columns: { status: Status; label: string }[] = [
  { status: "todo", label: "To Do" },
  { status: "in-progress", label: "In Progress" },
  { status: "done", label: "Done" },
];

export default function TaskBoard({ userName }: { userName: string }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState<Status | null>(null);

  useEffect(() => {
    async function loadTasks() {
      try {
        const res = await fetch("/api/tasks");

        if (!res.ok) {
          throw new Error("Failed to load tasks");
        }

        setTasks(await res.json());
      } catch {
        setError("Could not load your tasks. Please refresh the page.");
      } finally {
        setLoading(false);
      }
    }

    loadTasks();
  }, []);

  async function addTask(title: string, description: string) {
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });
      const data = await res.json();

      if (!res.ok) {
        return data.error as string;
      }

      setTasks((current) => [data, ...current]);
      return null;
    } catch {
      return "Could not add the task. Please try again.";
    }
  }

  async function updateTask(id: string, changes: Partial<Task>) {
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(changes),
      });
      const data = await res.json();

      if (!res.ok) {
        return data.error as string;
      }

      setTasks((current) => current.map((task) => (task._id === id ? data : task)));
      return null;
    } catch {
      return "Could not save the task. Please try again.";
    }
  }

  async function deleteTask(id: string) {
    setError("");

    try {
      const res = await fetch(`/api/tasks/${id}`, { method: "DELETE" });

      if (!res.ok) {
        throw new Error("Failed to delete task");
      }

      setTasks((current) => current.filter((task) => task._id !== id));
    } catch {
      setError("Could not delete the task. Please try again.");
    }
  }

  async function moveTask(id: string, status: Status) {
    const task = tasks.find((t) => t._id === id);

    if (!task || task.status === status) {
      return;
    }

    const oldStatus = task.status;

    setError("");
    setTasks((current) => current.map((t) => (t._id === id ? { ...t, status } : t)));

    const result = await updateTask(id, { status });

    if (result) {
      setTasks((current) => current.map((t) => (t._id === id ? { ...t, status: oldStatus } : t)));
      setError("Could not move the task. Please try again.");
    }
  }

  async function handleLogout() {
    await authClient.signOut();
    window.location.href = "/login";
  }

  return (
    <div>
      <header className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <h1 className="text-xl font-bold text-blue-600">TaskFlow</h1>
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-sm text-gray-600 truncate">{userName}</span>
            <button
              onClick={handleLogout}
              className="shrink-0 px-3 py-1.5 text-sm border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        <TaskForm onAdd={addTask} />

        {error && (
          <p className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-md px-4 py-3">
            {error}
          </p>
        )}

        {loading ? (
          <p className="text-center text-gray-500 py-8">Loading tasks...</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {columns.map((column) => {
              const columnTasks = tasks.filter((task) => task.status === column.status);

              return (
                <section
                  key={column.status}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragOver(column.status);
                  }}
                  onDragLeave={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                      setDragOver(null);
                    }
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragOver(null);
                    moveTask(e.dataTransfer.getData("text/plain"), column.status);
                  }}
                  className={`rounded-lg p-3 min-h-40 transition-colors ${dragOver === column.status ? "bg-blue-100 ring-2 ring-blue-300" : "bg-gray-200"}`}
                >
                  <h2 className="font-semibold text-gray-700 mb-3">
                    {column.label} ({columnTasks.length})
                  </h2>

                  <div className="space-y-3">
                    {columnTasks.length === 0 && (
                      <p className="text-sm text-gray-500">No tasks here.</p>
                    )}

                    {columnTasks.map((task) => (
                      <TaskCard
                        key={task._id}
                        task={task}
                        onUpdate={updateTask}
                        onDelete={deleteTask}
                      />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
