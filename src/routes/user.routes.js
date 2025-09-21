import Router from "express";

//CONTROLADORES
import {
  deleteUser,
  getAllUsersWithArticles,
  getUserWithArticlesAndComments,
  updateUser,
} from "../controllers/user.controller.js";

//MIDDLEWARES
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";
import {
  getUserWithArticlesAndCommentsValidations,
  updateUserValidations,
  deleteUserValidations,
} from "../middlewares/validations/user.validations.js";
import { applyValidations } from "../middlewares/validator.js";

const userRoutes = Router();

//ENDPOINTS
userRoutes.get(
  "/users",
  authMiddleware,
  adminMiddleware,
  getAllUsersWithArticles
);

userRoutes.get(
  "/users/:id",
  authMiddleware,
  adminMiddleware,
  getUserWithArticlesAndCommentsValidations,
  applyValidations,
  getUserWithArticlesAndComments
);

userRoutes.put(
  "/users/:id",
  authMiddleware,
  adminMiddleware,
  updateUserValidations,
  applyValidations,
  updateUser
);

userRoutes.delete(
  "/users/:id",
  authMiddleware,
  adminMiddleware,
  deleteUserValidations,
  applyValidations,
  deleteUser
);

export default userRoutes;
