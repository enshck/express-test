import { config } from "dotenv";

config();

export default {
  port: process.env.PORT,
  defaultUrl: process.env.DEFAULT_URL,
  mongoDbUrl: process.env.MONGO_DB_URL,
};
