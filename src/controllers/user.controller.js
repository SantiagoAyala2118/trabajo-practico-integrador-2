import { UserModel } from "../models/user.model.js";
import { ArticleModel } from "../models/article.model.js";
import { CommentModel } from "../models/comment.model.js";
import { matchedData } from "express-validator";

export const getAllUsersWithArticles = async (req, res) => {
  try {
    const users = await UserModel.find().populate({
      path: "articles",
      select: "title status _id",
    });

    if (!users) {
      return res.status(404).json({
        ok: false,
        message: "No users founded",
      });
    }

    return res.status(200).json({
      ok: true,
      message: "Users founded",
      users: users,
    });
  } catch (err) {
    console.error("Server error", err);
    return res.status(500).json({
      ok: false,
      message: "Server error",
    });
  }
};

export const getUserWithArticlesAndComments = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findById(id).populate({
      path: "articles",
      select: "title status _id",
      populate: {
        path: "comments",
        select: "content author",
      },
    });

    return res.status(200).json({
      ok: true,
      message: "User found",
      User: user,
    });
  } catch (err) {
    console.error("Server error", err);
    return res.status(500).json({
      ok: false,
      message: "Server error",
    });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const validatedData = matchedData(req, { locations: ["body"] });

    if (Object.keys(validatedData).length === 0) {
      return res.status(400).json({
        ok: false,
        message: "Nothing to update",
      });
    }

    const updateUser = await UserModel.findByIdAndUpdate(
      id,
      { $set: validatedData },
      { new: true }
    );

    return res.status(200).json({
      ok: true,
      message: "User updated",
      user: updateUser,
    });
  } catch (err) {
    console.error("Server error", err);
    return res.status(500).json({
      ok: false,
      message: "Server error",
    });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await UserModel.findByIdAndUpdate(
      id,
      {
        $set: { deletedAt: new Date() },
      },
      { new: true }
    );

    if (deletedUser) {
      return res.status(200).json({
        ok: true,
        message: "User deleted",
      });
    }
  } catch (err) {
    console.error("Server error", err);
    return res.status(500).json({
      ok: false,
      message: "Server error",
    });
  }
};
