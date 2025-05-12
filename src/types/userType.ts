export enum Gender {
  MALE = 'male',
  FEMALE = 'female'
}

export enum Role {
  ADMIN,
  USER
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
  role: Role
  refreshToken?: string
  resetPasswordToken?: string
  resetPasswordExpires?: number
}
