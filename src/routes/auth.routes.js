import { Router } from "express";
import { register } from "../controllers/auth.controller.js";

const userRoutes = Router();

userRoutes.post("/register", register);

export default userRoutes;
