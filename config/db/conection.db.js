import pg from 'pg'
import { envs } from '../envs.js';
//  ssl: {
//   rejectUnauthorized: false, // esto es solo para probar desde local
// },

const productionConection = {
  connectionString: envs.databaseUrl,
  allowExitOnIdle: true
}

const developmentConection = {
  host: envs.dbHost,
  user: envs.userDb,
  password: envs.passwordDb,
  database: envs.nameDatabase,
  allowExitOnIdle: true
}
const conection = envs.databaseUrl ? productionConection : developmentConection
const pool = new pg.Pool(conection)

export default pool;
