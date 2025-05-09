import { Application } from 'express'
import { userRoutes } from './userRoute'

const APIs_V1 = (app: Application) => {
  app.use('/auth', userRoutes)
}

export default APIs_V1
