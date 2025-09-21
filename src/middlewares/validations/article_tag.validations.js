import { param } from "express-validator";
import { ArticleModel } from "../../models/article.model.js";
import { TagModel } from "../../models/tag.model.js";

export const addTagToArticleValidations = [
  param("articleId")
    .trim()
    .isLength({ min: 1, max: 24 })
    .withMessage("ArticleId must be an aplhanumeric with 24 characters")
    .custom(async (articleId) => {
      try {
        const articleExisting = await ArticleModel.findById(articleId);

        if (!articleExisting) {
          return Promise.reject("Article not founded");
        }
      } catch (err) {
        console.error("Error checking the existency of the article", err);
        return Promise.reject("Error checking the existency of the article");
      }
    }),
  param("tagId")
    .trim()
    .isLength({ min: 1, max: 24 })
    .withMessage("The id must be an alphanumeric with 24 characters")
    .custom(async (tagId) => {
      try {
        const tag = await TagModel.findById(tagId);

        if (!tag) {
          return Promise.reject("Tag not founded");
        }
      } catch (err) {
        console.error("Error checking the existency of the tag", err);
        return Promise.reject("Error checking the existency of the tag");
      }
    }),
];

export const removeTagFromArticleValidations = [
  param("articleId")
    .trim()
    .isLength({ min: 1, max: 24 })
    .withMessage("ArticleId must be an aplhanumeric with 24 characters")
    .custom(async (articleId) => {
      try {
        const articleExisting = await ArticleModel.findById(articleId);

        if (!articleExisting) {
          return Promise.reject("Article not founded");
        }
      } catch (err) {
        console.error("Error checking the existency of the article", err);
        return Promise.reject("Error checking the existency of the article");
      }
    }),
  param("tagId")
    .trim()
    .isLength({ min: 1, max: 24 })
    .withMessage("The id must be an alphanumeric with 24 characters")
    .custom(async (tagId) => {
      try {
        const tag = await TagModel.findById(tagId);

        if (!tag) {
          return Promise.reject("Tag not founded");
        }
      } catch (err) {
        console.error("Error checking the existency of the tag", err);
        return Promise.reject("Error checking the existency of the tag");
      }
    }),
];
