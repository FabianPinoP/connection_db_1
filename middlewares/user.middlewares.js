import { findUserByEmail } from "../src/models/usuarios.model.js";
import { createUserSchema } from "./schemas/user.schema.js";

const createUserMiddleware = async (req, res, next) => {
  const { email } = req.body;
  const { error } = createUserSchema.validate(req.body);
  if (error) {
    return res.status(400).json(error.details.map((detail) => detail.message));
  }

  const user = await findUserByEmail(email);
  if (user) {
    return res.status(400).json({ message: "el usuario ya existe" });
  }

  next();
};

export { createUserMiddleware };
