import mongoose from "mongoose";
import variables from "./variables";

export default async () => {
  try {
    const conn = await mongoose.connect(variables.mongoDbUrl);

    console.log("✅ Successfully connected to database");
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`❗️ MongoDB connect ${err}`);
    process.exit(1);
  }
};
