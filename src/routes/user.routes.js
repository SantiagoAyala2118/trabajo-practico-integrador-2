import Router from "express";
import {
  getAllUsersWithArticles,
  getUserWithArticlesAndComments,
} from "../controllers/user.controller.js";

const userRoutes = Router();

userRoutes.get("/users", getAllUsersWithArticles);
userRoutes.get("/users/:id", getUserWithArticlesAndComments);
// userRoutes.put("/users/:id");
// userRoutes.delete("/users/:id");

export default userRoutes;
