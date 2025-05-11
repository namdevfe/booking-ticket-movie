import express from 'express'
import authController from '~/controllers/authController'
import authMiddleware from '~/middlewares/authMiddleware'
import authValidation from '~/validations/authValidation'

const Router = express.Router()

Router.post('/register', authValidation.register, authController.register)
Router.get(
  '/verify-email',
  authValidation.verifyEmail,
  authController.verifyEmail
)
Router.post('/login', authValidation.login, authController.login)
Router.get('/profile', authMiddleware, authController.getProfile)
Router.post(
  '/refresh-token',
  authValidation.refreshToken,
  authController.refreshToken
)

export const authRoutes = Router
