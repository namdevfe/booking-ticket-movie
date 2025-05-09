class ApiError extends Error {
  statusCode: number
  errors?: any[]

  constructor(statusCode: number, message: string, errors?: any[]) {
    super(message)
    this.name = 'ApiError'
    this.statusCode = statusCode
    this.errors = errors
    Error.captureStackTrace(this, this.constructor)
  }
}

export default ApiError
