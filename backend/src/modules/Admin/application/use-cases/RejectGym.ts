import type GymRepository from "../../../gym/domain/repositories/GymRepository.js";

export type RejectGymInput = {
  gym_id: string;
  reason: string;
};

export default class RejectGym {
  constructor(private gymRepo: GymRepository) {}

  async execute(data: RejectGymInput) {
    const gym = await this.gymRepo.findById(data.gym_id);

    if (!gym) {
      throw new Error("Gym does not exist");
    }

    const reason = data.reason.trim();

    if (!reason) {
      throw new Error("Rejection reason is required");
    }

    if (!gym.isPending()) {
      throw new Error("Only pending gyms can be rejected");
    }

    gym.reject(reason);

    const updatedGym = await this.gymRepo.update(gym);

    return updatedGym;
  }
}