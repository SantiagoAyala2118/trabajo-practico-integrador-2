import { body } from "express-validator";
import { UserModel } from "../../models/user.model.js";

export const registerValidations = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username cannot be empty")
    .isString()
    .withMessage("Username must be a string")
    .isLength({ min: 3, max: 20 })
    .custom(async (username, { req }) => {
      try {
        const usernameExisting = await UserModel.findOne({
          username: req.body.username,
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
    .trim()
    .notEmpty()
    .withMessage("Email cannot be empty")
    .isEmail()
    .withMessage("The email format is invalid")
    .custom(async (email, { req }) => {
      try {
        const emailExisting = await UserModel.findOne({
          email: req.body.email,
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
  body("profile.firstName")
    .trim()
    .notEmpty()
    .withMessage("FirstName field cannot be empty")
    .isString()
    .withMessage("FirstName must be a string")
    .isLength({ min: 2, max: 50 })
    .withMessage(
      "FirstName must have at least 2 characters and a maximum of 50"
    ),
  body("profile.lastName")
    .trim()
    .notEmpty()
    .withMessage("LastName field cannot be empty")
    .isString()
    .withMessage("LastName must be a string")
    .isLength({ min: 2, max: 50 })
    .withMessage(
      "LastName must have at least 2 characters and a maximum of 50"
    ),
  body("biography")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Biography cannot be empty")
    .isString()
    .withMessage("Biography must be a string"),
  body("avatarUrl")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("AvatarUrl cannot be empty")
    .isString()
    .withMessage("AvatarUrl must be a string")
    .matches(/^(https?|ftp):\/\/[^\s"]+$/i)
    .withMessage("AvatarUrl format invalid"),
  body("birthDate")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("BirthDate cannot be empty")
    .isDate()
    .withMessage("BirthDate must be a date"),
];

export const updateAuthProfileValidations = [
  body("profile.firstName")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("FirstName field cannot be empty")
    .isString()
    .withMessage("FirstName must be a string")
    .isLength({ min: 2, max: 50 })
    .withMessage(
      "FirstName must have at least 2 characters and a maximum of 50"
    ),
  body("profile.lastName")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("LastName field cannot be empty")
    .isString()
    .withMessage("LastName must be a string")
    .isLength({ min: 2, max: 50 })
    .withMessage(
      "LastName must have at least 2 characters and a maximum of 50"
    ),
  body("profile.biography")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Biography cannot be empty")
    .isString()
    .withMessage("Biography must be a string"),
  body("profile.avatarUrl")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("AvatarUrl cannot be empty")
    .isString()
    .withMessage("AvatarUrl must be a string")
    .matches(/^(https?|ftp):\/\/[^\s"]+$/i)
    .withMessage("AvatarUrl format invalid"),
  body("profile.birthDate")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("BirthDate cannot be empty")
    .isDate()
    .withMessage("BirthDate must be a date"),
];
