import express, { Request, Response } from 'express'

const APP_HOSTNAME = 'localhost'
const APP_PORT = 8017

const app = express()

app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Hello word'
  })
})

app.listen(APP_PORT, () => {
  console.log(`Server is running on http://${APP_HOSTNAME}:${APP_PORT}`)
})
