import jwt from "jsonwebtoken";
import { envs } from "../config/envs.js";

const verifyToken = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return res.status(400).json({ message: "el token debe estar presente" });
    }
    const extractToken = token.split(" ")[1]
    const decoded = jwt.verify(extractToken, envs.jwtSecret)
    req.user = decoded.email
    next()
  } catch (error) {
    return res.status(400).json({ message: "el token es invalido" });
  }
};

export { verifyToken };
