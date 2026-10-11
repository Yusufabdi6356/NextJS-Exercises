export type Priority = "low" | "medium" | "high";

export type Todo = {
  _id: string;
  title: string;
  completed: boolean;
  priority: Priority;
  createdAt: string;
  updatedAt?: string;
};

export type CreateTodoInput = {
  title: string;
  priority: Priority;
  completed?: boolean;
};

export type UpdateTodoInput = {
  title?: string;
  priority?: Priority;
  completed?: boolean;
};

export type FormState = {
  error: string;
} | null;
