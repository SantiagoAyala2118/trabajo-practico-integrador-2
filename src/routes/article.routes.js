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

import {
  createArticleValidations,
  getArticleByIdValidations,
  updateArticleValidations,
  deleteArticleValidations,
} from "../middlewares/validations/article.validations.js";

import { applyValidations } from "../middlewares/validator.js";

const articleRoutes = Router();

//ENDPOINTS
articleRoutes.post(
  "/articles",
  authMiddleware,
  createArticleValidations,
  applyValidations,
  createArticle
);

articleRoutes.get("/articles", authMiddleware, getAllArticles);

articleRoutes.get("/articles/my", authMiddleware, getUserLoggedArticles);

articleRoutes.get(
  "/articles/:id",
  authMiddleware,
  getArticleByIdValidations,
  applyValidations,
  getArticle
);

articleRoutes.put(
  "/articles/:id",
  authMiddleware,
  articleOwnerAdminMiddleware,
  updateArticleValidations,
  applyValidations,
  updateArticle
);

articleRoutes.delete(
  "/articles/:id",
  authMiddleware,
  articleOwnerAdminMiddleware,
  deleteArticleValidations,
  applyValidations,
  deleteArticle
);

export default articleRoutes;
