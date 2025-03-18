import express from "express";
import {
  createTravel,
  deleteTravel,
  getAllTravels,
  limitTravels,
  orderAndLimitTravels,
  travelsFilter,
  travelsHateoas,
  updateTravel,
} from "../src/controllers/travels.controller.js";
import {
  createTravelMiddleware,
  updateTravelMiddleware,
} from "../middlewares/travels.middlewares.js";
const router = express.Router();
// acceso a db parte 1
router.get("/travels", getAllTravels);
router.post("/create_travels", createTravelMiddleware, createTravel);

// acceso a db parte 2
router.put("/update_travel/:travel_id", updateTravelMiddleware, updateTravel);
router.delete("/delete_travel/:travel_id", deleteTravel);

// parte 3 rest avanzada
router.get("/travels_limit", limitTravels);
router.get("/travels_with_limit_and_order", orderAndLimitTravels);
router.post("/travelsFilter", travelsFilter);
router.get("/travels_with_hateoas", travelsHateoas);

export default router;
