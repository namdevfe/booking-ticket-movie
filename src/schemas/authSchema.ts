import Joi from 'joi'
import {
  LoginPayloadType,
  RegisterPayloadType,
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
