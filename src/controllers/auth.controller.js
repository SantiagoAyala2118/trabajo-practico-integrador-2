import { UserModel } from "../models/user.model.js";

export const register = async (req, res) => {
  const { username, email, password, role, profile } = req.body;
  try {
    const user = await UserModel.create({
      username,
      email,
      password,
      role,
      profile,
    });

    if (user) {
      return res.status(201).json({
        message: "User created",
        User: user,
      });
    }
  } catch (err) {
    console.error("Server error", err);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const loging = async (req, res) => {};

export const logout = async (req, res) => {};
