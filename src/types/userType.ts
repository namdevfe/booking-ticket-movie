export enum Gender {
  MALE = 'male',
  FEMALE = 'female'
}

export interface IUser {
  email: string
  password: string
  firstName: string
  lastName: string
  dateOfBirth: Date
  gender: Gender
  avatar?: string
  isVerifiedEmail?: boolean
  verifyToken?: string
  verifyExpires?: number
}

export type RegisterPayloadType = Omit<
  IUser,
  'isVerifiedEmail' | 'verifyToken' | 'verifyExpires'
>
