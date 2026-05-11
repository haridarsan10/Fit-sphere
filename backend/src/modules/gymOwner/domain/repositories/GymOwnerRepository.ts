import GymOwner from "../entities/GymOwner.js";

export default interface GymOwnerRepository {
  findByEmail(email: string): Promise<GymOwner|null>;
  findById(id:string):Promise<GymOwner|null>
  create(user:GymOwner):Promise<GymOwner|null>
  update(user: GymOwner): Promise<GymOwner|null>;
}