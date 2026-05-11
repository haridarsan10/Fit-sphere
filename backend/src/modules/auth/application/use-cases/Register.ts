import  GymOwnerRepository from "../../../gymOwner/domain/repositories/GymOwnerRepository.js";
import UserRepository from "../../../user/domain/repositories/UserRepository.js";
import 

type RegisterInput={
  firstName:string,
  lastName:string,
  email:string,
  password:string,
  phoneNumber:string,
  role:string
}

export default class Register{
  constructor(){

  }

  async execute(data:RegisterInput){
    
  }
  
}