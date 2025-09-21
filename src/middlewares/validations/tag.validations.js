import { body, param } from "express-validator";
import { TagModel } from "../../models/tag.model.js";

export const createTagValidations = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name cannot be empty")
    .isString()
    .withMessage("Name must be a string")
    .isLength({ min: 2, max: 30 })
    .withMessage("Name must contain at least 2 characters and a maximum of 30")
    .matches(/^\S+$/)
    .withMessage("Name must not contain spaces")
    .custom(async (name) => {
      try {
        const nameExisting = await TagModel.findOne(name);

        if (nameExisting) {
          return Promise.reject("A tag with that name already exists");
        }
      } catch (err) {
        console.error("Error checking the viability of the name", err);
        return Promise.reject("Error checking the viability of the name");
      }
    }),
  body("description")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Description cannot be empty")
    .isString()
    .withMessage("Description must be a string")
    .isLength({ max: 200 })
    .withMessage("Description's maximum characters are 200"),
];

export const getTagValidations = [
  param("id")
    .trim()
    .isLength({ min: 1, max: 24 })
    .withMessage("The id must be an alphanumeric with 24 characters")
    .custom(async (id) => {
      try {
        const tag = await TagModel.finById(id);

        if (!tag) {
          return Promise.reject("Tag not founded");
        }
      } catch (err) {
        console.error("Error checking the existency of the tag", err);
        return Promise.reject("Error checking the existency of the tag");
      }
    }),
];

export const updateTagValidations = [
  param("id")
    .trim()
    .isLength({ min: 1, max: 24 })
    .withMessage("The id must be an alphanumeric with 24 characters")
    .custom(async (id) => {
      try {
        const tag = await TagModel.finById(id);

        if (!tag) {
          return Promise.reject("Tag not founded");
        }
      } catch (err) {
        console.error("Error checking the existency of the tag", err);
        return Promise.reject("Error checking the existency of the tag");
      }
    }),
  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Name cannot be empty")
    .isString()
    .withMessage("Name must be a string")
    .isLength({ min: 2, max: 30 })
    .withMessage("Name must contain at least 2 characters and a maximum of 30")
    .matches(/^\S+$/)
    .withMessage("Name must not contain spaces")
    .custom(async (name, { req }) => {
      try {
        const nameExisting = await TagModel.findOne({
          $and: [{ name: name }, { _id: { $ne: req.params.id } }],
        });

        if (nameExisting) {
          return Promise.reject("A tag with that name already exists");
        }
      } catch (err) {
        console.error("Error checking the viability of the name", err);
        return Promise.reject("Error checking the viability of the name");
      }
    }),
  body("description")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Description cannot be empty")
    .isString()
    .withMessage("Description must be a string")
    .isLength({ max: 200 })
    .withMessage("Description's maximum characters are 200"),
];

export const deleteTagValidations = [
  param("id")
    .trim()
    .isLength({ min: 1, max: 24 })
    .withMessage("The id must be an alphanumeric with 24 characters")
    .custom(async (id) => {
      try {
        const tag = await TagModel.finById(id);

        if (!tag) {
          return Promise.reject("Tag not founded");
        }
      } catch (err) {
        console.error("Error checking the existency of the tag", err);
        return Promise.reject("Error checking the existency of the tag");
      }
    }),
];
