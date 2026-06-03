import type AccountRepository from "../../domain/repositories/AccountRepository.js"
import type OtpRepository from "../../domain/repositories/OtpRepository.js"

type VerifyOtpInput={
  email:string,
  otp:string
}

export default class VerifyOtp{
  constructor(
    private accountRepository:AccountRepository,
    private otpRepository:OtpRepository
  ){}

  async execute(data:VerifyOtpInput){
    const user=await this.accountRepository.findByEmail(data.email)

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
     
     await this.accountRepository.update(user);

    
    await this.otpRepository.deleteByOwnerId(user.id)

     return {
      success:true,
      message:"User verified successfully"
    }
  }
}