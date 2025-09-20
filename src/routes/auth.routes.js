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
import {
  registerValidations,
  updateAuthProfileValidations,
} from "../middlewares/validations/auth.validations.js";
import { applyValidations } from "../middlewares/validator.js";

const authRoutes = Router();

//ENDPOINTS
authRoutes.post(
  "/auth/register",
  registerValidations,
  applyValidations,
  register
);

authRoutes.post("/auth/login", login);

authRoutes.post("/auth/logout", authMiddleware, logout);

authRoutes.get("/auth/profile", authMiddleware, getAuthProfile);

authRoutes.put(
  "/auth/profile",
  authMiddleware,
  updateAuthProfileValidations,
  applyValidations,
  updateAuthProfile
);

export default authRoutes;
