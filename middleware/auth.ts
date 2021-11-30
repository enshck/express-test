import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { httpCodes } from "../const";
import variables from "../config/variables";
import User from "../models/users";

export default async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(httpCodes.unAuthorized).json("Authorization required");
  }

  try {
    jwt.verify(token, variables.jwtEncryptionKey);

    const user = await User.findOne({ accessToken: token });

    if (!user) {
      return res.status(httpCodes.notFound).json({ message: "User not found" });
    }

    req.body.userId = user._id.toString();
  } catch (err) {
    return res
      .status(httpCodes.unAuthorized)
      .json({ message: "Invalid Token" });
  }
  next();
};
