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
   * @tags List
   * @param {string} authorization.header.required - user's token - string
   * @return {GetList} 200 - Success response - application/json
   * @return {Error} 401 - Invalid Token - application/json
   * @return {Error} 500 - Something went wrong - application/json
   * @example response - 200 - example success response
   * {
   *   "elements": [
   *      {
   *        "description": "string",
   *        "_id": "string"
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

  /**
   * POST /api/list/createElement
   * @tags List
   * @param {string} authorization.header.required - user's token - string
   * @param {string} description.form.required - description for new element - application/x-www-form-urlencoded
   * @return {ResponseWithCode} 200 - Success created - application/json
   * @return {Error} 400 - Bad Request - application/json
   * @return {Error} 401 - Invalid Token - application/json
   * @return {Error} 500 - Something went wrong - application/json
   * @example response - 200 - Successful created
   * {
   *   "message": "Created"
   * }
   * @example response - 400 - Bad Request
   * {
   *   "message": "string"
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
  app.post(listPaths.createElement, auth, createElement);

  /**
   * DELETE /api/list/deleteElement
   * @tags List
   * @param {string} authorization.header.required - user's token - string
   * @param {string} elementId.query.required - id of todo item
   * @return {ResponseWithCode} 200 - Success deleted - application/json
   * @return {Error} 400 - Bad Request - application/json
   * @return {Error} 401 - Invalid Token - application/json
   * @return {Error} 404 - Element Not Found - application/json
   * @return {Error} 500 - Something went wrong - application/json
   * @example response - 200 - Successful deleted
   * {
   *   "message": "Element deleted"
   * }
   * @example response - 400 - Bad Request
   * {
   *   "message": "string"
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
  app.delete(listPaths.deleteElement, auth, deleteElement);

  /**
   * PUT /api/list/updateElement
   * @tags List
   * @param {string} authorization.header.required - user's token - string
   * @param {string} elementId.form.required - id of todo item - application/x-www-form-urlencoded
   * @param {string} description.form.required - description for update element - application/x-www-form-urlencoded
   * @return {ResponseWithCode} 200 - Success created - application/json
   * @return {Error} 400 - Bad Request - application/json
   * @return {Error} 401 - Invalid Token - application/json
   * @return {Error} 404 - Element Not Found - application/json
   * @return {Error} 500 - Something went wrong - application/json
   * @example response - 200 - Successful deleted
   * {
   *   "message": "Element updated"
   * }
   * @example response - 400 - Bad Request
   * {
   *   "message": "string"
   * }
   * @example response - 404 - Element Not Found
   * {
   *   "message": "string"
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
  app.put(listPaths.updateElement, auth, updateElement);
};
