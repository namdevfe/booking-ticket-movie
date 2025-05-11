import { NextFunction, Request, Response } from 'express'
import authService from '~/services/authService'
import { AuthRequestType } from '~/types/authType'

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

const getProfile = async (
  req: AuthRequestType,
  res: Response,
  next: NextFunction
) => {
  const uid = req.user?.uid

  try {
    if (uid) {
      const response = await authService.getProfile(uid)
      res.status(response.statusCode).json(response)
    }
  } catch (error) {
    next(error)
  }
}

const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await authService.refreshToken(req.body)
    res.status(response.statusCode).json(response)
  } catch (error) {
    next(error)
  }
}

const authController = {
  register,
  verifyEmail,
  login,
  getProfile,
  refreshToken
}

export default authController
