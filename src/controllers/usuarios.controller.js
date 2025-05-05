import { streamUpload } from '../../config/cloudinary/cloudinary.config.js'
import { stripe } from '../../config/stripe/stripe.config.js'
import { welcomeUserEmail } from '../../mailers/send.welcome.mailer.js'
import { createUser } from '../models/usuarios.model.js'
import { findError } from '../utils/find.error.utils.js'

const registerUser = async (req, res) => {
  try {
    const { nombre, apellido, email, password } = req.body
    const user = await createUser(nombre, apellido, email, password, req.file)
    stripe.customers.create({
      name: `${user.name} ${user.apellido}`,
      email: user.email
    })
    await welcomeUserEmail(user)
    res.status(201).json(user)
  } catch (error) {
    console.log(error)
    const errorFound = findError(error.code)
    return res
      .status(errorFound[0].status)
      .json({ error: errorFound[0].message, type: errorFound[0].type })
  }
}

const uploadImage = async (req, res) => {
  if (!req.file) {
    res.status(400).json({ message: 'el file es requerido' })
  }

  const resp = await streamUpload(req.file)
  res.status(200).json(resp) // de la respuesta lo que nos importa es el public id , secure url, opcional el format 
}
export { registerUser, uploadImage }
