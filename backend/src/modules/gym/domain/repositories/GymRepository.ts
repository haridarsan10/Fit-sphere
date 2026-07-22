import Gym from "../entities/Gym.js";

export default interface GymRepository{
  create(gym:Gym):Promise<Gym|null>
  update(gym:Gym):Promise<Gym|null>
  findById(gymId:string):Promise<Gym|null>
  findByOwnerId(owner_id:string):Promise<Gym[]>
}