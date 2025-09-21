import { body, param } from "express-validator";
import { UserModel } from "../../models/user.model.js";

export const getUserWithArticlesAndCommentsValidations = [
  param("id")
    .trim()
    .isLength({ min: 1, max: 24 })
    .withMessage("The id must be an alphanumeric with 24 characters")
    .custom(async (id) => {
      try {
        const userExisting = await UserModel.findOne({
          $and: [{ _id: id }, { deletedAt: null }],
        });

        if (!userExisting) {
          return Promise.reject("There is no user in the DB with that id");
        }
      } catch (err) {
        console.error("Error checking the existency of the user", err);
        return Promise.reject("Error checking the existency of the user");
      }
    }),
];

export const updateUserValidations = [
  param("id")
    .trim()
    .isLength({ min: 1, max: 24 })
    .withMessage("The id must be an alphanumeric with 24 characters")
    .custom(async (id) => {
      try {
        const userExisting = await UserModel.findOne({
          $and: [{ _id: id }, { deletedAt: null }],
        });

        if (!userExisting) {
          return Promise.reject("There is no user in the DB with that id");
        }
      } catch (err) {
        console.error("Error checking the existency of the user", err);
        return Promise.reject("Error checking the existency of the user");
      }
    }),
  body("username")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Username cannot be empty")
    .isString()
    .withMessage("Username must be a string")
    .isLength({ min: 3, max: 20 })
    .custom(async (username, { req }) => {
      try {
        const usernameExisting = await UserModel.findOne({
          $and: [{ username: username }, { _id: { $ne: req.params.id } }],
        });

        if (usernameExisting) {
          return Promise.reject("Username already taken");
        }
      } catch (err) {
        console.error("Error checking the viability of the username", err);
        return Promise.reject("Error checking the viability of the username");
      }
    }),
  body("email")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Email cannot be empty")
    .isEmail()
    .withMessage("The email format is invalid")
    .custom(async (email, { req }) => {
      try {
        const emailExisting = await UserModel.findOne({
          $and: [{ email: email }, { _id: { $ne: req.params.id } }],
        });

        if (emailExisting) {
          return Promise.reject("Email already taken");
        }
      } catch (err) {
        console.error("Error checking the viability of the email", err);
        return Promise.reject("Error checking the viability of the email");
      }
    }),
  body("password")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Password cannot be empty")
    .isString()
    .withMessage("Password must be a string"),
  body("role")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Role cannot be empty")
    .isIn(["user", "admin"])
    .withMessage("Role must be user or admin"),
];

export const deleteUserValidations = [
  param("id")
    .trim()
    .isLength({ min: 1, max: 24 })
    .withMessage("The id must be an alphanumeric with 24 characters")
    .custom(async (id) => {
      try {
        const userExisting = await UserModel.findOne({
          $and: [{ _id: id }, { deletedAt: null }],
        });

        if (!userExisting) {
          return Promise.reject("User not found");
        }
      } catch (err) {
        console.error("Error checking the existency of the user", err);
        return Promise.reject("Error checking the existency of the user");
      }
    }),
];
