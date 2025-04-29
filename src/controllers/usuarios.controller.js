import { stripe } from '../../config/stripe/stripe.config.js'
import { createUser } from '../models/usuarios.model.js'
import { findError } from '../utils/find.error.utils.js'

const registerUser = async (req, res) => {
  try {
    const { nombre, apellido, email, password } = req.body
    const user = await createUser(nombre, apellido, email, password)
    stripe.customers.create({
      name: `${user.name} ${user.apellido}`,
      email: user.email
    })
    res.status(201).json(user)
  } catch (error) {
    console.log(error)
    const errorFound = findError(error.code)
    return res
      .status(errorFound[0].status)
      .json({ error: errorFound[0].message, type: errorFound[0].type })
  }
}

export { registerUser }
