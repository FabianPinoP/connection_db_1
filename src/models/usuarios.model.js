import bcrypt from "bcryptjs";
import pool from "../../config/db/conection.db.js";
import { streamUpload } from "../../config/cloudinary/cloudinary.config.js";

const createUser = async (nombre, apellido, email, password, file) => {
    let publicId;
    let secureUrl;
    if (file) {
      const data = await streamUpload(file)
      publicId = data.public_id
      secureUrl = data.secure_url
    }
 
  const hashedPassword = bcrypt.hashSync(password);
  const SQLquery = {
    text: "INSERT INTO usuarios (nombre, apellido, email, password, avatar_url, avatar_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING nombre, apellido, email, avatar_url, avatar_id",
    values: [nombre, apellido, email, hashedPassword, secureUrl, publicId],
  };

  const response = await pool.query(SQLquery);
  return response.rows[0];
};

const findUserByEmail = async (email) => {
  try {
    const SQLquery = {
      text: "SELECT * FROM usuarios WHERE email = $1",
      values: [email],
    };
    const response = await pool.query(SQLquery);
    return response.rows[0];
  } catch (error) {
    console.log(error);
  }
};

const saveStripeCustomerId = async (userId, stripeCustomerId) => {
  const SQLquery = {
    text: "UPDATE usuarios SET stripe_customer_id =$2 WHERE id = $1 RETURNING *",
    values: [userId, stripeCustomerId],
  };
  const response = await pool.query(SQLquery);
  return response.rows[0];
}

export { createUser, findUserByEmail, saveStripeCustomerId };
