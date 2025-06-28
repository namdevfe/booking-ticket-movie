import express from 'express'
import cinemaController from '~/controllers/cinemaController'
import authMiddleware from '~/middlewares/authMiddleware'
import { Role } from '~/types/userType'
import cinemaValidation from '~/validations/cinemaValidation'

const Router = express.Router()

Router.route('/')
  .post(authMiddleware([Role.ADMIN]), cinemaValidation.createCinema, cinemaController.createCinema)

export const cinemaRoutes = Router
