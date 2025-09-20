import Router from "express";
import {
  deleteUser,
  getAllUsersWithArticles,
  getUserWithArticlesAndComments,
  updateUser,
} from "../controllers/user.controller.js";

const userRoutes = Router();

userRoutes.get("/users", getAllUsersWithArticles);
userRoutes.get("/users/:id", getUserWithArticlesAndComments);
userRoutes.put("/users/:id", updateUser);
userRoutes.delete("/users/:id", deleteUser);

export default userRoutes;
