import { OAuth2Client } from 'google-auth-library'
import { StatusCodes } from 'http-status-codes'
import nodemailer, { TransportOptions } from 'nodemailer'

interface IMailOptions {
  email: string
  subject: string
  content: string
}

const sendMail = async ({ email, subject, content }: IMailOptions) => {
  if (!email) return

  try {
    /** Init OAuth2Client with ClientID - ClientSecret */
    const myOAuth2Client = new OAuth2Client(
      process.env.GOOGLE_MAILER_CLIENT_ID as string,
      process.env.GOOGLE_MAILER_CLIENT_SECRET as string
    )

    /** Set refreshToken to OAuth2Client */
    myOAuth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_MAILER_REFRESH_TOKEN as string
    })

    /**
     * Lấy AccessToken từ RefreshToken (bởi vì Access Token cứ một khoảng thời gian ngắn sẽ bị hết hạn)
     * Vì vậy mỗi lần sử dụng Access Token, chúng ta sẽ generate ra một thằng mới là chắc chắn nhất.
     */
    const response = await myOAuth2Client.getAccessToken()

    const accessToken = response.token

    // Tạo một biến Transport từ Nodemailer với đầy đủ cấu hình, dùng để gọi hành động gửi mail
    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.ADMIN_EMAIL_ADDRESS as string,
        clientId: process.env.GOOGLE_MAILER_CLIENT_ID,
        clientSecret: process.env.GOOGLE_MAILER_CLIENT_SECRET,
        refresh_token: process.env.GOOGLE_MAILER_REFRESH_TOKEN,
        accessToken
      }
    } as TransportOptions)

    const mailOptions = {
      to: email,
      subject: subject,
      html: `${content}`
    }

    await transport.sendMail(mailOptions)

    return {
      statusCode: StatusCodes.OK,
      message: 'Email sent successfully.'
    }
  } catch (error) {
    throw error
  }
}

export default sendMail
