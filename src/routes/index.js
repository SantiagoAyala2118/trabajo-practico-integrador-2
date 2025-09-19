import { Router } from "express";
import userRoutes from "./auth.routes.js";
import authRoutes from "./auth.routes.js";

const routes = Router();

//RUTAS DE AUTH
routes.use(authRoutes);

export default routes;
