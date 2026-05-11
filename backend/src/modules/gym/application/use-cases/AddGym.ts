import type GymOwnerRepository from "../../../gymOwner/domain/repositories/GymOwnerRepository.js";
import Gym from "../../domain/entities/Gym.js";
import type GymRepository from "../../domain/repositories/GymRepository.js";
import { v4 as uuidv4 } from "uuid";

type AddGymInput = {
  ownerId: string; 
  name: string;
  description: string;
  address: string;
  contact_phone: string;
  email: string;
  max_members: number;
  max_trainers: number;
};

export default class AddGym{
  constructor(
    private gymOwnerRepository:GymOwnerRepository,
    private gymRepository:GymRepository
  ){}

  async execute(data:AddGymInput){
    const owner=await this.gymOwnerRepository.findById(data.ownerId)

    if(!owner){
      throw new Error('User not found!')
    }

    if(!owner.isActive()){
      throw new Error('User not verified')
    }

    const gym=new Gym({
      id:uuidv4(),
      name:data.name,
      description:data.description,
      address:data.address,
      contact_phone:data.contact_phone,
      email:data.email,
      owner_id:data.ownerId, 
      max_members:data.max_members,
      max_trainers:data.max_trainers
    })

    await this.gymRepository.save(gym)
    return {gymId:gym.id}
  } 
}