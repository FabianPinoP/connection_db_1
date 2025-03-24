import Joi from 'joi'

const createUserSchema = Joi.object({
  nombre: Joi.string().required(),
  apellido: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required()
})

export { createUserSchema }