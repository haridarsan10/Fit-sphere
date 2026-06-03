import type OtpService from "../../modules/auth/application/services/OtpService.js";
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'


export default class EmailOtpService implements OtpService{
  async send(email: string, code: string): Promise<void> {

    dotenv.config()

    const mailTransport=nodemailer.createTransport(
      {
        service:'gmail',
        auth:{
          user:process.env.EMAIL,
          pass:process.env.EMAIL_PASSWORD
        }
      }
    )

    const mailDetails={
      form:'haridarsan10@gmail.com',
      to:email,
      subject:'OTP VERIFICATION',
      text: 
      `Thankyou for using FIT-SPHERE
      
      Please enter the confirmation code to complete the email address registration process

      Confirmation code:${code}
      
      Thankyou`
    }

     mailTransport.sendMail(mailDetails,
      function(err,data){
        if(err){
          console.error('Mail error',err)
          throw new Error('Failed to send verification mail')
        }else{
          console.log('Email send successfully')
        }
      }
    )
  }
}