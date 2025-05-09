import { StatusCodes } from 'http-status-codes'
import User from '~/models/userModel'
import { RegisterPayloadType } from '~/types/userType'
import ApiError from '~/utils/ApiError'

const register = async (payload: RegisterPayloadType): Promise<any> => {
  const { email } = payload

  try {
    const existingUser = await User.findOne({ email })

    if (existingUser) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Email has already exist!')
    }

    const newUser = new User(payload)
    await newUser.save()

    if (newUser._id) {
      return {
        statusCode: StatusCodes.CREATED,
        message: 'Account registered successfully! Welcome to QNCinema.'
      }
    }
  } catch (error) {
    throw error
  }
}

const authService = {
  register
}

export default authService
