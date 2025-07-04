import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'
import {
  forgotPasswordSchema,
  loginSchema,
  logoutSchema,
  refreshTokenSchema,
  registerSchema,
  resetPasswordSchema,
  retryActiveSchema,
  verifyEmailSchema
} from '~/schemas/authSchema'
import ApiError from '~/utils/ApiError'

const register = async (req: Request, _: Response, next: NextFunction) => {
  try {
    await registerSchema.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error: any) {
    if (error instanceof Joi.ValidationError) {
      next(
        new ApiError(
          StatusCodes.UNPROCESSABLE_ENTITY,
          'Validation Error',
          error?.details
        )
      )
    }

    next(error)
  }
}

const verifyEmail = async (req: Request, _: Response, next: NextFunction) => {
  try {
    await verifyEmailSchema.validateAsync(req.query, {
      abortEarly: false
    })
    next()
  } catch (error: any) {
    if (error instanceof Joi.ValidationError) {
      next(
        new ApiError(
          StatusCodes.UNPROCESSABLE_ENTITY,
          'Validation Error',
          error?.details
        )
      )
    }

    next(error)
  }
}

const login = async (req: Request, _: Response, next: NextFunction) => {
  try {
    await loginSchema.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    if (error instanceof Joi.ValidationError) {
      next(
        new ApiError(
          StatusCodes.UNPROCESSABLE_ENTITY,
          'Validation Error',
          error?.details
        )
      )
    }

    next(error)
  }
}

const refreshToken = async (req: Request, _: Response, next: NextFunction) => {
  try {
    await refreshTokenSchema.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    if (error instanceof Joi.ValidationError) {
      next(
        new ApiError(
          StatusCodes.UNPROCESSABLE_ENTITY,
          'Validation Error',
          error?.details
        )
      )
    }

    next(error)
  }
}

const logout = async (req: Request, _: Response, next: NextFunction) => {
  try {
    await logoutSchema.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    if (error instanceof Joi.ValidationError) {
      next(
        new ApiError(
          StatusCodes.UNPROCESSABLE_ENTITY,
          'Validation Error',
          error?.details
        )
      )
    }

    next(error)
  }
}

const forgotPassword = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  try {
    await forgotPasswordSchema.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    if (error instanceof Joi.ValidationError) {
      next(
        new ApiError(
          StatusCodes.UNPROCESSABLE_ENTITY,
          'Validation Error',
          error?.details
        )
      )
    }

    next(error)
  }
}

const resetPassword = async (req: Request, _: Response, next: NextFunction) => {
  try {
    await resetPasswordSchema.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    if (error instanceof Joi.ValidationError) {
      next(
        new ApiError(
          StatusCodes.UNPROCESSABLE_ENTITY,
          'Validation Error',
          error?.details
        )
      )
    }

    next(error)
  }
}

const retryActive = async (req: Request, _: Response, next: NextFunction) => {
  try {
    await retryActiveSchema.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    if (error instanceof Joi.ValidationError) {
      next(
        new ApiError(
          StatusCodes.UNPROCESSABLE_ENTITY,
          'Validation Error',
          error?.details
        )
      )
    }

    next(error)
  }
}

const authValidation = {
  register,
  verifyEmail,
  login,
  refreshToken,
  logout,
  forgotPassword,
  resetPassword,
  retryActive
}

export default authValidation
