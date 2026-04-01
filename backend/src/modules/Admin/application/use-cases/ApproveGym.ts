import GymRepository from "../../../gym/domain/repositories/GymRepository"

type ApproveGymInput={
  gymId:string
}


export default class ApproveGym{
  constructor(
    private gymRepository:GymRepository
  ){}

  async execute(data:ApproveGymInput){
    const gym=await this.gymRepository.findById(data.gymId)

    if(!gym){
      throw new Error('Gym not found!')
    }

    if(gym.isActive()){
      throw new Error('Gym is Active!')
    }

    gym.approve()
    await this.gymRepository.save(gym)

    return {
      gymId:gym.id
    }
  }
}