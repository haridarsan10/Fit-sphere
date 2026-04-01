import OtpRepository from "../../domain/repositories/OtpRepository"
import GymOwnerRepository from "../../../gymOwner/domain/repositories/GymOwnerRepository"
import Otp from "../../domain/entities/Otp"
import OtpGenerator from "../services/OtpGenerator";
import OtpService from "../services/OtpService";
import { v4 as uuidv4 } from "uuid";


type SendOtpInput={
  email:string
}

export default class SendOtp{
  constructor(
    private otpRepository:OtpRepository,
    private gymOwnerRepository:GymOwnerRepository,
    private otpService:OtpService,
    private otpGenerator:OtpGenerator
  ){}
  
  
  async execute(data:SendOtpInput){
    const user=await this.gymOwnerRepository.findByEmail(data.email)

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
      id:uuidv4(),
      ownerId:user.id,
      code:code,
      expiresAt:new Date(Date.now() + 5 * 60 * 1000)
    })

    await this.otpRepository.save(otp)
    await this.otpService.send(user.email,code)
  }
}