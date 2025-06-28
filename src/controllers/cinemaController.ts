import { NextFunction, Request, Response } from "express";
import cinemaService from "~/services/cinemaService";

const createCinema = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await cinemaService.createCinema(req.body)
    res.status(response.statusCode).json(response)
  } catch (error) {
    next(error)
  }
}

const cinemaController = {
  createCinema
}

export default cinemaController