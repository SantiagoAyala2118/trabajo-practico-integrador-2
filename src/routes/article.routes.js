import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  createArticle,
  deleteArticle,
  getAllArticles,
  getArticle,
  getUserLoggedArticles,
  updateArticle,
} from "../controllers/article.controller.js";

const articleRoutes = Router();

articleRoutes.post("/articles", authMiddleware, createArticle);

articleRoutes.get("/articles", authMiddleware, getAllArticles);

articleRoutes.get("/articles/my", authMiddleware, getUserLoggedArticles);

articleRoutes.get("/articles/:id", authMiddleware, getArticle);

articleRoutes.put("/articles/:id", updateArticle);

articleRoutes.delete("/articles/:id", deleteArticle);

export default articleRoutes;
