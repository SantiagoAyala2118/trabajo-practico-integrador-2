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
import {
  createTagValidations,
  getTagValidations,
  updateTagValidations,
  deleteTagValidations,
} from "../middlewares/validations/tag.validations.js";
import { applyValidations } from "../middlewares/validator.js";

const tagRoutes = Router();

//ENDPOINTS
tagRoutes.post(
  "/tags",
  authMiddleware,
  adminMiddleware,
  createTagValidations,
  applyValidations,
  createTag
);

tagRoutes.get("/tags", authMiddleware, getAllTags);

tagRoutes.get(
  "/tags/:id",
  authMiddleware,
  getTagValidations,
  applyValidations,
  getTag
);

tagRoutes.put(
  "/tags/:id",
  adminMiddleware,
  updateTagValidations,
  applyValidations,
  updateTag
);

tagRoutes.delete(
  "/tags/:id",
  authMiddleware,
  adminMiddleware,
  deleteTagValidations,
  applyValidations,
  deleteTag
);

export default tagRoutes;
