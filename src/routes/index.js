import { Router } from "express";
import userRoutes from "./auth.routes.js";

const routes = Router();

//RUTAS DE USER
routes.use(userRoutes);

export default routes;
