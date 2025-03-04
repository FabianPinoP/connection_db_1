import Joi from 'joi'

const createTravelSchema = Joi.object({
  destino: Joi.string().required(),
  presupuesto: Joi.number().required()
})

export { createTravelSchema }