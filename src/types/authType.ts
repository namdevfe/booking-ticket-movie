import { IUser } from '~/types/userType'

export type RegisterPayloadType = Omit<
  IUser,
  'isVerifiedEmail' | 'verifyToken' | 'verifyExpires' | 'role' | 'refreshToken'
>

export type VerifyEmailPayloadType = Pick<IUser, 'verifyToken'>

export type LoginPayloadType = Pick<IUser, 'email' | 'password'>
