import Gym from "../entities/Gym.js";

export default interface GymRepository{
  save(gym:Gym):Promise<void>
  findById(gymId:string):Promise<Gym|null>
}