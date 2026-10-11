"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { fetchTodoById, updateTodo } from "../lib/todo";
import { FormState, Priority } from "../types/todo";

export async function updateTodoAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const priority = formData.get("priority") as Priority;

  if (!id) {
    return { error: "Todo ID is required" };
  }

  if (!title || title.trim().length === 0) {
    return { error: "Title is required" };
  }

  if (title.length > 200) {
    return { error: "Title must be less than 200 characters" };
  }

  if (!["low", "medium", "high"].includes(priority)) {
    return { error: "Please choose a priority" };
  }

  const existingTodo = await fetchTodoById(id);
  if (!existingTodo) {
    return { error: "Todo not found" };
  }

  const success = await updateTodo(id, { title: title.trim(), priority });

  if (!success) {
    return { error: "Failed to update todo" };
  }

  revalidatePath("/");
  redirect("/");
}
