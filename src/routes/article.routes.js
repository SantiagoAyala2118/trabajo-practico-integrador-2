import { Router } from "express";

//CONTROLADORES
import {
  createArticle,
  deleteArticle,
  getAllArticles,
  getArticle,
  getUserLoggedArticles,
  updateArticle,
} from "../controllers/article.controller.js";

//MIDDLEWARES
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { articleOwnerAdminMiddleware } from "../middlewares/articleOwnerOrAdmin.js";

const articleRoutes = Router();

//ENDPOINTS
articleRoutes.post("/articles", authMiddleware, createArticle);

articleRoutes.get("/articles", authMiddleware, getAllArticles);

articleRoutes.get("/articles/my", authMiddleware, getUserLoggedArticles);

articleRoutes.get("/articles/:id", authMiddleware, getArticle);

articleRoutes.put(
  "/articles/:id",
  authMiddleware,
  articleOwnerAdminMiddleware,
  updateArticle
);

articleRoutes.delete(
  "/articles/:id",
  authMiddleware,
  articleOwnerAdminMiddleware,
  deleteArticle
);

export default articleRoutes;
