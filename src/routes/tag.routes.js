import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  createTag,
  deleteTag,
  getAllTags,
  getTag,
  updateTag,
} from "../controllers/tag.controller.js";

const tagRoutes = Router();

tagRoutes.post("/tags", createTag);

tagRoutes.get("/tags", authMiddleware, getAllTags);

tagRoutes.get("/tags/:id", authMiddleware, getTag);

tagRoutes.put("/tags/:id", updateTag);

tagRoutes.delete("/tags/:id", deleteTag);

export default tagRoutes;
