import express from 'express'
import cors from 'cors'
import { envs } from './config/envs.js'
import travelRoutes from './routes/travels.routes.js'

const app = express()
const port = envs.port

const whiteList = [
  envs.frontUrl,
  envs.prodUrl
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
app.use(express.json());

app.use('/api', travelRoutes)


app.listen(port, console.log(`servidor encendido en el puerto! ${port}`))
