export interface IApiResponse<T = any> {
  statusCode: number
  message: string
  data?: T
}

export interface IValidationError {
  field: string
  message: string
}
