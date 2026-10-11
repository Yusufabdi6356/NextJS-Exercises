"use client";

import Link from "next/link";
import { useActionState } from "react";
import { updateTodoAction } from "../../actions/update";
import { Todo } from "../../types/todo";

export default function EditForm({ todo }: { todo: Todo }) {
  const [state, formAction, pending] = useActionState(updateTodoAction, null);

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="id" value={todo._id} />

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
          Todo Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          defaultValue={todo.title}
          placeholder="Enter your todo..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
          maxLength={200}
          autoFocus
        />
        <p className="text-xs text-gray-500 mt-1">Maximum 200 characters</p>
      </div>

      <div>
        <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
          Priority
        </label>
        <select
          id="priority"
          name="priority"
          defaultValue={todo.priority}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      {state?.error && (
        <p className="text-red-500 text-sm">{state.error}</p>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={pending}
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors disabled:opacity-50"
        >
          {pending ? "Updating..." : "Update Todo"}
        </button>
        <Link
          href="/"
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
