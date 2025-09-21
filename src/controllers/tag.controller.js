import { matchedData } from "express-validator";
import { TagModel } from "../models/tag.model.js";

export const createTag = async (req, res) => {
  try {
    const validatedData = matchedData(req);

    const tag = await TagModel.create(validatedData);

    return res.status(201).json({
      ok: true,
      message: "Tag created",
      Tag: tag,
    });
  } catch (err) {
    console.error("Server error", err);
    return res.status(500).json({
      ok: false,
      message: "Server error",
    });
  }
};

export const getAllTags = async (req, res) => {
  try {
    const tags = await TagModel.find();

    if (tags.length === 0) {
      return res.status(404).json({
        ok: false,
        message: "Tags not founded",
      });
    }

    return res.status(200).json({
      ok: true,
      message: "Tags founded",
      Tags: tags,
    });
  } catch (err) {
    console.error("Server error", err);
    return res.status(500).json({
      ok: false,
      message: "Server error",
    });
  }
};

export const getTag = async (req, res) => {
  const { id } = req.params;
  try {
    const tagById = await TagModel.findById(id).populate(
      "articles",
      " title status"
    );

    return res.status(200).json({
      ok: true,
      message: "Tag founded",
      Tag: tagById,
    });
  } catch (err) {
    console.error("Server error", err);
    return res.status(500).json({
      ok: false,
      message: "Server error",
    });
  }
};

export const updateTag = async (req, res) => {
  const { id } = req.params;
  try {
    const validatedData = matchedData(req, { locations: ["body"] });

    if (Object.keys(validatedData) == 0) {
      return res.status(400).json({
        ok: false,
        message: "Nothing to update",
      });
    }

    const updateTag = await TagModel.findByIdAndUpdate(
      id,
      { $set: validatedData },
      { new: true }
    );

    return res.status(200).json({
      ok: true,
      message: "Tag updated",
      Tag: updateTag,
    });
  } catch (err) {
    console.error("Server error", err);
    return res.status(500).json({
      ok: false,
      message: "Server error",
    });
  }
};

export const deleteTag = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteTag = await TagModel.findByIdAndDelete(id, { new: true });

    return res.status(200).json({
      ok: true,
      message: "Tag deleted",
      Tag: deleteTag,
    });
  } catch (err) {
    console.error("Server error", err);
    return res.status(500).json({
      ok: false,
      message: "Server error",
    });
  }
};
