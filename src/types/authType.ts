import { Request } from 'express'
import { IUser } from '~/types/userType'

export type RegisterPayloadType = Omit<
  IUser,
  | 'isVerifiedEmail'
  | 'verifyToken'
  | 'verifyExpires'
  | 'role'
  | 'refreshToken'
  | 'resetPasswordToken'
  | 'resetPasswordExpires'
>

export type VerifyEmailPayloadType = Pick<IUser, 'verifyToken'>

export type LoginPayloadType = Pick<IUser, 'email' | 'password'>

export type AuthRequestType = Request & {
  user?: any
}

export type RefreshTokenPayloadType = Pick<IUser, 'refreshToken'>

export type LogoutPayloadType = Pick<IUser, 'refreshToken'>

export type ForgotPasswordPayloadType = Pick<IUser, 'email'>

export type ResetPasswordPayloadType = Pick<
  IUser,
  'resetPasswordToken' | 'password'
>

export type RetryActivePayloadType = Pick<IUser, 'email'>
