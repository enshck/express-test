import { Request, Response } from "express";

export const register = async (req: Request, res: Response) => {
  console.log(req.body);
  res.send("Register");
};

export const login = async (req: Request, res: Response) => {
  res.send("Login");
};
