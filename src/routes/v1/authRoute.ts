import express from 'express'
import authController from '~/controllers/authController'
import authValidation from '~/validations/authValidation'

const Router = express.Router()

Router.post('/register', authValidation.register, authController.register)
Router.get(
  '/verify-email',
  authValidation.verifyEmail,
  authController.verifyEmail
)
Router.post('/login', authValidation.login, authController.login)

export const authRoutes = Router
