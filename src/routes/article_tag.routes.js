// Article Tags (relación N:M):
// ● POST /api/articles/:articleId/tags/:tagId → Agregar etiqueta a artículo. (solo autor
// o admin)
// ● DELETE /api/articles/:articleId/tags/:tagId → Remover etiqueta de artículo. (solo
// autor o admin)

import { Router } from "express";

//CONTROLADORES
import {
  addTagToArticle,
  removeTagFromArticle,
} from "../controllers/article_tag.controller.js";

//MIDDLEWARES
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { articleOwnerAdminMiddleware } from "../middlewares/articleOwnerOrAdmin.js";

import {
  addTagToArticleValidations,
  removeTagFromArticleValidations,
} from "../middlewares/validations/article_tag.validations.js";
import { applyValidations } from "../middlewares/validator.js";

const articleTagRoutes = Router();

//ENDPOINTS
articleTagRoutes.post(
  "/articles/:articleId/tags/:tagId",
  authMiddleware,
  articleOwnerAdminMiddleware,
  addTagToArticleValidations,
  applyValidations,
  addTagToArticle
);

articleTagRoutes.delete(
  "/articles/:articleId/tags/:tagId",
  authMiddleware,
  articleOwnerAdminMiddleware,
  removeTagFromArticleValidations,
  applyValidations,
  removeTagFromArticle
);

export default articleTagRoutes;
