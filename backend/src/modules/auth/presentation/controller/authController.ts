import VerifyOtp from '../../../auth/application/use-cases/VerifyOtp.js'
import Register from '../../application/use-cases/Register.js'

export default class authController{
  constructor(
    private verifyOtpCase:VerifyOtp,
    private registerCase:Register
  ){}

  async register(req:any,res:any){
   try {

    const {firstName,lastName,email,password,confirmPassword,role}=req.body


    const result=await this.registerCase.execute({firstName,lastName,email,password,confirmPassword,role})


    return res.status(201).json(result)

   } catch (error:any) {
    return res.status(400).json({message:error.message})
   }
    
  }


  async verifyOtp(req:any,res:any){
    try {
      const {email,otp}=req.body

      console.log(req.body)

      const result=await this.verifyOtpCase.execute({email,otp})

      return res.status(200).json(result)

    } catch (error:any) {
      return res.status(400).json({message:error.message})
    }
  }
}