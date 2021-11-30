import mongoose from "mongoose";

const Schema = mongoose.Schema;

const elementSchema = new Schema(
  {
    description: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

const listSchema = new Schema(
  {
    userId: { type: String, unique: true, required: true },
    elements: { type: [elementSchema], required: true },
  },
  { timestamps: true, versionKey: false }
);

export const List = mongoose.model("list", listSchema);
