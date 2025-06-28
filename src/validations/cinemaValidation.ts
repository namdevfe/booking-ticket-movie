import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Joi from "joi";
import { createCinemaSchema } from "~/schemas/cinemaSchema";
import { IValidationError } from "~/types/commonType";
import ApiError from "~/utils/ApiError";

const createCinema = async (req: Request, _: Response, next: NextFunction) => {
  try {
    await createCinemaSchema.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    if (error instanceof Joi.ValidationError) {
      next(
        new ApiError(
          StatusCodes.UNPROCESSABLE_ENTITY,
          'Validation Error',
          error?.details.map((errorItem) => ({
            field: errorItem.context?.key,
            message: errorItem.message
          })) as IValidationError[]
        )
      )
    }

    next(error)
  }
}

const cinemaValidation = {
  createCinema
}

export default cinemaValidation