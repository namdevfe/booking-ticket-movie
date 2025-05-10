import { NextFunction, Request, Response } from 'express'
import authService from '~/services/authService'

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await authService.register(req.body)
    res.status(response.statusCode).json(response)
  } catch (error) {
    next(error)
  }
}

const verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await authService.verifyEmail(req.query)
    res.status(response.statusCode).json(response)
  } catch (error) {
    next(error)
  }
}

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await authService.login(req.body)
    res.status(response.statusCode).json(response)
  } catch (error) {
    next(error)
  }
}

const authController = {
  register,
  verifyEmail,
  login
}

export default authController
