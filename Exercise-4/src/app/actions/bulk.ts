"use server";

import { revalidatePath } from "next/cache";
import { deleteTodos, setAllCompleted } from "../lib/todo";

export async function deleteSelectedTodos(formData: FormData) {
  const ids = formData.getAll("ids") as string[];

  if (ids.length === 0) {
    console.error("No todos selected");
    return;
  }

  const success = await deleteTodos(ids);

  if (!success) {
    console.error("Failed to delete todos");
    return;
  }

  revalidatePath("/");
}

export async function markAllTodos(completed: boolean) {
  const success = await setAllCompleted(completed);

  if (!success) {
    console.error("Failed to update todos");
    return;
  }

  revalidatePath("/");
}
