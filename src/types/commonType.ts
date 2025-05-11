export interface IApiResponse<T = any> {
  statusCode: number
  message: string
  data?: T
}
