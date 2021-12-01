import { Request, Response } from "express";

import { httpCodes } from "../const";
import { ToDoElement } from "../models/list";
import { listValidator } from "./validators";

export const getList = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;

    const toDoElements = await ToDoElement.find({
      user: userId,
    }).select(["userId", "description", "_id"]);

    return res.send({
      data: toDoElements,
    });
  } catch (err) {
    res.status(httpCodes.internalError).json({
      message: err.message,
    });
  }
};

export const createElement = async (req: Request, res: Response) => {
  try {
    const { userId, description } = req.body;

    if (!description) {
      res
        .status(httpCodes.badRequest)
        .json({ message: "Description required" });
    }

    const newTodoElement = new ToDoElement({
      user: userId,
      description,
    });

    newTodoElement.save();
    return res.status(httpCodes.created).json({ message: "Created" });
  } catch (err) {
    res.status(httpCodes.internalError).json({ message: err.message });
  }
};

export const updateElement = async (req: Request, res: Response) => {
  try {
    const { value, error } = listValidator.validate(req.body);
    if (error) {
      return res.status(httpCodes.badRequest).json({
        message: error.message,
      });
    }
    const { description, elementId } = value;
    const listElement = await ToDoElement.findOne({
      _id: elementId,
    });

    if (!listElement) {
      return res.status(httpCodes.notFound).json({
        message: "Element not found",
      });
    }

    listElement.description = description;
    listElement.save();

    res.status(httpCodes.ok).json("Element updated");
  } catch (err) {
    res.status(httpCodes.internalError).json({ message: err.message });
  }
};

export const deleteElement = async (req: Request, res: Response) => {
  try {
    const { elementId } = req.query;

    if (!elementId) {
      return res.status(httpCodes.badRequest).json({
        message: "Element required",
      });
    }
    const listElement = await ToDoElement.findOneAndRemove({
      _id: elementId,
    });

    if (!listElement) {
      return res.status(httpCodes.notFound).json({
        message: "Element not found",
      });
    }

    res.status(httpCodes.ok).json({
      message: "Element deleted",
    });
  } catch (err) {
    res.status(httpCodes.internalError).json({ message: err.message });
  }
};
