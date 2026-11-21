import GymMedia from "../entities/GymMedia.js"
import type { GymMediaType } from "../entities/GymMedia.js";

export default interface GymMediaRepository{
  create(media:GymMedia):Promise<GymMedia>
  findById(id: string): Promise<GymMedia | null>;
  findByGymId(gymId: string): Promise<GymMedia[]>;
  findByGymIdAndType(gymId: string,type: GymMediaType): Promise<GymMedia[]>;
  update(media: GymMedia): Promise<GymMedia>;
  deleteById(id: string): Promise<void>;
}