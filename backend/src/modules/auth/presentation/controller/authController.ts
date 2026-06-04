import VerifyOtp from '../../../auth/application/use-cases/VerifyOtp.js'
import Register from '../../application/use-cases/Register.js'
import Login from '../../application/use-cases/Login.js'

export default class authController{
  constructor(
    private verifyOtpCase:VerifyOtp,
    private registerCase:Register,
    private loginCase:Login
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
      const {ownerId,otp}=req.body

      const result=await this.verifyOtpCase.execute({ownerId,otp})

      return res.status(200).json(result)

    } catch (error:any) {
      return res.status(400).json({message:error.message})
    }
  }

  async login(req:any,res:any){
    try {
      const {email,password}=req.body

      const result=await this.loginCase.execute({email,password})

      return res.status(200).json(result)

    } catch (error:any) {
      return res.status(400).json({message:error.message})
    }
  }
  
}