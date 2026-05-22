import Account from "../../domain/entities/Account.js";
import type AccountRepository from "../../domain/repositories/AccountRepository.js";
import type PasswordHasher from "../services/PasswordHasher.js";
import type { Role } from "../../domain/entities/Account.js";
import { v4 as uuidv4 } from "uuid";


type RegisterInput={
  firstName:string,
  lastName:string,
  email:string,
  password:string,
  confirmPassword:string,
  role:Role
}

export default class Register{
  constructor(
    private accountRepository:AccountRepository,
    private passHasher:PasswordHasher
  ){}

   async execute(data:RegisterInput){
    const existingUser=await this.accountRepository.findByEmail(data.email)


    if(existingUser){
      throw new Error('Email already exists')
    }

    const hashedPassword=await this.passHasher.hash(data.password)

    console.log(hashedPassword)

    const account=new Account({
      id: uuidv4(),
      firstName:data.firstName,
      lastName:data.lastName,
      email:data.email,
      password:hashedPassword,
      role:data.role
    })


    await this.accountRepository.create(account)

    console.log('Saved to DB')

    return {
      success:true,
      message:"User registered successfully"
    }
   }

}