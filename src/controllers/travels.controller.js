import {
  addTravel,
  destroyTravel,
  filterTravels,
  getTravels,
  getTravelsWithHateoas,
  setTravel,
  travelLimit,
  travelsOrderAndLimit,
} from "../models/travels.model.js";
import { findError } from "../utils/find.error.utils.js";
import prepareHateoas from "../utils/hateoas.js";
import pagination from "../utils/paginator.js";

const getAllTravels = async (req, res) => {
  try {
    const { items, page } = req.query;
    const travels = await getTravels();
    const data = pagination(travels, items, page);
    res.status(200).json(data);
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
    // console.log(error);
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
    res.status(200).json(travel);
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

const limitTravels = async (req, res) => {
  try {
    const { limit } = req.query;

    const travels = await travelLimit(limit);
    res.status(200).json(travels);
  } catch (error) {
    const errorFound = findError(error.code);
    return res
      .status(errorFound[0].status)
      .json({ error: errorFound[0].message, type: errorFound[0].type });
  }
};

const orderAndLimitTravels = async (req, res) => {
  try {
    const { order_by, limit, page } = req.query;

    const travels = await travelsOrderAndLimit(order_by, limit, page);
    res.status(200).json(travels);
  } catch (error) {
    const errorFound = findError(error.code);
    return res
      .status(errorFound[0].status)
      .json({ error: errorFound[0].message, type: errorFound[0].type });
  }
};

const travelsFilter = async (req, res) => {
  try {
    const { items, page, filters, order } = req.body;

    const travels = await filterTravels(items, page, filters, order);
    res.status(200).json(travels);
  } catch (error) {
    console.log(error);

    const errorFound = findError(error.code);
    return res
      .status(errorFound[0].status)
      .json({ error: errorFound[0].message, type: errorFound[0].type });
  }
};

const travelsHateoas = async (req, res) => {
  try {
    const travels = await getTravelsWithHateoas();
    const travelsHateoas = await prepareHateoas("travels", travels);
    res.status(200).json({ travels: travelsHateoas });
  } catch (error) {
    const errorFound = findError(error.code);
    return res
      .status(errorFound[0].status)
      .json({ error: errorFound[0].message, type: errorFound[0].type });
  }
};

export {
  getAllTravels,
  createTravel,
  updateTravel,
  deleteTravel,
  limitTravels,
  orderAndLimitTravels,
  travelsFilter,
  travelsHateoas,
};
