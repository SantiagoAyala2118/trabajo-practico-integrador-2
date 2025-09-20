import { UserModel } from "../models/user.model.js";
import { generateToken } from "../helpers/jwt.helper.js";
import { hashPassword, comparePassword } from "../helpers/bcrypt.helper.js";

//REGISTRAR USUARIO
export const register = async (req, res) => {
  const { username, email, password, role, profile } = req.body;
  try {
    const hashedPassword = await hashPassword(password);

    const user = await UserModel.create({
      username,
      email,
      password: hashedPassword,
      role,
      profile,
    });

    if (user) {
      return res.status(201).json({
        message: "User created",
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

//LOGIN USUARIO
export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await UserModel.findOne({ username });

    if (!user) {
      return res.status(404).json({
        ok: false,
        message: "Username or password incorrect",
      });
    }

    const validPassword = await comparePassword(password, user.password);

    if (!validPassword) {
      return res.status(404).json({
        ok: false,
        message: "Username or password incorrect",
      });
    }

    const token = generateToken(user);

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

//DESLOGUEAR USUARIO
export const logout = async (req, res) => {
  try {
    //BORRO LA COOKIE
    res.clearCookie("token");

    return res.status(200).json({
      ok: true,
      message: "Logout succesfuly",
    });
  } catch (err) {
    console.error("Server error", err);
    return res.status(500).json({
      ok: false,
      message: "Server error",
    });
  }
};

//TRAER EL PERFIL DEL USUARIO AUTENTICADO
export const getAuthProfile = async (req, res) => {
  try {
    const userLogged = req.userLogged;

    const profile = await UserModel.findOne({ _id: userLogged.id }).select(
      "username profile _id"
    );

    if (profile) {
      return res.status(200).json({
        ok: true,
        message: "Profile founded",
        profile: profile,
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

//ACTUALIZAR EL PERFIL DEL USUARIO AUTENTICADO
export const updateAuthProfile = async (req, res) => {
  try {
    const userLogged = req.userLogged;

    const updatedProfile = await UserModel.findByIdAndUpdate(
      userLogged.id,
      { $set: { profile: req.body.profile } },
      { new: true }
    );

    if (updatedProfile) {
      return res.status(200).json({
        ok: true,
        message: "Profile updated",
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
