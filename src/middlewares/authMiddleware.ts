import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import jwt from 'jsonwebtoken'
import { env } from '~/config/environment'
import { AuthRequestType } from '~/types/authType'

const authMiddleware = (
  req: AuthRequestType,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(' ')?.[1]

    if (!token) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, 'Token is required!')
    }

    jwt.verify(token, env.JWT_ACCESS_TOKEN_SECRET_KEY, (error, decode) => {
      if (error) {
        if (error instanceof jwt.TokenExpiredError) {
          throw new ApiError(StatusCodes.UNAUTHORIZED, 'Token expired!')
        } else {
          throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid token!')
        }
      } else {
        req.user = decode
        next()
      }
    })
  } catch (error) {
    next(error)
  }
}

export default authMiddleware
