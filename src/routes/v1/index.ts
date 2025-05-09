import { Application } from 'express'
import { authRoutes } from './authRoute'

import express from 'express'

// const APIs_V1 = (app: Application) => {
//   app.use('/auth', userRoutes)
// }

const Router = express.Router()

Router.use('/auth', authRoutes)

export const APIs_V1 = Router
