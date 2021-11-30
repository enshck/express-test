import { Express } from "express";

import user from "./user";
import list from "./list";

export default (app: Express) => {
  user(app);
  list(app);
};
