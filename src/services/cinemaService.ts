import { StatusCodes } from "http-status-codes";
import Cinema from "~/models/cinemaModel";
import { CreateCinemaType } from "~/types/cinemaType";
import { IApiResponse } from "~/types/commonType";
import ApiError from "~/utils/ApiError";
import { slugify } from "~/utils/slugify";

const createCinema = async (reqBody: CreateCinemaType): Promise<IApiResponse> => {
  const { name } = reqBody

  try {
    const existingCinema = await Cinema.findOne({ name })

    if (existingCinema) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'This name cinema had already exist')
    }

    const createData = {
      ...reqBody,
      slug: slugify(name)
    }

    const createdCinema = await Cinema.create(createData)

    return {
      statusCode: StatusCodes.CREATED,
      message: 'Create new cinema is successfully',
      data: createdCinema
    }    
  } catch (error) {
    throw error
  }
}

const cinemaService = {
  createCinema
}

export default cinemaService