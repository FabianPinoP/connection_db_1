import { addTravel, getTravels } from "../models/travels.model.js";

const getAllTravels = async (req, res) => {
  try {
    const travels = await getTravels();
    res.status(200).json({ travels: travels });
  } catch (error) {
    // console.log(error);

    res.status(500).json(error);
  }
};

const createTravel = async (req, res) => {
  try {
    const { destino, presupuesto } = req.body;
    const travel = await addTravel(destino, presupuesto);
    res.status(201).json(travel);
  } catch (error) {
    console.log(error);
    
    res.status(500).json(error);
  }
};

export { getAllTravels, createTravel };
