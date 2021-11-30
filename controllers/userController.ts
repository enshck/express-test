import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/users";
import {
  userValidator,
  refreshTokenValidator,
} from "../controllers/validators";
import { httpCodes } from "../const";
import variables from "../config/variables";
import getCoupleTokens from "../utils/getCoupleTokens";

export const register = async (req: Request, res: Response) => {
  try {
    const { error, value } = userValidator.validate(req.body);

    if (error) {
      return res.status(httpCodes.badRequest).json({ message: error.message });
    }

    const { userName, password } = value;

    const user = await User.findOne({ userName });

    if (user) {
      return res
        .status(httpCodes.badRequest)
        .json({ message: "User already exist" });
    }

    const hashOfPassword = await bcrypt.hash(password, 10);

    const newUser = await new User({
      userName,
      password: hashOfPassword,
    });

    const { accessToken, refreshToken } = getCoupleTokens({
      userId: newUser._id,
      userName,
    });

    newUser.accessToken = accessToken;
    newUser.refreshToken = refreshToken;

    await newUser.save();

    res.send({
      userName,
      accessToken,
      refreshToken,
    });
  } catch (err) {
    res.status(httpCodes.internalError).json({ message: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { error, value } = userValidator.validate(req.body);

    if (error) {
      return res.status(httpCodes.badRequest).json({ message: error.message });
    }

    const { userName, password } = value;

    const user = await User.findOne({ userName });

    if (!user) {
      return res.status(httpCodes.notFound).json({ message: "User not found" });
    }

    const isTruthPassword = await bcrypt.compare(password, user.password);

    if (isTruthPassword) {
      const { accessToken, refreshToken } = getCoupleTokens({
        userId: user._id,
        userName,
      });

      user.accessToken = accessToken;
      user.refreshToken = refreshToken;

      await user.save();

      return res.send({
        userName,
        accessToken,
        refreshToken,
      });
    }

    res.status(httpCodes.unAuthorized).json("Invalid Credentials");
  } catch (err) {
    res.status(httpCodes.internalError).json({ message: err.message });
  }
};

export const refreshAccessToken = async (req: Request, res: Response) => {
  try {
    const { error, value } = refreshTokenValidator.validate(req.body);

    if (error) {
      return res.status(httpCodes.badRequest).json({ message: error.message });
    }
    const { refreshToken } = value;
    const accessToken = req.headers.authorization;

    await jwt.verify(refreshToken, variables.jwtEncryptionKey);

    const accessTokenDecoded: any = await jwt.decode(accessToken);
    const refreshTokenDecoded: any = await jwt.decode(refreshToken);

    if (
      !accessTokenDecoded ||
      !refreshTokenDecoded ||
      accessTokenDecoded?.user_id !== refreshTokenDecoded?.user_id
    ) {
      return res
        .status(httpCodes.unAuthorized)
        .json({ messsage: "Tokens Invalid" });
    }

    const userId = refreshTokenDecoded?.user_id;

    const user = await User.findById(userId);

    if (!user) {
      res.status(httpCodes.notFound).json({ message: "User Not Found" });
    }

    if (
      user.accessToken !== accessToken ||
      user.refreshToken !== refreshToken
    ) {
      return res
        .status(httpCodes.unAuthorized)
        .json({ messsage: "Tokens Invalid" });
    }

    const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
      getCoupleTokens({
        userId: userId,
        userName: user.userName,
      });

    user.accessToken = newAccessToken;
    user.refreshToken = newRefreshToken;

    user.save();

    res.send({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  } catch (err) {
    res.status(httpCodes.internalError).json({ message: err.message });
  }
};
