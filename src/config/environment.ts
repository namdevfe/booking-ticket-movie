import 'dotenv/config'

export const env = {
  BUILD_MODE: process.env.BUILD_MODE as string,
  APP_HOST: process.env.APP_HOST as string,
  APP_PORT: Number(process.env.APP_PORT),
  APP_CLIENT: process.env.APP_CLIENT as string,
  MONGODB_CONNECTION_STRING: process.env.MONGODB_CONNECTION_STRING as string,
  GOOGLE_MAILER_CLIENT_ID: process.env.GOOGLE_MAILER_CLIENT_ID as string,
  GOOGLE_MAILER_CLIENT_SECRET: process.env
    .GOOGLE_MAILER_CLIENT_SECRET as string,
  GOOGLE_MAILER_REFRESH_TOKEN: process.env
    .GOOGLE_MAILER_REFRESH_TOKEN as string,
  ADMIN_EMAIL_ADDRESS: process.env.ADMIN_EMAIL_ADDRESS as string,
  JWT_ACCESS_TOKEN_SECRET_KEY: process.env
    .JWT_ACCESS_TOKEN_SECRET_KEY as string,
  JWT_REFRESH_TOKEN_SECRET_KEY: process.env
    .JWT_REFRESH_TOKEN_SECRET_KEY as string,
  JWT_ACCESS_TOKEN_EXPIRES: process.env.JWT_ACCESS_TOKEN_EXPIRES as string,
  JWT_REFRESH_TOKEN_EXPIRES: process.env.JWT_REFRESH_TOKEN_EXPIRES as string
}
