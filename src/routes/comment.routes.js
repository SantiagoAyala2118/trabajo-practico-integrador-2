// Comments:
// // ● POST /api/comments → Crear comentario en artículo. (usuario autenticado)
// // ● GET /api/comments/article/:articleId → Listar comentarios de un artículo con
// // populate de author. (usuario autenticado)
// // ● GET /api/comments/my → Listar comentarios del usuario logueado. (usuario
// // autenticado)
// ● PUT /api/comments/:id → Actualizar comentario (solo autor o admin).
// ● DELETE /api/comments/:id → Eliminación física de comentario (solo autor o
// admin).

import Router from "express";
import {
  createComment,
  deleteComment,
  getArticleComments,
  getUserLoggedComments,
  updateComment,
} from "../controllers/comment.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const commentRoutes = Router();

commentRoutes.post("/comments", authMiddleware, createComment);

commentRoutes.get("/comments/article/:articleId", getArticleComments);

commentRoutes.get("/comments/my", authMiddleware, getUserLoggedComments);

commentRoutes.put("/comments/:id", updateComment);

commentRoutes.delete("/comments/:id", deleteComment);

export default commentRoutes;
