import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    userName: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    accessToken: { type: String, default: "" },
    refreshToken: { type: String, default: "" },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("User", userSchema);
