import type GymOwnerRepository from "../../../gymOwner/domain/repositories/GymOwnerRepository.js"
import type OtpRepository from "../../domain/repositories/OtpRepository.js"

type VerifyOtpInput={
  email:string,
  otp:string
}

export default class VerifyOtp{
  constructor(
    private gymOwnerRepository:GymOwnerRepository,
    private otpRepository:OtpRepository
  ){}

  async execute(data:VerifyOtpInput){
    const user=await this.gymOwnerRepository.findByEmail(data.email)

    if(!user){
      throw new Error('User not found!')
    }

    const otp=await this.otpRepository.findByOwnerId(user.id)

    if(otp?.isExpired()){
      throw new Error('Otp expired!')
    }

    if(!otp?.match(data.otp)){
      throw new Error('Otp not matched!')
    }

    user.activate()

    await this.gymOwnerRepository.create(user)
    await this.otpRepository.deleteByOwnerId(user.id)
  }
}