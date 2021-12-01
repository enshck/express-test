import mongoose, { ObjectId } from "mongoose";

const Schema = mongoose.Schema;

interface IToDoElement {
  user: ObjectId;
  description: string;
}

const ToDoElementSchema = new Schema<IToDoElement>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    description: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

export const ToDoElement = mongoose.model<IToDoElement>(
  "Todo",
  ToDoElementSchema
);
