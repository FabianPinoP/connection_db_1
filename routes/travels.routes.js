import express from "express";
import { createTravel, deleteTravel, getAllTravels, updateTravel } from "../src/controllers/travels.controller.js";
import { createTravelMiddleware, updateTravelMiddleware } from "../middlewares/travels.middlewares.js";
const router = express.Router();

router.get("/travels", getAllTravels);
router.post("/create_travels", createTravelMiddleware, createTravel)

// parte 2
router.put('/update_travel/:travel_id', updateTravelMiddleware, updateTravel)
router.delete('/delete_travel/:travel_id', deleteTravel)

export default router;
