import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { registerSchema } from '~/schemas/authSchema'
import ApiError from '~/utils/ApiError'

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await registerSchema.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error: any) {
    next(
      new ApiError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        'Validation Error',
        error?.details
      )
    )
  }
}

const authValidation = {
  register
}

export default authValidation
