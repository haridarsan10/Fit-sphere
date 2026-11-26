import type { MediaStorage } from "../services/MediaStorage.js";
import type GymRepository from "../../domain/repositories/GymRepository.js";
import type GymMediaRepository from "../../domain/repositories/GymMediaRepository.js";


export type DeleteGymMediaInput = {
  gym_id: string;
  media_id: string;
  ownerId: string;
}

export default class DeleteGymMedia {
  constructor(
    private mediastorage: MediaStorage,
    private gymRepo: GymRepository,
    private gymMediaRepo: GymMediaRepository
  ) { }

  async execute(data: DeleteGymMediaInput) {
    const gym = await this.gymRepo.findById(data.gym_id)

    if (!gym) return null

    if (gym.owner_id !== data.ownerId) {
      throw new Error("You are not authorized to access this gym")
    }

    if (!gym.isDraft() && !gym.isRejected()) {
      throw new Error("Only draft and rejected can be edited")
    }

    const gymMedia = await this.gymMediaRepo.findById(data.media_id)

    if (!gymMedia) {
      throw new Error("Gym media not found");
    }

    if (gymMedia.gym_id !== data.gym_id) {
      throw new Error("This media does not belong to this gym");
    }

    const resourceType =gymMedia.type === "VERIFICATION_DOCUMENT" ? "raw" : "image";


    await this.gymMediaRepo.deleteById(gymMedia.id);

    try {
      await this.mediastorage.delete(
        gymMedia.public_id,
        resourceType
      );
    } catch (cleanupError) {
      console.error(
        "Failed to delete Cloudinary asset. Cleanup required:",
        cleanupError
      );
    }

    return { mediaId: gymMedia.id };
  }
}