import { CommentModel } from "../models/comment.model.js";

export const commentOwnerAdminMiddleware = async (req, res, next) => {
  const userLogged = req.userLogged;
  try {
    const comment = await CommentModel.findOne({ _id: req.params.id });

    if (userLogged.role !== "admin" && comment.author !== userLogged.id) {
      return res.status(401).json({
        ok: false,
        message: "Cannot access to this source",
      });
    }

    next();
  } catch (err) {
    console.error("Server error", err);
    return res.status(500).json({
      ok: false,
      message: "Server error",
    });
  }
};
