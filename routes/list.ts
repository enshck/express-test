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
  /**
   * GET /api/list/getList
   * @tags GetList
   * @param {string} authorization.header.required - user's token - string
   * @return {GetList} 200 - Success response - application/json
   * @return {Error} 401 - Invalid Token - application/json
   * @return {Error} 500 - Something went wrong - application/json
   * @example response - 200 - example success response
   * {
   *   "elements": [
   *      {
   *        "description": "123",
   *        "_id": "61a63a15458919aefbbce193"
   *      }
   *   ]
   * }
   * @example response - 401 - Invalid Credentials
   * {
   *   "message": "string"
   * }
   * @example response - 500 - Internal Server Error
   * {
   *   "message": "string"
   * }
   */
  app.get(listPaths.getList, auth, getList);
  app.post(listPaths.createElement, auth, createElement);
  app.delete(listPaths.deleteElement, auth, deleteElement);
  app.put(listPaths.updateElement, auth, updateElement);
};
