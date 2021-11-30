import { joinPath } from "../../utils/path";
import defaultVariables from "../../config/variables";

const { defaultUrl } = defaultVariables;

enum BasicRoutes {
  USER = "user",
  LIST = "list",
}

export const usersPaths = {
  login: joinPath(defaultUrl, BasicRoutes.USER, "login"),
  register: joinPath(defaultUrl, BasicRoutes.USER, "registration"),
  refreshToken: joinPath(defaultUrl, BasicRoutes.USER, "refreshToken"),
};

export const listPaths = {
  getList: joinPath(defaultUrl, BasicRoutes.LIST, "getList"),
  createElement: joinPath(defaultUrl, BasicRoutes.LIST, "createElement"),
  updateElement: joinPath(defaultUrl, BasicRoutes.LIST, "updateElement"),
  deleteElement: joinPath(defaultUrl, BasicRoutes.LIST, "deleteElement"),
};
