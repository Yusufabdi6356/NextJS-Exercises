"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createTodo } from "../lib/todo";
import { FormState, Priority } from "../types/todo";

export async function createTodoAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const title = formData.get("title") as string;
  const priority = formData.get("priority") as Priority;

  if (!title || title.trim().length === 0) {
    return { error: "Title is required" };
  }

  if (title.length > 200) {
    return { error: "Title must be less than 200 characters" };
  }

  if (!["low", "medium", "high"].includes(priority)) {
    return { error: "Please choose a priority" };
  }

  const todoId = await createTodo({ title: title.trim(), priority });

  if (!todoId) {
    return { error: "Failed to create todo" };
  }

  revalidatePath("/");
  redirect("/");
}
