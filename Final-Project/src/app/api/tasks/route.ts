import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getSession } from "@/lib/session";
import { validateTask } from "@/lib/validate";
import Task from "@/models/Task";

export async function GET() {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const tasks = await Task.find({ userId: session.user.id }).sort({ createdAt: -1 });

    return NextResponse.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json({ error: "Failed to load tasks" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json().catch(() => null);

    if (!body) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const error = validateTask({
      title: body.title ?? "",
      description: body.description,
      status: body.status,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    await connectDB();
    const task = await Task.create({
      title: body.title,
      description: body.description,
      status: body.status,
      userId: session.user.id,
    });

    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    console.error("Error creating task:", error);
    return NextResponse.json({ error: "Failed to create task" }, { status: 500 });
  }
}
