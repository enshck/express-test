import { Request, Response } from "express";

import { httpCodes } from "../const";
import { List } from "../models/list";
import { listValidator } from "./validators";

export const getList = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;

    const list = await List.findOne({
      userId,
    }).select(["elements._id", "elements.description", "-_id"]);

    if (!list) {
      return res.send({
        userId,
        elements: [],
      });
    }

    return res.send(list);
  } catch (err) {
    res.status(httpCodes.internalError).json({
      message: err.message,
    });
  }
};

export const createElement = async (req: Request, res: Response) => {
  try {
    const { userId, description } = req.body;

    const listElement = await List.findOne({
      userId,
    });

    if (!description) {
      res
        .status(httpCodes.badRequest)
        .json({ message: "Description required" });
    }

    if (!listElement) {
      const newList = new List({
        userId,
        elements: [
          {
            description,
          },
        ],
      });

      await newList.save();

      return res.status(httpCodes.ok).json({ message: "Created" });
    }

    listElement.elements.push({ description });

    await listElement.save();

    return res.status(httpCodes.created).json({ message: "Created" });
  } catch (err) {
    res.status(httpCodes.internalError).json({ message: err.message });
  }
};

export const updateElement = async (req: Request, res: Response) => {
  try {
    const { value, error } = listValidator.validate(req.body);

    if (error) {
      res.status(httpCodes.badRequest).json({
        message: error.message,
      });
    }

    const { userId, description, elementId } = value;

    const listElement = await List.findOne({
      userId,
    });

    const changedElement = listElement.elements.id(elementId);

    if (!changedElement) {
      return res.status(httpCodes.notFound).json({
        message: "Element not found",
      });
    }

    changedElement.description = description;
    listElement.save();

    res.status(httpCodes.ok).json("Element updated");
  } catch (err) {
    res.status(httpCodes.internalError).json({ message: err.message });
  }
};

export const deleteElement = async (req: Request, res: Response) => {
  try {
    const { elementId } = req.query;
    const { userId } = req.body;

    if (!elementId) {
      return res.status(httpCodes.badRequest).json({
        message: "Element required",
      });
    }

    const listElement = await List.findOne({
      userId,
    });

    const changedElement = listElement.elements.id(elementId);

    if (!changedElement) {
      return res.status(httpCodes.notFound).json({
        message: "Element not found",
      });
    }

    changedElement.remove();
    listElement.save();

    res.status(httpCodes.ok).json("Element deleted");
  } catch (err) {
    res.status(httpCodes.internalError).json({ message: err.message });
  }
};
