import type { MediaStorage } from "../services/MediaStorage.js";
import type GymRepository from "../../domain/repositories/GymRepository.js";
import type GymMediaRepository from "../../domain/repositories/GymMediaRepository.js";
import type { GymMediaType } from "../../domain/entities/GymMedia.js";
import GymMedia from "../../domain/entities/GymMedia.js";
import { v4 as uuidv4 } from "uuid";
import validateGymMedia from "../validators/validateGymMedia.js";


export type UpdateGymMediaInput = {
  gym_id: string,
  media_id: string;
  ownerId: string,
  file: Buffer
  file_name: string,
  type: GymMediaType
  mime_type: string
  caption: string
  display_order: number
}

export default class UpdateGymMedia {
  constructor(
    private mediastorage: MediaStorage,
    private gymRepo: GymRepository,
    private gymMediaRepo: GymMediaRepository
  ) { }

  async execute(data: UpdateGymMediaInput) {
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

    validateGymMedia(
      gymMedia.type,
      data.mime_type,
      data.file.length
    );

    const resourceType = data.type === "VERIFICATION_DOCUMENT" ? "raw" : "image";

    const oldPublicId = gymMedia.public_id;
    const oldResourceType = resourceType;


    const result = await this.mediastorage.upload(data.file, { file_name: data.file_name, mime_type: data.mime_type }, { folder: `fitsphere/gyms/${data.gym_id}/${data.type.toLowerCase()}`, resource_type: resourceType })


    const updatedGymMedia = new GymMedia({
      id: gymMedia.id,
      gym_id: gymMedia.gym_id,
      type: gymMedia.type,
      url: result.url,
      public_id: result.public_id,
      file_name: data.file_name,
      mime_type: data.mime_type,
      file_size: result.file_size,
      caption: data.caption ?? gymMedia.caption,
      display_order: data.display_order ?? gymMedia.display_order
    });

    let savedMedia;

    try {
      savedMedia = await this.gymMediaRepo.update(updatedGymMedia);

      if (!savedMedia) {
        throw new Error("Failed to update gym media");
      }
    } catch (error) {
      try {

        await this.mediastorage.delete(result.public_id,result.resource_type);

      } catch (cleanupError) {

        console.error(
          "Failed to clean up new Cloudinary asset:",
          cleanupError
        )

      }

      throw error;
    }

    if (oldPublicId) {
      try {
        await this.mediastorage.delete(oldPublicId,oldResourceType);
      } catch (cleanupError) {
        console.error("Failed to delete old Cloudinary asset:",cleanupError);
      }
    }

    return savedMedia
  }

}