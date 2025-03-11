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

// parte 2

const setTravel = async (destino, presupuesto, travelId, oldData) => {
  const newDestino = destino || oldData.destino
  const newPresupuesto = presupuesto || oldData.presupuesto

  const SQLquery = {
    text: "UPDATE viajes SET destino = $1, presupuesto = $2 WHERE id = $3 RETURNING *",
    values: [newDestino, newPresupuesto, travelId],
  };
  
  const response = await pool.query(SQLquery);
  return response.rows[0];
}

const travelById = async (id) => {
  const SQLquery = {
    text: "SELECT * FROM viajes WHERE id = $1",
    values: [Number(id)]
  };
  const response = await pool.query(SQLquery);
  return response.rows[0];
}

const destroyTravel = async (id) => {
  const SQLquery = {
    text: "DELETE FROM viajes WHERE id = $1",
    values: [Number(id)]
  };
  const response = await pool.query(SQLquery);
  return response.rowCount;
}
 
export { getTravels, addTravel, setTravel, travelById, destroyTravel };
