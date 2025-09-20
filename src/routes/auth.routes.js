import { Router } from "express";
import {
  login,
  register,
  logout,
  updateAuthProfile,
  getAuthProfile,
} from "../controllers/auth.controller.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";

const authRoutes = Router();

authRoutes.post("/auth/register", register);

authRoutes.post("/auth/login", login);

authRoutes.post("/auth/logout", authMiddleware, logout);

authRoutes.get("/auth/profile", authMiddleware, getAuthProfile);

authRoutes.put("/auth/profile", authMiddleware, updateAuthProfile);

export default authRoutes;
