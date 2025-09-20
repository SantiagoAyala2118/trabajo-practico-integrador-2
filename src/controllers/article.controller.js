import { ArticleModel } from "../models/article.model.js";

export const createArticle = async (req, res) => {
  const { title, content, excerpt, status, author, tags } = req.body;
  try {
    const article = await ArticleModel.create({
      title,
      content,
      excerpt,
      status,
      author,
      tags,
    });

    if (article) {
      return res.status(201).json({
        ok: true,
        message: "Article created",
        Article: article,
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

export const getAllArticles = async (req, res) => {
  try {
    const articles = await ArticleModel.find()
      .populate("author", " username email role") //populate para traer ek autot
      .populate("tags", " name description"); //populate para traer los tags

    return res.status(200).json({
      ok: true,
      message: "Articles founded",
      Articles: articles,
    });
  } catch (err) {
    console.error("Server error", err);
    return res.status(500).json({
      ok: false,
      message: "Server error",
    });
  }
};

export const getArticle = async (req, res) => {
  const { id } = req.params;
  try {
    const article = await ArticleModel.findById(id)
      .populate("author", " username email role")
      .populate("tags", " name description")
      .populate("comments", "content");

    return res.status(200).json({
      ok: true,
      message: "Article founded",
      Article: article,
    });
  } catch (err) {
    console.error("Server error", err);
    return res.status(500).json({
      ok: false,
      message: "Server error",
    });
  }
};

export const getUserLoggedArticles = async (req, res) => {
  const userLogged = req.userLogged;
  try {
    const userLoggedArticle = await ArticleModel.find({
      author: userLogged.id,
    });

    if (userLoggedArticle) {
      return res.status(200).json({
        ok: true,
        message: "User logged articles founded",
        Articles: userLoggedArticle,
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

export const updateArticle = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedArticle = await ArticleModel.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    if (updateArticle) {
      return res.status(200).json({
        ok: true,
        message: "Article updated",
        Article: updatedArticle,
      });
    }
  } catch (err) {
    console.error("Server error", err);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const deleteArticle = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedArticle = await ArticleModel.findByIdAndDelete(id, {
      new: true,
    });

    if (deletedArticle) {
      return res.status(200).json({
        ok: true,
        message: "Article deleted",
      });
    }
  } catch (err) {
    console.error("Server error", err);
    return res.status(500).json({
      message: "Server error",
    });
  }
};
