import LoginGymOwner from '../../application/use-cases/LoginGymOwner.js'
import RegisterGymOwner from '../../application/use-cases/RegisterGymOwner.js'

export default class GymOwnerController{
  constructor(
    private registerGymOwner:RegisterGymOwner,
    private loginGymOwner:LoginGymOwner,
  ){}

  async register(req:any,res:any){
    try {

      const {firstName,lastName,email,password,phoneNumber}=req.body
      const result=await this.registerGymOwner.execute({
        firstName,
        lastName,
        email,
        password,
        phoneNumber
      })

      return res.status(201).json(result)

    } catch (error:any) {
      return res.status(400).json({message:error.message})
    }
  } 

  async login(req:any,res:any){
    try {
      
      const {email,password}=req.body
      
      const result=await this.loginGymOwner.execute({email,password})

      return res.status(200).json(result)

    } catch (error:any) {
      return res.status(400).json({message:error.message})
    }
  }
}