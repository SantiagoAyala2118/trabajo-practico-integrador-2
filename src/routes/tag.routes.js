import { Router } from "express";

//CONTROLADORES
import {
  createTag,
  deleteTag,
  getAllTags,
  getTag,
  updateTag,
} from "../controllers/tag.controller.js";

//MIDDLEWARES
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";

const tagRoutes = Router();

//ENDPOINTS
tagRoutes.post("/tags", adminMiddleware, createTag);

tagRoutes.get("/tags", authMiddleware, getAllTags);

tagRoutes.get("/tags/:id", authMiddleware, getTag);

tagRoutes.put("/tags/:id", adminMiddleware, updateTag);

tagRoutes.delete("/tags/:id", adminMiddleware, deleteTag);

export default tagRoutes;
