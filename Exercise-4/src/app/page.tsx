import Link from "next/link";
import { fetchTodos } from "./lib/todo";
import { timeAgo } from "./lib/time";
import { toggleTodo } from "./actions/toggle";
import { deleteTodo } from "./actions/delete";
import { deleteSelectedTodos, markAllTodos } from "./actions/bulk";
import { searchTodos } from "./actions/search";

type HomeProps = {
  searchParams: Promise<{ search?: string | string[]; status?: string | string[] }>;
};

const priorityColors = {
  high: "bg-red-100 text-red-700",
  medium: "bg-yellow-100 text-yellow-700",
  low: "bg-green-100 text-green-700",
};

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const search = typeof params.search === "string" ? params.search : "";
  const status = typeof params.status === "string" ? params.status : "all";
  const todos = await fetchTodos(search, status);
  const time = new Date().toLocaleTimeString();
  const isFiltered = search !== "" || status !== "all";

  return (
    <main className="max-w-4xl mx-auto mt-10 p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Todo App</h1>
        <p className="text-sm text-gray-500 mb-4">Last updated: {time}</p>

        <div className="mb-6">
          <Link
            href="/new"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            + Add New Todo
          </Link>
        </div>

        <form
          key={`${search}-${status}`}
          action={searchTodos}
          className="flex flex-wrap gap-2 mb-6"
        >
          <input
            type="text"
            name="search"
            defaultValue={search}
            placeholder="Search todos..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <select
            name="status"
            defaultValue={status}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
          <button
            type="submit"
            className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition-colors"
          >
            Search
          </button>
          {isFiltered && (
            <Link
              href="/"
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Clear
            </Link>
          )}
        </form>

        {todos.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 text-lg">
              {isFiltered ? "No todos found." : "No todos yet!"}
            </p>
            <p className="text-gray-400 text-sm mt-2">
              {isFiltered
                ? "Try a different search or filter."
                : "Create your first todo to get started."}
            </p>
          </div>
        ) : (
          <>
            <div className="flex flex-wrap gap-2 mb-4">
              <form id="bulk-form" action={deleteSelectedTodos}>
                <button
                  type="submit"
                  className="px-3 py-1.5 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  Delete Selected
                </button>
              </form>
              <form action={markAllTodos.bind(null, true)}>
                <button
                  type="submit"
                  className="px-3 py-1.5 text-sm border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Mark All Complete
                </button>
              </form>
              <form action={markAllTodos.bind(null, false)}>
                <button
                  type="submit"
                  className="px-3 py-1.5 text-sm border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Mark All Incomplete
                </button>
              </form>
            </div>

            <div className="space-y-3">
              {todos.map((todo) => (
                <div
                  key={todo._id}
                  className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between bg-gray-50 border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <input
                      type="checkbox"
                      name="ids"
                      value={todo._id}
                      form="bulk-form"
                      aria-label={`Select ${todo.title}`}
                      className="h-4 w-4 shrink-0"
                    />

                    <form action={toggleTodo.bind(null, todo._id)} className="flex shrink-0">
                      <button
                        type="submit"
                        className={`flex h-6 w-6 items-center justify-center rounded-full border text-sm text-white transition-colors ${todo.completed ? "bg-green-600 border-green-600" : "border-gray-400 hover:border-green-600"}`}
                        title={todo.completed ? "Mark as incomplete" : "Mark as complete"}
                      >
                        {todo.completed && "✓"}
                      </button>
                    </form>

                    <div className="min-w-0">
                      <span
                        className={`text-lg wrap-break-word ${todo.completed ? "line-through text-gray-500" : "text-gray-800"}`}
                      >
                        {todo.title}
                      </span>
                      <p className="text-xs text-gray-500">
                        created {timeAgo(todo.createdAt)}
                        {todo.updatedAt && `, updated ${timeAgo(todo.updatedAt)}`}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0 self-end sm:self-auto">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${priorityColors[todo.priority]}`}
                    >
                      {todo.priority}
                    </span>

                    <Link
                      href={`/edit/${todo._id}`}
                      className="px-2 py-1 text-sm text-blue-600 hover:bg-blue-100 rounded-md transition-colors"
                      title="Edit todo"
                    >
                      Edit
                    </Link>

                    <form action={deleteTodo.bind(null, todo._id)}>
                      <button
                        type="submit"
                        className="px-2 py-1 text-sm text-red-600 hover:bg-red-100 rounded-md transition-colors"
                        title="Delete todo"
                      >
                        Delete
                      </button>
                    </form>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
