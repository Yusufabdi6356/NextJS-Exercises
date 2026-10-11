import { Document, Filter, ObjectId, WithId } from "mongodb";
import { CreateTodoInput, Priority, Todo, UpdateTodoInput } from "../types/todo";
import { getTodoCollection } from "./db";

const priorityOrder: Record<Priority, number> = {
  high: 0,
  medium: 1,
  low: 2,
};

function toTodo(todo: WithId<Document>): Todo {
  return {
    _id: todo._id.toString(),
    title: todo.title,
    completed: todo.completed,
    priority: todo.priority || "medium",
    createdAt: todo.createdAt?.toISOString() || new Date().toISOString(),
    updatedAt: todo.updatedAt?.toISOString(),
  };
}

function escapeRegex(text: string) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export async function fetchTodos(search = "", status = "all"): Promise<Todo[]> {
  try {
    const collection = await getTodoCollection();
    const filter: Filter<Document> = {};

    if (search) {
      filter.title = { $regex: escapeRegex(search), $options: "i" };
    }

    if (status === "completed") {
      filter.completed = true;
    }

    if (status === "pending") {
      filter.completed = false;
    }

    const todos = await collection.find(filter).sort({ createdAt: -1 }).toArray();

    return todos
      .map(toTodo)
      .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  } catch (error) {
    console.error("Error fetching todos:", error);
    return [];
  }
}

export async function fetchTodoById(id: string): Promise<Todo | null> {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  try {
    const collection = await getTodoCollection();

    const todo = await collection.findOne({ _id: new ObjectId(id) });

    if (!todo) {
      return null;
    }

    return toTodo(todo);
  } catch (error) {
    console.error("Error fetching todo by id:", error);
    return null;
  }
}

export async function createTodo(todo: CreateTodoInput): Promise<string | null> {
  try {
    const collection = await getTodoCollection();

    const result = await collection.insertOne({
      title: todo.title,
      completed: todo.completed ?? false,
      priority: todo.priority,
      createdAt: new Date(),
    });

    return result.insertedId.toString();
  } catch (error) {
    console.error("Error creating todo:", error);
    return null;
  }
}

export async function updateTodo(id: string, todo: UpdateTodoInput): Promise<boolean> {
  try {
    const collection = await getTodoCollection();

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...todo, updatedAt: new Date() } }
    );

    return result.matchedCount > 0;
  } catch (error) {
    console.error("Error updating todo:", error);
    return false;
  }
}

export async function deleteTodo(id: string): Promise<boolean> {
  try {
    const collection = await getTodoCollection();

    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    return result.deletedCount > 0;
  } catch (error) {
    console.error("Error deleting todo:", error);
    return false;
  }
}

export async function deleteTodos(ids: string[]): Promise<boolean> {
  try {
    const collection = await getTodoCollection();

    const objectIds = ids
      .filter((id) => ObjectId.isValid(id))
      .map((id) => new ObjectId(id));

    const result = await collection.deleteMany({ _id: { $in: objectIds } });

    return result.deletedCount > 0;
  } catch (error) {
    console.error("Error deleting todos:", error);
    return false;
  }
}

export async function setAllCompleted(completed: boolean): Promise<boolean> {
  try {
    const collection = await getTodoCollection();

    const result = await collection.updateMany(
      { completed: { $ne: completed } },
      { $set: { completed, updatedAt: new Date() } }
    );

    return result.acknowledged;
  } catch (error) {
    console.error("Error updating todos:", error);
    return false;
  }
}
