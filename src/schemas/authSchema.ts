import Joi from 'joi'
import {
  ForgotPasswordPayloadType,
  LoginPayloadType,
  LogoutPayloadType,
  RefreshTokenPayloadType,
  RegisterPayloadType,
  ResetPasswordPayloadType,
  VerifyEmailPayloadType
} from '~/types/authType'
import { Gender } from '~/types/userType'

export const registerSchema = Joi.object<RegisterPayloadType>({
  email: Joi.string()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ['com'] } })
    .trim()
    .strict(),
  password: Joi.string().required().min(6).trim().strict(),
  firstName: Joi.string().required().trim().strict(),
  lastName: Joi.string().required().trim().strict(),
  gender: Joi.string()
    .valid(...Object.values(Gender))
    .required(),
  avatar: Joi.string().optional(),
  dateOfBirth: Joi.date().required()
})

export const verifyEmailSchema = Joi.object<VerifyEmailPayloadType>({
  verifyToken: Joi.string().required().trim().strict()
})

export const loginSchema = Joi.object<LoginPayloadType>({
  email: Joi.string()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ['com'] } })
    .trim()
    .strict(),
  password: Joi.string().required().min(6).trim().strict()
})

export const refreshTokenSchema = Joi.object<RefreshTokenPayloadType>({
  refreshToken: Joi.string().required().trim().strict()
})

export const logoutSchema = Joi.object<LogoutPayloadType>({
  refreshToken: Joi.string().required().trim().strict()
})

export const forgotPasswordSchema = Joi.object<ForgotPasswordPayloadType>({
  email: Joi.string()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ['com'] } })
    .trim()
    .strict()
})

export const resetPasswordSchema = Joi.object<ResetPasswordPayloadType>({
  resetPasswordToken: Joi.string().required().trim().strict(),
  password: Joi.string().required().min(6).trim().strict()
})
