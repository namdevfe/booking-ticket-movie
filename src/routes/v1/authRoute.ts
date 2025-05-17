import express from 'express'
import authController from '~/controllers/authController'
import authMiddleware from '~/middlewares/authMiddleware'
import { Role } from '~/types/userType'
import authValidation from '~/validations/authValidation'

const Router = express.Router()

Router.post('/register', authValidation.register, authController.register)
Router.get(
  '/verify-email',
  authValidation.verifyEmail,
  authController.verifyEmail
)
Router.post('/login', authValidation.login, authController.login)
Router.get('/profile', authMiddleware(), authController.getProfile)
Router.post(
  '/refresh-token',
  authValidation.refreshToken,
  authController.refreshToken
)
Router.put('/logout', authValidation.logout, authController.logout)
Router.post(
  '/forgot-password',
  authValidation.forgotPassword,
  authController.forgotPassword
)
Router.put(
  '/reset-password',
  authValidation.resetPassword,
  authController.resetPassword
)
Router.post(
  '/retry-active',
  authValidation.retryActive,
  authController.retryActive
)

export const authRoutes = Router
