import Gym from "../entities/Gym";

export default interface GymRepository{
  save(gym:Gym):Promise<void>
  findById(gymId:string):Promise<Gym|null>
}