import { Router } from "express";
import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js";
import tagRoutes from "./tag.routes.js";
import articleRoutes from "./article.routes.js";
import commentRoutes from "./comment.routes.js";
import articleTagRoutes from "./article_tag.routes.js";

const routes = Router();

//RUTAS DE AUTH
routes.use(authRoutes);

//RUTAS DE USER
routes.use(userRoutes);

//RUTAS DE TAG
routes.use(tagRoutes);

//RUTAS DE ARTICLE
routes.use(articleRoutes);

//RUTAS DE COMMENT
routes.use(commentRoutes);

//RUTAS DE ARTICLE_TAG
routes.use(articleTagRoutes);

export default routes;
