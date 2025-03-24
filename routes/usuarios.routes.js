import express from "express";
import { registerUser } from "../src/controllers/usuarios.controller.js";
import { createUserMiddleware } from "../middlewares/user.middlewares.js";
const router = express.Router();

router.post('/register', createUserMiddleware, registerUser)

export default router;