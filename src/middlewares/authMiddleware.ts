import { NextFunction, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import jwt from 'jsonwebtoken'
import { env } from '~/config/environment'
import User from '~/models/userModel'
import { AuthRequestType } from '~/types/authType'
import { Role } from '~/types/userType'
import ApiError from '~/utils/ApiError'

const authMiddleware =
  (rolesRequired?: Role[]) =>
  (req: AuthRequestType, _: Response, next: NextFunction) => {
    try {
      const bearerToken = req.headers.authorization

      if (!bearerToken) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, 'Token is required!')
      }

      const token = bearerToken?.split(' ')?.[1]

      jwt.verify(
        token,
        env.JWT_ACCESS_TOKEN_SECRET_KEY,
        async (error, decode) => {
          if (error) {
            if (error instanceof jwt.TokenExpiredError) {
              next(new ApiError(StatusCodes.UNAUTHORIZED, 'Token expired!'))
            } else {
              next(new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid token!'))
            }
          }

          // Check role
          if (rolesRequired && rolesRequired.length > 0) {
            // Get role of user
            const user = await User.findById((decode as any).uid)

            if (!user) {
              next(
                new ApiError(StatusCodes.BAD_REQUEST, 'User does not exist!')
              )
            }

            const isCheckedRole = rolesRequired.some(
              (role) => role.toString() === user?.role.toString()
            )

            if (!isCheckedRole) {
              next(new ApiError(StatusCodes.FORBIDDEN, 'Permission denined!'))
            }
          }

          req.user = decode
          next()
        }
      )
    } catch (error) {
      next(error)
    }
  }

export default authMiddleware
