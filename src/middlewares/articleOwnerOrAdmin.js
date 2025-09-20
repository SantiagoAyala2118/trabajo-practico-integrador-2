import { ArticleModel } from "../models/article.model.js";

export const articleOwnerAdminMiddleware = async (req, res, next) => {
  const userLogged = req.userLogged;
  try {
    if (userLogged.role !== "admin" && ArticleModel.author !== userLogged.id) {
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
