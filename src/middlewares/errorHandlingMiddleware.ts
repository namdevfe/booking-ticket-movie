import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

interface ResponseError {
  statusCode: number
  message: string
  errors?: any
  stack?: string
}

const errorHandlingMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR

  const responseError: ResponseError = {
    statusCode,
    message: err.message || StatusCodes[statusCode],
    errors: err.errors || [],
    stack: err.stack
  }

  res.status(responseError.statusCode).json(responseError)
}

export default errorHandlingMiddleware
