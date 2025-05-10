import { StatusCodes } from 'http-status-codes'
import User from '~/models/userModel'
import ApiError from '~/utils/ApiError'
import sendMail from '~/utils/sendMail'
import crypto from 'crypto'
import { RegisterPayloadType, VerifyEmailPayloadType } from '~/types/authType'

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
      // Generate verifyToken - verifyExpires
      const verifyToken = crypto.randomBytes(16).toString('hex')
      const verifyExpires = Date.now() + 5 * 60 * 1000

      newUser.verifyToken = verifyToken
      newUser.verifyExpires = verifyExpires
      await newUser.save()

      // Send email request user verify email
      const sentEmail = await sendMail({
        email: newUser.email,
        subject: 'Email verification',
        content: `<div>
          Please click to link bellow:
          <a href='http://localhost:8017/api/v1/auth/verify-email?verifyToken=${verifyToken}'>
            Verify Email
          </a>
        </div>`
      })

      if (sentEmail?.statusCode === StatusCodes.OK)
        return {
          statusCode: StatusCodes.OK,
          message: 'Please check your email to verify account!'
        }
    }
  } catch (error) {
    throw error
  }
}

const verifyEmail = async (payload: VerifyEmailPayloadType): Promise<any> => {
  const { verifyToken } = payload

  try {
    const user = await User.findOne({ verifyToken })

    if (!user) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid token!')
    }

    // Check expires time of token
    if (Number(user.verifyExpires) <= Date.now()) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Token is expired!')
    }

    user.isVerifiedEmail = true
    user.verifyExpires = undefined
    user.verifyToken = undefined
    await user.save()

    return {
      statusCode: StatusCodes.OK,
      message: 'Your account is actived.'
    }
  } catch (error) {
    throw error
  }
}

const authService = {
  register,
  verifyEmail
}

export default authService
