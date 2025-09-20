import { Router } from "express";

//CONTROLADORES
import {
  login,
  register,
  logout,
  updateAuthProfile,
  getAuthProfile,
} from "../controllers/auth.controller.js";

//MIDDLEWARES
import { authMiddleware } from "../middlewares/authMiddleware.js";

const authRoutes = Router();

//ENDPOINTS
authRoutes.post("/auth/register", register);

authRoutes.post("/auth/login", login);

authRoutes.post("/auth/logout", authMiddleware, logout);

authRoutes.get("/auth/profile", authMiddleware, getAuthProfile);

authRoutes.put("/auth/profile", authMiddleware, updateAuthProfile);

export default authRoutes;
