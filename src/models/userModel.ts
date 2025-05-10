import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import { Gender, IUser, Role } from '~/types/userType'

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, enum: Gender, required: true },
    avatar: { type: String },
    isVerifiedEmail: { type: Boolean, default: false },
    verifyToken: { type: String },
    verifyExpires: { type: Number },
    role: { type: String, enum: Role, required: true, default: Role.USER }
  },
  {
    timestamps: true
  }
)

userSchema.pre('save', async function (next) {
  if (!this.isModified()) return next()

  try {
    this.password = await bcrypt.hash(this.password, 8)
    next()
  } catch (error: any) {
    next(error)
  }
})

const User = mongoose.model<IUser>('users', userSchema)

export default User
