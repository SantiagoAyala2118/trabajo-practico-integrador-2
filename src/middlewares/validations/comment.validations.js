import { body, param } from "express-validator";
import { CommentModel } from "../../models/comment.model.js";
import { UserModel } from "../../models/user.model.js";
import { ArticleModel } from "../../models/article.model.js";

export const createCommentValidations = [
  body("content")
    .trim()
    .notEmpty()
    .withMessage("Content cannot be empty")
    .isString()
    .withMessage("Content must be a string")
    .isLength({ min: 5, max: 500 })
    .withMessage(
      "Content must have at least 5 characters and a maximum of 500"
    ),
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
  body("article")
    .trim()
    .notEmpty()
    .withMessage("Article cannot be empty")
    .isString()
    .withMessage("Article must be a string")
    .isLength({ min: 1, max: 24 })
    .withMessage("Article must be an alphanumeric of 24 characters")
    .custom(async (article) => {
      try {
        const articleExisting = await ArticleModel.findOne({ _id: article });

        if (!articleExisting) {
          return Promise.reject("Article not founded");
        }
      } catch (err) {
        console.error("Error checking the existency of the article", err);
        return Promise.reject("Error checking the existency of the article");
      }
    }),
];

export const getArticleCommentsValidations = [
  param("articleId")
    .trim()
    .isLength({ min: 1, max: 24 })
    .withMessage("ArticleId must be an aplhanumeric with 24 characters")
    .custom(async (articleId) => {
      try {
        const articleExisting = await ArticleModel.findOne({ _id: articleId });

        if (!articleExisting) {
          return Promise.reject("Article not founded");
        }
      } catch (err) {
        console.error("Error checking the existency of the article", err);
        return Promise.reject("Error checking the existency of the article");
      }
    }),
];

export const updateCommentValidations = [
  param("id")
    .trim()
    .isLength({ min: 1, max: 24 })
    .withMessage("ArticleId must be an aplhanumeric with 24 characters")
    .custom(async (id) => {
      try {
        const commentExisitng = await CommentModel.findById(id);

        if (!commentExisitng) {
          return Promise.reject("Comment not founded");
        }
      } catch (err) {
        console.error("Error checking the existency of the comment", err);
        return Promise.reject("Error checking the existency of the comment");
      }
    }),
  body("content")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Content cannot be empty")
    .isString()
    .withMessage("Content must be a string")
    .isLength({ min: 5, max: 500 })
    .withMessage(
      "Content must have at least 5 characters and a maximum of 500"
    ),
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
  body("article")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Article cannot be empty")
    .isString()
    .withMessage("Article must be a string")
    .isLength({ min: 1, max: 24 })
    .withMessage("Article must be an alphanumeric of 24 characters")
    .custom(async (article) => {
      try {
        const articleExisting = await ArticleModel.findOne({ _id: article });

        if (!articleExisting) {
          return Promise.reject("Article not founded");
        }
      } catch (err) {
        console.error("Error checking the existency of the article", err);
        return Promise.reject("Error checking the existency of the article");
      }
    }),
];

export const deleteCommentValidations = [
  param("id")
    .trim()
    .isLength({ min: 1, max: 24 })
    .withMessage("Id must be an aplhanumeric with 24 characters")
    .custom(async (id) => {
      try {
        const commentExisitng = await CommentModel.findById(id);

        if (!commentExisitng) {
          return Promise.reject("Comment not founded");
        }
      } catch (err) {
        console.error("Error checking the existency of the comment", err);
        return Promise.reject("Error checking the existency of the comment");
      }
    }),
];
