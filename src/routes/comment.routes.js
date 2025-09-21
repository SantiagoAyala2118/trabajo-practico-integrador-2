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

import {
  createCommentValidations,
  getArticleCommentsValidations,
  updateCommentValidations,
  deleteCommentValidations,
} from "../middlewares/validations/comment.validations.js";
import { applyValidations } from "../middlewares/validator.js";

const commentRoutes = Router();

//ENDPOINTS
commentRoutes.post(
  "/comments",
  authMiddleware,
  createCommentValidations,
  applyValidations,
  createComment
);

commentRoutes.get(
  "/comments/article/:articleId",
  authMiddleware,
  getArticleCommentsValidations,
  applyValidations,
  getArticleComments
);

commentRoutes.get("/comments/my", authMiddleware, getUserLoggedComments);

commentRoutes.put(
  "/comments/:id",
  authMiddleware,
  commentOwnerAdminMiddleware,
  updateCommentValidations,
  applyValidations,
  updateComment
);

commentRoutes.delete(
  "/comments/:id",
  authMiddleware,
  commentOwnerAdminMiddleware,
  deleteCommentValidations,
  applyValidations,
  deleteComment
);

export default commentRoutes;
