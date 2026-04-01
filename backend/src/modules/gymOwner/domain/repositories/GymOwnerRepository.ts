import GymOwner from "../entities/GymOwner";

export default interface GymOwnerRepository {
  findByEmail(email: string): Promise<GymOwner|null>;
  findById(id:string):Promise<GymOwner|null>
  save(owner: GymOwner): Promise<void>;
}