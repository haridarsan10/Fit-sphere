import type GymRepository from "../../domain/repositories/GymRepository.js";
import Gym from "../../domain/entities/Gym.js";

export default class GetGyms{
  constructor(
    private gymRepo:GymRepository
  ){}

  async execute(ownerId:string){
    const gyms=await this.gymRepo.findByOwnerId(ownerId)

    return{
      hasGym:gyms.length>0,
      gyms
    }
  }
}
