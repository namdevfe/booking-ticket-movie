import Joi from "joi";
import { REGEX } from "~/constants/validate";
import { CreateCinemaType, IPosition } from "~/types/cinemaType";

export const createCinemaSchema = Joi.object<CreateCinemaType>({
  name: Joi.string().required().max(256).trim().strict(),
  address: Joi.string().required().max(256).trim().strict(),
  coverImage: Joi.string().trim().strict().optional().allow(null, ''),
  description: Joi.string().optional().allow(null, ''),
  images: Joi.array().items(Joi.string()).optional().default([]),
  phoneNumber: Joi.string().pattern(new RegExp(REGEX.PHONE_NUMBER)).trim().strict(),
  position: Joi.object<IPosition>({
    latitude: Joi.number(),
    longtitude: Joi.number(),
  }).optional().allow(null)
})