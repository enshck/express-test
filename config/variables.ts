import { config } from "dotenv";

config();

export default {
  port: process.env.PORT,
  defaultUrl: process.env.DEFAULT_URL,
  mongoDbUrl: process.env.MONGO_DB_URL,
  jwtEncryptionKey: process.env.JWT_ENCRYPTION_KEY,
  accessTokenExpire: process.env.ACCESS_TOKEN_EXPIRE,
  refreshTokenExpire: process.env.REFRESH_TOKEN_EXPIRE,
};
