import type GymOwnerRepository from "../../domain/repositories/GymOwnerRepository.js";
import type PasswordHasher from "../../../auth/application/services/PasswordHasher.js"
import type TokenService from "../../../auth/application/services/TokenService.js";

type LoginInput={
  email:string
  password:string
}

export default class LoginGymOwner{
    constructor(
      private gymOwnerRepository:GymOwnerRepository,
      private passwordHasher:PasswordHasher,
      private tokenService:TokenService
    ){}

    async execute(data:LoginInput){
      const user=await this.gymOwnerRepository.findByEmail(data.email)

      if(!user){
        throw new Error('Invalid email or password')
      }

      if(!user.isActive()){
        throw new Error('User is not verified!')
      }

      const passwordMatch=await this.passwordHasher.compare(data.password,user.password)

      if(!passwordMatch){
        throw new Error('Invalid email or password')
      }

      const JWT=this.tokenService.generate(user.id,user.email,"GYM_OWNER")

      return {
        accessToken:JWT
      }

    }
  }