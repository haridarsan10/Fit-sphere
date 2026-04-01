import GymOwnerRepository from "../../../gymOwner/domain/repositories/GymOwnerRepository"
import OtpRepository from "../../domain/repositories/OtpRepository"

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

    await this.gymOwnerRepository.save(user)
    await this.otpRepository.deleteByOwnerId(user.id)
  }
}