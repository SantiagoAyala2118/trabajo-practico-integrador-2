import { UserModel } from "../models/user.model.js";
import { ArticleModel } from "../models/article.model.js";
import { CommentModel } from "../models/comment.model.js";

export const getAllUsersWithArticles = async (req, res) => {
  try {
    const users = await UserModel.find().populate({
      path: "articles",
      select: "title status",
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
    const user = await UserModel.findById(id).populate({
      path: "articles",
      select: "title content status ",
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
