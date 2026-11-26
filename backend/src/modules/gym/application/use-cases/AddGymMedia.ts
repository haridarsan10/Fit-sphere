import type { MediaStorage } from "../services/MediaStorage.js";
import type GymRepository from "../../domain/repositories/GymRepository.js";
import type GymMediaRepository from "../../domain/repositories/GymMediaRepository.js";
import type { GymMediaType } from "../../domain/entities/GymMedia.js";
import GymMedia from "../../domain/entities/GymMedia.js";
import { v4 as uuidv4 } from "uuid";
import validateGymMedia from "../validators/validateGymMedia.js";


export type AddGymMediaInput = {
  gym_id: string,
  ownerId: string,
  file: Buffer
  file_name: string
  mime_type: string
  type: GymMediaType
  caption: string
  display_order: number
}

export default class AddGymMedia {
  constructor(
    private mediastorage: MediaStorage,
    private gymRepo: GymRepository,
    private gymMediaRepo: GymMediaRepository
  ) { }

  async execute(data: AddGymMediaInput) {
    const gym=await this.gymRepo.findById(data.gym_id)
  
    if(!gym)return null    

    if(gym.owner_id!==data.ownerId){
      throw new Error("You are not authorized to access this gym")
    }

    if(!gym.isDraft() && !gym.isPending()){
      throw new Error("Only draft and pending can be edited")
    }

    validateGymMedia(
      data.type,
      data.mime_type,
      data.file.length
    );

    const resourceType = data.type === "VERIFICATION_DOCUMENT" ? "raw" : "image";

    const result=await this.mediastorage.upload(data.file,{file_name:data.file_name,mime_type:data.mime_type},{folder:`fitsphere/gyms/${data.gym_id}/${data.type.toLowerCase()}`,resource_type: resourceType})    

    const gymMedia=new GymMedia({
      id: uuidv4(),
      gym_id:data.gym_id,
      type:data.type,
      url:result.url,
      public_id:result.public_id,
      file_name:data.file_name,
      mime_type:data.mime_type,
      file_size:result.file_size,
      caption:data.caption,
      display_order:data.display_order
    })


    try {
        const savedMedia = await this.gymMediaRepo.create(gymMedia);

        return savedMedia;
      } catch (error) {
        try {
          await this.mediastorage.delete(result.public_id,result.resource_type);
        } catch (cleanupError) {
          console.error(
            "Failed to clean up Cloudinary asset:",
            cleanupError
          );
        }
        throw error;
      }
  }

}