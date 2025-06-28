import express from 'express'
import cinemaController from '~/controllers/cinemaController'
import cinemaValidation from '~/validations/cinemaValidation'

const Router = express.Router()

Router.route('/')
  .post(cinemaValidation.createCinema, cinemaController.createCinema)

export const cinemaRoutes = Router
