import Joi from 'joi'

const createTravelSchema = Joi.object({
  destino: Joi.string().required(),
  presupuesto: Joi.number().required()
})

const updateTravelSchema = Joi.object({
  destino: Joi.string().optional(),
  presupuesto: Joi.number().optional()
})

export { createTravelSchema, updateTravelSchema }