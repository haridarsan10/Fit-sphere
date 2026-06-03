import type OtpRepository from "../../domain/repositories/OtpRepository.js"
import type AccountRepository from "../../domain/repositories/AccountRepository.js";
import Otp from "../../domain/entities/Otp.js"
import type OtpGenerator from "../services/OtpGenerator.js";
import type OtpService from "../services/OtpService.js";
import { v4 as uuidv4 } from "uuid";



export default class SendOtp{
  constructor(
    private otpRepository:OtpRepository,
    private accountRepository:AccountRepository,
    private otpService:OtpService,
    private otpGenerator:OtpGenerator
  ){}
  
  
  async execute(data:string){
    const user=await this.accountRepository.findByEmail(data)

    if(!user){
      throw new Error("User not found!");
    }

    if (user.status === "ACTIVE") {
      throw new Error("Account already verified");
    }

    
    const existingOtp=await this.otpRepository.findByOwnerId(user.id)

    if(existingOtp){
      await this.otpRepository.deleteByOwnerId(user.id)
    }

    const code= this.otpGenerator.generate()


    const otp = new Otp({
      ownerId:user.id,
      code:code,
      expiresAt:new Date(Date.now() + 5 * 60 * 1000)
    })

    await this.otpRepository.save(otp)
   
    await this.otpService.send(user.email,code)
  }
}