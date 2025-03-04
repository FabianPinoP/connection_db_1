import dotenv from 'dotenv'
dotenv.config()
const envs = {
  port: process.env.PORT,
  dbHost: process.env.DB_HOST,
  userDb: process.env.USER_DB,
  passwordDb: process.env.PASSWORD_DB,
  nameDatabase: process.env.NAME_DATABASE,
  frontUrl: process.env.FRONT_URL,
  prodUrl: process.env.PROD_FRONT_URL
}

export { envs }