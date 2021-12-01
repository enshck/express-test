import mongoose from "mongoose";

const Schema = mongoose.Schema;

interface IUserData {
  userName: string;
  password: string;
  accessToken: string;
  refreshToken: string;
}

const UserSchema = new Schema<IUserData>(
  {
    userName: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    accessToken: { type: String, default: "" },
    refreshToken: { type: String, default: "" },
  },
  { timestamps: true, versionKey: false }
);

export const User = mongoose.model<IUserData>("User", UserSchema);
