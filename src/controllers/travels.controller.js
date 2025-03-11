import {
  addTravel,
  destroyTravel,
  getTravels,
  setTravel,
} from "../models/travels.model.js";
import { findError } from "../utils/find.error.utils.js";

const getAllTravels = async (req, res) => {
  try {
    const travels = await getTravels();
    res.status(200).json({ travels: travels });
  } catch (error) {
    const errorFound = findError(error.code);
    return res
      .status(errorFound[0].status)
      .json({ error: errorFound[0].message, type: errorFound[0].type });
  }
};

const createTravel = async (req, res) => {
  try {
    const { destino, presupuesto } = req.body;
    const travel = await addTravel(destino, presupuesto);
    res.status(201).json(travel);
  } catch (error) {
    console.log(error);
    const errorFound = findError(error.code);
    return res
      .status(errorFound[0].status)
      .json({ error: errorFound[0].message, type: errorFound[0].type });
  }
};

// parte 2

const updateTravel = async (req, res) => {
  try {
    const { travel_id } = req.params;
    const { destino, presupuesto } = req.body;
    const oldTravel = req.oldData;
    const travel = await setTravel(destino, presupuesto, travel_id, oldTravel);
    res.status(201).json(travel);
  } catch (error) {
    const errorFound = findError(error.code);
    return res
      .status(errorFound[0].status)
      .json({ error: errorFound[0].message, type: errorFound[0].type });
  }
};

const deleteTravel = async (req, res) => {
  try {
    const { travel_id } = req.params;
    const travel = await destroyTravel(travel_id);
    res
      .status(204)
      .json({ message: "travel eliminado con exito", rows: travel });
  } catch (error) {
    const errorFound = findError(error.code);
    return res
      .status(errorFound[0].status)
      .json({ error: errorFound[0].message, type: errorFound[0].type });
  }
};

export { getAllTravels, createTravel, updateTravel, deleteTravel };
