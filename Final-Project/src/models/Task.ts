import mongoose, { InferSchemaType, Model, Schema } from "mongoose";
import { statuses } from "@/types/task";

const taskSchema = new Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 100 },
    description: { type: String, default: "", trim: true, maxlength: 500 },
    status: { type: String, enum: statuses, default: "todo" },
    userId: { type: String, required: true, index: true },
  },
  { timestamps: true }
);

type TaskDocument = InferSchemaType<typeof taskSchema>;

const Task: Model<TaskDocument> =
  mongoose.models.Task || mongoose.model("Task", taskSchema);

export default Task;
