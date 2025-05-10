import express from 'express'
import { env } from '~/config/environment'
import connectMongoDB from '~/config/mongodb'
import errorHandlingMiddleware from '~/middlewares/errorHandlingMiddleware'
import { APIs_V1 } from '~/routes/v1'

const app = express()

app.use(express.json())

app.use('/api/v1', APIs_V1)

app.use(errorHandlingMiddleware)

app.listen(env.APP_PORT, env.APP_HOST, async () => {
  await connectMongoDB()
  console.log(`Server is running on http://${env.APP_HOST}:${env.APP_PORT}`)
})
