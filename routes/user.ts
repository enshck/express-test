import { Express } from "express";

import { usersPaths } from "./const/paths";
import {
  login,
  register,
  refreshAccessToken,
} from "../controllers/userController";

export default (app: Express) => {
  /**
   * POST /api/user/login
   * @tags User
   * @param {string} userName.form.required - user`s name - application/x-www-form-urlencoded
   * @param {string} password.form.required - user`s password - application/x-www-form-urlencoded
   * @return {User} 200 - Success response - application/json
   * @return {Error} 400 - Required fields are not filled - application/json
   * @return {Error} 404 - User not found - application/json
   * @return {Error} 401 - Invalid Credentials - application/json
   * @return {Error} 500 - Something went wrong - application/json
   * @example response - 200 - example success response
   * {
   *   "userName": "string",
   *   "accessToken": "string",
   *   "refreshToken": "string"
   * }
   * @example response - 400 - Required fields are not filled
   * {
   *   "message": "string"
   * }
   * @example response - 401 - Invalid Credentials
   * {
   *   "message": "string"
   * }
   * @example response - 404 - User not found
   * {
   *   "message": "string"
   * }
   * @example response - 500 - Something went wrong
   * {
   *   "message": "string"
   * }
   */
  app.post(usersPaths.login, login);

  /**
   * POST /api/user/register
   * @tags User
   * @param {string} userName.form.required - user`s name - application/x-www-form-urlencoded
   * @param {string} password.form.required - user`s password - application/x-www-form-urlencoded
   * @return {User} 200 - Success response - application/json
   * @return {Error} 400 - Required fields are not filled - application/json
   * @return {Error} 404 - User not found - application/json
   * @return {Error} 500 - Something went wrong - application/json
   * @example response - 200 - example success response
   * {
   *   "userName": "string",
   *   "accessToken": "string",
   *   "refreshToken": "string"
   * }
   * @example response - 400 - Required fields are not filled
   * {
   *   "message": "string"
   * }
   * @example response - 404 - User not found
   * {
   *   "message": "string"
   * }
   * @example response - 500 - Something went wrong
   * {
   *   "message": "string"
   * }
   */
  app.post(usersPaths.register, register);

  /**
   * POST /api/user/refreshToken
   * @tags User
   * @param {string} authorization.header.required - expired access token
   * @param {string} refreshToken.form.required - refreshToken - application/x-www-form-urlencoded
   * @return {RefreshToken} 200 - Tokens has been updated succesfuly - application/json
   * @return {Error} 400 - Required fields are not filled - application/json
   * @return {Error} 401 - Invalid tokens - application/json
   * @return {Error} 500 - Something went wrong - application/json
   * @example response - 200 - example success response
   * {
   *   "accessToken": "string",
   *   "refreshToken": "string"
   * }
   * @example response - 400 - Required fields are not filled
   * {
   *   "message": "string"
   * }
   * @example response - 401 - Invalid tokens
   * {
   *   "message": "string"
   * }
   * @example response - 500 - Something went wrong
   * {
   *   "message": "string"
   * }
   */
  app.post(usersPaths.refreshToken, refreshAccessToken);
};
