import type  AccountRepository from "../../domain/repositories/AccountRepository.js"
import type PasswordHasher from "../services/PasswordHasher.js"
import type TokenService from "../services/TokenService.js"

type LoginInput={
  email:string,
  password:string
}


export default class Login{
  constructor(
    private accRepository:AccountRepository,
    private passHash:PasswordHasher,
    private tokenService:TokenService
  ){}

  async execute(data:LoginInput){

    const user=await this.accRepository.findByEmail(data.email)

    if(!user){
      throw new Error('User not found!')
    }

    if(!user.isActive()){
      throw new Error('User not verified')
    }

    const match=await this.passHash.compare(data.password,user.password)

    if(!match){
      throw new Error('Password does not match!')
    }

    const token=await this.tokenService.generate(user.id,user.email,user.role)

    return {
      accessToken:token
    }
  }
}