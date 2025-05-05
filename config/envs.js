import dotenv from 'dotenv'
dotenv.config()
const envs = {
  port: process.env.PORT,
  dbHost: process.env.DB_HOST,
  userDb: process.env.USER_DB,
  passwordDb: process.env.PASSWORD_DB,
  nameDatabase: process.env.NAME_DATABASE,
  frontUrl: process.env.FRONT_URL,
  prodUrl: process.env.PROD_FRONT_URL,
  jwtSecret: process.env.JWT_SECRET,
  stripeApiKey: process.env.STRIPE_API_KEY,
  brevoApiKey: process.env.BREVO_API_KEY,
  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET
}

export { envs }