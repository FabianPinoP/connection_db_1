import pool from "../../config/db/conection.db.js";
import format from "pg-format";
import createQuery from "../utils/create.query.js";

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
  const newDestino = destino || oldData.destino;
  const newPresupuesto = presupuesto || oldData.presupuesto;

  const SQLquery = {
    text: "UPDATE viajes SET destino = $1, presupuesto = $2 WHERE id = $3 RETURNING *",
    values: [newDestino, newPresupuesto, travelId],
  };

  const response = await pool.query(SQLquery);
  return response.rows[0];
};

const travelById = async (id) => {
  const SQLquery = {
    text: "SELECT * FROM viajes WHERE id = $1",
    values: [Number(id)],
  };
  const response = await pool.query(SQLquery);
  return response.rows[0];
};

const destroyTravel = async (id) => {
  const SQLquery = {
    text: "DELETE FROM viajes WHERE id = $1",
    values: [Number(id)],
  };
  const response = await pool.query(SQLquery);
  return response.rowCount;
};

const travelLimit = async (limit = 10) => {
  const SQLquery = {
    text: "SELECT * FROM viajes ORDER BY id DESC LIMIT $1",
    values: [limit],
  };
  const response = await pool.query(SQLquery);
  return response.rows;
};

const travelsOrderAndLimit = async (
  order_by = "id_ASC",
  limit = 10,
  page = 0
) => {
  const [attribute, direction] = order_by.split("_");
  const offset = page * limit;
  const formatQuery = format(
    "SELECT * FROM  viajes ORDER BY %s %s LIMIT %s OFFSET %s",
    attribute,
    direction,
    limit,
    offset
  );
  const response = await pool.query(formatQuery);
  return response.rows;
};

const filterTravels = async (items, page, filters, order) => {
  const { query, values } = createQuery('viajes', filters, items, page, order )
  const result = await pool.query(query, values);
  return result.rows;
}

const getTravelsWithHateoas = async () => {
  const SQLquery = { text: "SELECT * FROM viajes" };
  const response = await pool.query(SQLquery);
  return response.rows;
}

export {
  getTravels,
  addTravel,
  setTravel,
  travelById,
  destroyTravel,
  travelLimit,
  travelsOrderAndLimit,
  filterTravels,
  getTravelsWithHateoas
};
