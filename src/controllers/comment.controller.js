import { CommentModel } from "../models/comment.model.js";

export const createComment = async (req, res) => {
  const { content, author, article } = req.body;
  try {
    const newComment = await CommentModel.create({ content, author, article });

    if (newComment) {
      return res.status(201).json({
        ok: true,
        message: "Comment created",
        comment: newComment,
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

export const getArticleComments = async (req, res) => {
  const { articleId } = req.params;
  try {
    const comments = await CommentModel.find({ article: articleId }).populate(
      "author",
      "username email"
    );

    return res.status(200).json({
      ok: true,
      message: "Comments founded",
      Comments: comments,
    });
  } catch (err) {
    console.error("Server error", err);
    return res.status(500).json({
      ok: false,
      message: "Server error",
    });
  }
};

export const getUserLoggedComments = async (req, res) => {
  const userLogged = req.userLogged;
  try {
    const userComments = await CommentModel.find({
      author: userLogged.id,
    });

    return res.status(200).json({
      ok: true,
      message: "User comments founded",
      Comments: userComments,
    });
  } catch (err) {
    console.error("Server error", err);
    return res.status(500).json({
      ok: false,
      message: "Server error",
    });
  }
};

export const updateComment = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedComment = await CommentModel.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );

    return res.status(200).json({
      ok: true,
      message: "Comment updated",
      Comment: updatedComment,
    });
  } catch (err) {
    console.error("Server error", err);
    return res.status(500).json({
      ok: false,
      message: "Server error",
    });
  }
};

export const deleteComment = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedComment = await CommentModel.findByIdAndDelete(id, {
      new: true,
    });

    return res.status(200).json({
      ok: true,
      message: "Comment updated",
      Comment: deletedComment,
    });
  } catch (err) {
    console.error("Server error", err);
    return res.status(500).json({
      ok: false,
      message: "Server error",
    });
  }
};
