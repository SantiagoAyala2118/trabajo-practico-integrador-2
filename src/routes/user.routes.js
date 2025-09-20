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

const userRoutes = Router();

//ENDPOINTS
userRoutes.get("/users", adminMiddleware, getAllUsersWithArticles);

userRoutes.get("/users/:id", adminMiddleware, getUserWithArticlesAndComments);

userRoutes.put("/users/:id", adminMiddleware, updateUser);

userRoutes.delete("/users/:id", adminMiddleware, deleteUser);

export default userRoutes;
