import { IUser } from '~/types/userType'

export type RegisterPayloadType = Omit<
  IUser,
  'isVerifiedEmail' | 'verifyToken' | 'verifyExpires' | 'role'
>

export type VerifyEmailPayloadType = Pick<IUser, 'verifyToken'>
