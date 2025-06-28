import mongoose from 'mongoose'
import { ICinema } from '~/types/cinemaType'

const cinemaSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true },
    name: { type: String, requried: true },
    description: { type: String },
    coverImage: { type: String },
    images: [{ type: String }],
    phoneNumber: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    position: {
      longtitude: { type: Number },
      latitude: { type: Number }
    }
  },
  {
    timestamps: true
  }
)



const Cinema = mongoose.model<ICinema>('cinemas', cinemaSchema)

export default Cinema
