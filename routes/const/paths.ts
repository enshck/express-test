import { joinPath } from "../../utils/path";
import defaultVariables from "../../config/variables";

const { defaultUrl } = defaultVariables;

enum BasicRoutes {
  USER = "user",
}

export const usersPaths = {
  login: joinPath(defaultUrl, BasicRoutes.USER, "login"),
  register: joinPath(defaultUrl, BasicRoutes.USER, "registration"),
};
