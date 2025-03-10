import { travelById } from "../src/models/travels.model.js"
import { createTravelSchema, updateTravelSchema } from "./schemas/travel.schema.js"

const createTravelMiddleware = async (req, res, next) => {
  const { error } = createTravelSchema.validate(req.body)
  if (error) {
    res.status(400).json(error.details.map(detail => detail.message))
  }
  next()
}

const updateTravelMiddleware = async (req, res, next) => {
  const { travel_id } = req.params
  const { error } = updateTravelSchema.validate(req.body)
  if (error) {
    res.status(400).json(error.details.map(detail => detail.message))
  }

  const travel = await travelById(travel_id)
  if (!travel) {
    res.status(400).json({message: "travel no existe"})
  }

  req.oldData = travel
  next()
}

export { createTravelMiddleware, updateTravelMiddleware }