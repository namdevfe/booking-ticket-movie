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
}

export type RegisterPayloadType = Omit<IUser, 'isVerifiedEmail'>
