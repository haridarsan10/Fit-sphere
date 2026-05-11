import SendOtp from '../../../auth/application/use-cases/SendOtp.js'
import VerifyOtp from '../../../auth/application/use-cases/VerifyOtp.js'


export default class authController{
  constructor(
    private sendOtpCase:SendOtp,
    private verifyOtpCase:VerifyOtp
  ){}

  

  async sendOtp(req:any,res:any){
    try {

      const {email}=req.body

      const result=await this.sendOtpCase.execute(email)

      return res.status(200).json(result)
      
    } catch (error:any) {
      return res.status(400).json({message:error.message})
    }
  }

  async verifyOtp(req:any,res:any){
    try {
      const {email,otp}=req.body

      const result=await this.verifyOtpCase.execute({email,otp})

      return res.status(200).json(result)

    } catch (error:any) {
      return res.status(400).json({message:error.message})
    }
  }
}