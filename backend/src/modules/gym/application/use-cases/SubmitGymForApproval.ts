import type GymRepository from "../../domain/repositories/GymRepository.js";

export type SubmitGymForApprovalInput = {
  gym_id: string;
  ownerId: string;
};

export default class SubmitGymForApproval {
  constructor(
    private gymRepo: GymRepository
  ){}

  async execute(data: SubmitGymForApprovalInput) {
    const gym=await this.gymRepo.findById(data.gym_id)

    if(!gym){
      throw new Error('Gym does not exist')
    }

    if (gym.owner_id !== data.ownerId) {
      throw new Error("You are not authorized to access this gym");
    }

    if(!gym.isProfileComplete()){
      throw new Error('Please complete your profile for approval')
    }

    if (!gym.isDraft() && !gym.isRejected()) {
      throw new Error("Only draft and rejected gyms can be submitted");
    }

    gym.submitForApproval()

    const updatedGym= await this.gymRepo.update(gym)

    return updatedGym
  }
}