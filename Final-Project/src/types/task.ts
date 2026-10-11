export const statuses = ["todo", "in-progress", "done"];

export type Status = "todo" | "in-progress" | "done";

export type Task = {
  _id: string;
  title: string;
  description: string;
  status: Status;
  userId: string;
  createdAt: string;
  updatedAt: string;
};
