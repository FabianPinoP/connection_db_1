import pool from "../../config/db/conection.db.js";

const getTravels = async () => {
  const SQLquery = {
    text: "SELECT * FROM viajes",
  };

  const response = await pool.query(SQLquery);
  return response.rows;
};

const addTravel = async (destino, presupuesto) => {
  const SQLquery = {
    text: "INSERT INTO viajes (destino, presupuesto) VALUES ($1, $2) RETURNING *",
    values: [destino, presupuesto],
  };

  const response = await pool.query(SQLquery);
  return response.rows;
};

export { getTravels, addTravel };
