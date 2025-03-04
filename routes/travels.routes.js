import express from "express";
import { createTravel, getAllTravels } from "../src/controllers/travels.controller.js";
import { createTravelMiddleware } from "../middlewares/travels.middlewares.js";
const router = express.Router();

router.get("/travels", getAllTravels);
router.post("/create_travels", createTravelMiddleware, createTravel)

export default router;
