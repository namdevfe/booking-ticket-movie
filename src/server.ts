import express from 'express'
import 'dotenv/config'
import errorHandlingMiddleware from '~/middlewares/errorHandlingMiddleware'
import connectMongoDB from '~/config/mongodb'
import { APIs_V1 } from '~/routes/v1'

const APP_HOSTNAME = 'localhost'
const APP_PORT = 8017

const app = express()

app.use(express.json())

connectMongoDB()

app.use('/api/v1', APIs_V1)

app.use(errorHandlingMiddleware)

app.listen(APP_PORT, () => {
  console.log(`Server is running on http://${APP_HOSTNAME}:${APP_PORT}`)
})
