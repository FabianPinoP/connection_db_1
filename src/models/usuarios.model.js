import bcrypt from "bcryptjs";
import pool from "../../config/db/conection.db.js";

const createUser = async (nombre, apellido, email, password) => {
  const hashedPassword = bcrypt.hashSync(password);
  const SQLquery = {
    text: "INSERT INTO usuarios (nombre, apellido, email, password) VALUES ($1, $2, $3, $4) RETURNING nombre, apellido, email",
    values: [nombre, apellido, email, hashedPassword],
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
