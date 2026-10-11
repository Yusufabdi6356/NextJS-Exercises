import { statuses } from "@/types/task";

type TaskInput = {
  title?: unknown;
  description?: unknown;
  status?: unknown;
};

export function validateTask(data: TaskInput) {
  if (data.title !== undefined) {
    if (typeof data.title !== "string" || data.title.trim() === "") {
      return "Title is required";
    }

    if (data.title.trim().length > 100) {
      return "Title must be 100 characters or less";
    }
  }

  if (data.description !== undefined) {
    if (typeof data.description !== "string") {
      return "Description must be text";
    }

    if (data.description.trim().length > 500) {
      return "Description must be 500 characters or less";
    }
  }

  if (data.status !== undefined && !statuses.includes(data.status as string)) {
    return "Invalid status";
  }

  return null;
}
