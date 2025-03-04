import { createTravelSchema } from "./schemas/travel.schema.js"

const createTravelMiddleware = async (req, res, next) => {
  const { error } = createTravelSchema.validate(req.body)
  if (error) {
    res.status(400).json(error.details.map(detail => detail.message))
  }
  next()
}

export { createTravelMiddleware }