import { verifyToken } from "../helpers/jwt.helper.js";

export const authMiddleware = (req, res, next) => {
  const token = req.cookies["token"];

  if (!token) {
    return res.status(401).json({
      message: "User not authenticated",
    });
  }

  const decoded = verifyToken(token);

  req.userLogged = decoded;

  next();
};
