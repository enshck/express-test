import { Express } from "express";

import { usersPaths } from "./const/paths";
import {
  login,
  register,
  refreshAccessToken,
} from "../controllers/userController";

export default (app: Express) => {
  app.post(usersPaths.login, login);
  app.post(usersPaths.register, register);
  app.post(usersPaths.refreshToken, refreshAccessToken);
};
