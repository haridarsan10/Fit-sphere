import type GymRepository from "../../../gym/domain/repositories/GymRepository.js";

export type ApproveGymInput = {
  gym_id: string;
};

export default class ApproveGym {
  constructor(
    private gymRepo: GymRepository
  ) {}

  async execute(data: ApproveGymInput) {
     const gym=await this.gymRepo.findById(data.gym_id)

    if(!gym){
      throw new Error('Gym does not exist')
    }

    if (!gym.isPending()) {
      throw new Error("Only pending gyms can be approved");
    }

    gym.approve();

    const updatedGym = await this.gymRepo.update(gym)

    return updatedGym
  }
}