import { Router } from "express";
import { login, register } from "../controllers/auth.controller.js";

const authRoutes = Router();

authRoutes.post("/auth/register", register);

authRoutes.post("/auth/login", login);

authRoutes.post("/auth/logout", logout);

export default authRoutes;
