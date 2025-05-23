import express from 'express'
import cors from 'cors'
import { envs } from './config/envs.js'
import travelRoutes from './routes/travels.routes.js'
import userRoutes from './routes/usuarios.routes.js'
import authRoutes from './routes/auth.routes.js'
import swagger from "./config/swagger/swagger.js";
import stripeWebhooks from './routes/stripe.webhooks.js'
import stripeRoutes from './routes/stripe.routes.js'

import { logger } from "logger-express";

const loggerOption = {
  logToFile: true, // If you need to log information to a file
  colorize: true, // enable console colors
  infoColor: "magenta", // set a color for information messages
  errorColor: "red", // set a color for error messages:
};

const app = express()
const port = envs.port

const whiteList = [
  envs.frontUrl,
  envs.prodUrl,
  'http://localhost:3000'
]

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || whiteList.includes(origin)) {
        return callback(null, true)
      }
      return callback(new Error(`Error de CORS: ${origin}`), false)
    }
  })
)
swagger(app);
app.use(logger(loggerOption));
app.use(express.json());
app.use('/api', travelRoutes)
app.use('/api', userRoutes)
app.use('/api', authRoutes)
app.use('/', stripeWebhooks)
app.use('/api', stripeRoutes)


app.get('/health', async (req, res) =>{
  res.status(200).send('is alive')
})

app.listen(port, () => {
  console.log(`servidor encendido en el puerto! ${port}`)
  console.log(
    `Swagger production documents available at http://localhost:${port}/api/docs`
  );
})
export default app;