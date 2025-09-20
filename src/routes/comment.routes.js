import Router from "express";

//CONTROLADORES
import {
  createComment,
  deleteComment,
  getArticleComments,
  getUserLoggedComments,
  updateComment,
} from "../controllers/comment.controller.js";

//MIDDLEWARES
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { commentOwnerAdminMiddleware } from "../middlewares/commentOwnerOrAdmin.js";

const commentRoutes = Router();

//ENDPOINTS
commentRoutes.post("/comments", authMiddleware, createComment);

commentRoutes.get(
  "/comments/article/:articleId",
  authMiddleware,
  getArticleComments
);

commentRoutes.get("/comments/my", authMiddleware, getUserLoggedComments);

commentRoutes.put(
  "/comments/:id",
  authMiddleware,
  commentOwnerAdminMiddleware,
  updateComment
);

commentRoutes.delete(
  "/comments/:id",
  authMiddleware,
  commentOwnerAdminMiddleware,
  deleteComment
);

export default commentRoutes;
