import crypto from 'crypto'
import { StatusCodes } from 'http-status-codes'
import { env } from '~/config/environment'
import User from '~/models/userModel'
import {
  LoginPayloadType,
  RegisterPayloadType,
  VerifyEmailPayloadType
} from '~/types/authType'
import { IApiResponse } from '~/types/commonType'
import ApiError from '~/utils/ApiError'
import sendMail from '~/utils/sendMail'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { generateAccessToken, generateRefreshToken } from '~/utils/jwt'

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
          <a href='http://${env.APP_HOST}:${env.APP_PORT}/api/v1/auth/verify-email?verifyToken=${verifyToken}'>
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

const login = async (payload: LoginPayloadType): Promise<IApiResponse> => {
  const { email, password } = payload

  try {
    // Check existing account
    const existingUser = await User.findOne({ email })
    if (!existingUser) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Account does not exist!')
    }

    // Check password
    const isCorrectPassword = await bcrypt.compare(
      password,
      existingUser.password
    )
    if (!isCorrectPassword) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid credentials!')
    }

    // Check email has been verify
    if (!existingUser.isVerifiedEmail) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        'Your account has been actived!'
      )
    }

    // Generate token (accessToken, refreshToken)
    const accessToken = generateAccessToken({ uid: existingUser._id })
    const refreshToken = generateRefreshToken({ uid: existingUser._id })

    existingUser.refreshToken = refreshToken
    await existingUser.save()

    return {
      statusCode: StatusCodes.OK,
      message: 'Login successfully.',
      data: {
        accessToken,
        refreshToken
      }
    }
  } catch (error) {
    throw error
  }
}

const getProfile = async (uid: string): Promise<IApiResponse> => {
  try {
    const excludeFields = '-password -verifyToken -verifyExpires -refreshToken'
    const user = await User.findById(uid).select(excludeFields)

    if (!user) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'User does not found!')
    }

    return {
      statusCode: StatusCodes.OK,
      message: 'Get profile successfully.',
      data: user
    }
  } catch (error) {
    throw error
  }
}

const authService = {
  register,
  verifyEmail,
  login,
  getProfile
}

export default authService
