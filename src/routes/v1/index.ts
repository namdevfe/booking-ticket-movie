import { authRoutes } from './authRoute'

import express from 'express'
import { cinemaRoutes } from '~/routes/v1/cinemaRoute'

// const APIs_V1 = (app: Application) => {
//   app.use('/auth', userRoutes)
// }

const Router = express.Router()

Router.use('/auth', authRoutes)
Router.use('/cinemas', cinemaRoutes)

export const APIs_V1 = Router
