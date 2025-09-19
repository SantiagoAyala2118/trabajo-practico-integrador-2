import { UserModel } from "../models/user.model.js";
import { generateToken } from "../helpers/jwt.helper.js";

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
      ok: false,
      message: "Server error",
    });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await UserModel.findOne({ username });

    if (!user) {
      return res.status(404).json({
        ok: false,
        message: "User not found",
      });
    }

    const generateToken = generateToken(user);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
    });

    return res.status(200).json({
      ok: true,
      message: "Loggin succesfuly",
    });
  } catch (err) {
    console.error("Server error", err);
    return res.status(500).json({
      ok: false,
      message: "Server error",
    });
  }
};

export const logout = async (req, res) => {};
