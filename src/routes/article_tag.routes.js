// Article Tags (relación N:M):
// ● POST /api/articles/:articleId/tags/:tagId → Agregar etiqueta a artículo. (solo autor
// o admin)
// ● DELETE /api/articles/:articleId/tags/:tagId → Remover etiqueta de artículo. (solo
// autor o admin)

import { Router } from "express";

import {
  addTagToArticle,
  removeTagFromArticle,
} from "../controllers/article_tag.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const articleTagRoutes = Router();

articleTagRoutes.post(
  "/articles/:articleId/tags/:tagId",
  authMiddleware,
  addTagToArticle
);

articleTagRoutes.delete(
  "/articles/:articleId/tags/:tagId",
  authMiddleware,
  removeTagFromArticle
);

export default articleTagRoutes;
