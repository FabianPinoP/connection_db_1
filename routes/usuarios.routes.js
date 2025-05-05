import express from "express";
import { registerUser, uploadImage } from "../src/controllers/usuarios.controller.js";
import { createUserMiddleware } from "../middlewares/user.middlewares.js";
import { uploadSingle } from "../config/multer/multer.config.js";
const router = express.Router();

router.post('/register', uploadSingle, createUserMiddleware, registerUser)

router.post('/upload', uploadSingle, uploadImage)

export default router;