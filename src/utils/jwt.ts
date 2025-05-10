import jwt from 'jsonwebtoken'
import { env } from '~/config/environment'

export const generateAccessToken = (data: any) => {
  return jwt.sign(data, env.JWT_ACCESS_TOKEN_SECRET_KEY, {
    expiresIn: env.JWT_ACCESS_TOKEN_EXPIRES
  } as jwt.SignOptions)
}

export const generateRefreshToken = (data: any) => {
  return jwt.sign(data, env.JWT_REFRESH_TOKEN_SECRET_KEY, {
    expiresIn: env.JWT_ACCESS_TOKEN_EXPIRES
  } as jwt.SignOptions)
}
