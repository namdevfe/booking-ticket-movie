import Joi from 'joi'
import { RegisterPayloadType, VerifyEmailPayloadType } from '~/types/authType'
import { Gender } from '~/types/userType'

export const registerSchema = Joi.object<RegisterPayloadType>({
  email: Joi.string()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
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
