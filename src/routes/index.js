import { Router } from "express";
import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js";

const routes = Router();

//RUTAS DE AUTH
routes.use(authRoutes);

//RUTAS DE USER
routes.use(userRoutes);

export default routes;
