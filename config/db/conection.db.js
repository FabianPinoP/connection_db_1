import pg from 'pg'
import { envs } from '../envs.js';

const pool = new pg.Pool({
  host: envs.dbHost,
  user: envs.userDb,
  password: envs.passwordDb,
  database: envs.nameDatabase,
  allowExitOnIdle: true
  // connectionString: process.env.DATABASE_URL,
 })

 export default pool;