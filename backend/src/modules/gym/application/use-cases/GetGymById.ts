import type GymRepository from "../../domain/repositories/GymRepository.js";

export default class GetGymById{
  constructor(
    private gymRepo:GymRepository
  ){}

  async execute(gymId:string,ownerId:string){
    
    const gym=await this.gymRepo.findById(gymId)
  
    if(!gym)return null    

    if(gym.owner_id!==ownerId){
      throw new Error("You are not authorized to access this gym")
    }

    return gym
  }
}