import { Express } from "express";

import { listPaths } from "./const/paths";
import {
  createElement,
  deleteElement,
  getList,
  updateElement,
} from "../controllers/listController";
import auth from "../middleware/auth";

export default (app: Express) => {
  app.get(listPaths.getList, auth, getList);
  app.post(listPaths.createElement, auth, createElement);
  app.delete(listPaths.deleteElement, auth, deleteElement);
  app.put(listPaths.updateElement, auth, updateElement);
};
