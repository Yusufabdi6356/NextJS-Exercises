import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import TaskBoard from "./task-board";

export default async function DashboardPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return <TaskBoard userName={session.user.name} />;
}
