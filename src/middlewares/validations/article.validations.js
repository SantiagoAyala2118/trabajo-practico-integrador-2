import { body, param } from "express-validator";
import { ArticleModel } from "../../models/article.model.js";
import { UserModel } from "../../models/user.model.js";
import { TagModel } from "../../models/tag.model.js";

export const createArticleValidations = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title cannot be empty")
    .isString()
    .withMessage("Title must be a string")
    .isLength({ min: 3, max: 200 })
    .withMessage(
      "Title must contain at least 3 characters and a maximum of 200"
    ),
  body("content")
    .trim()
    .notEmpty()
    .withMessage("Content cannot be empty")
    .isString()
    .withMessage("Content must be a string")
    .isLength({ min: 50 })
    .withMessage("Content must contain at least 50 characters"),
  body("excerpt")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Excerpt cannot be empty")
    .isString()
    .withMessage("Excerpt must be a string")
    .isLength({ max: 500 })
    .withMessage("Excerpt's maximum is 500 character"),
  body("status")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Status cannot be empty")
    .isString()
    .withMessage("Status must be a string")
    .isIn(["published", "archived"])
    .withMessage("Status must be published or archived"),
  body("author")
    .trim()
    .notEmpty()
    .withMessage("Author cannot be empty")
    .isString()
    .withMessage("Author must be a string")
    .isLength({ min: 1, max: 24 })
    .withMessage("Author must be an alphanumeric of 24 characters")
    .custom(async (author) => {
      try {
        const authorExisting = await UserModel.findOne({
          $and: [{ _id: author }, { deletedAt: null }],
        });

        if (!authorExisting) {
          return Promise.reject("Author not founded");
        }
      } catch (err) {
        console.error("Error checking the existency of the author", err);
        return Promise.reject("Error checking the existency of the author");
      }
    }),
  body("tags")
    .trim()
    .notEmpty()
    .withMessage("Tagss cannot be empty")
    .isArray({ min: 1 })
    .withMessage("Tags must be an array with at least one element")
    .custom(async (tags) => {
      try {
        const tagsExisting = await TagModel.find({
          _id: { $in: tags },
        });

        if (tagsExisting.length !== tags.length) {
          return Promise.reject("Some tags does not exist");
        }
      } catch (err) {
        console.error("Error checking the existency of the tags", err);
        return Promise.reject("Error checking the existency of the tags");
      }
    }),
];

export const getArticleByIdValidations = [
  param("id")
    .trim()
    .isLength({ min: 1, max: 24 })
    .withMessage("Id must be an alphanumeric with at least 24 characters")
    .custom(async (id) => {
      try {
        const articleExisting = await ArticleModel.findById(id);

        if (!articleExisting) {
          return Promise.reject("Article not founded");
        }
      } catch (err) {
        console.error("Error checking the existency of the article", err);
        return Promise.reject("Error checking the existency of the article");
      }
    }),
];

export const updateArticleValidations = [
  param("id")
    .trim()
    .isLength({ min: 1, max: 24 })
    .withMessage("Id must be an alphanumeric with at least 24 characters")
    .custom(async (id) => {
      try {
        const articleExisting = await ArticleModel.findById(id);

        if (!articleExisting) {
          return Promise.reject("Article not founded");
        }
      } catch (err) {
        console.error("Error checking the existency of the article", err);
        return Promise.reject("Error checking the existency of the article");
      }
    }),
  body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Title cannot be empty")
    .isString()
    .withMessage("Title must be a string")
    .isLength({ min: 3, max: 200 })
    .withMessage(
      "Title must contain at least 3 characters and a maximum of 200"
    ),
  body("content")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Content cannot be empty")
    .isString()
    .withMessage("Content must be a string")
    .isLength({ min: 50 })
    .withMessage("Content must contain at least 50 characters"),
  body("excerpt")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Excerpt cannot be empty")
    .isString()
    .withMessage("Excerpt must be a string")
    .isLength({ max: 500 })
    .withMessage("Excerpt's maximum is 500 character"),
  body("status")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Status cannot be empty")
    .isString()
    .withMessage("Status must be a string")
    .isIn(["published", "archived"])
    .withMessage("Status must be published or archived"),
  body("author")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Author cannot be empty")
    .isString()
    .withMessage("Author must be a string")
    .isLength({ min: 1, max: 24 })
    .withMessage("Author must be an alphanumeric of 24 characters")
    .custom(async (author) => {
      try {
        const authorExisting = await UserModel.findOne({
          $and: [{ _id: author }, { deletedAt: null }],
        });

        if (!authorExisting) {
          return Promise.reject("Author not founded");
        }
      } catch (err) {
        console.error("Error checking the existency of the author", err);
        return Promise.reject("Error checking the existency of the author");
      }
    }),
  body("tags")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Tagss cannot be empty")
    .isString()
    .withMessage("Tag must be a string")
    .isArray({ min: 1 })
    .withMessage("Tags must be an array with at least one element")
    .custom(async (tags) => {
      try {
        const tagsExisting = await TagModel.find({
          _id: { $in: tags },
        });

        if (tagsExisting.length !== tags.length) {
          return Promise.reject("Some tags does not exist");
        }
      } catch (err) {
        console.error("Error checking the existency of the tags", err);
        return Promise.reject("Error checking the existency of the tags");
      }
    }),
];

export const deleteArticleValidations = [
  param("id")
    .trim()
    .isLength({ min: 1, max: 24 })
    .withMessage("Id must be an alphanumeric with at least 24 characters")
    .custom(async (id) => {
      try {
        const articleExisting = await ArticleModel.findById(id);

        if (!articleExisting) {
          return Promise.reject("Article not founded");
        }
      } catch (err) {
        console.error("Error checking the existency of the article", err);
        return Promise.reject("Error checking the existency of the article");
      }
    }),
];
