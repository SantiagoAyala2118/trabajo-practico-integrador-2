import { UserModel } from "../models/user.model.js";
import { ArticleModel } from "../models/article.model.js";
import { CommentModel } from "../models/comment.model.js";

export const getAllUsersWithArticles = async (req, res) => {
  try {
    const users = await UserModel.find({ deletedAt: null }).populate({
      path: "articles",
      select: "title status _id",
    });

    if (users) {
      return res.status(200).json({
        ok: true,
        message: "Users founded",
        users: users,
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

export const getUserWithArticlesAndComments = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findOne({ _id: id, deletedAt: null }).populate(
      {
        path: "articles",
        select: "title status _id",
        populate: {
          path: "comments",
          select: "content author",
        },
      }
    );

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
    const updateUser = await UserModel.findByIdAndUpdate(
      id,
      { $set: req.body },
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
