"use server";

import { redirect } from "next/navigation";

export async function searchTodos(formData: FormData) {
  const search = (formData.get("search") as string).trim();
  const status = formData.get("status") as string;

  const params = new URLSearchParams();

  if (search) {
    params.set("search", search);
  }

  if (status === "completed" || status === "pending") {
    params.set("status", status);
  }

  const query = params.toString();
  redirect(query ? `/?${query}` : "/");
}
