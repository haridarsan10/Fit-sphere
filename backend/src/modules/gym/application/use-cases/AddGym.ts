import Gym from "../../domain/entities/Gym.js";
import type GymRepository from "../../domain/repositories/GymRepository.js";
import type { GymAddress,GymContact,GymOperatingHours,GymBusinessDetails } from "../../domain/entities/Gym.js";
import { v4 as uuidv4 } from "uuid";

type AddGymInput = {
  name: string;
  description: string;
  gym_type: string;
  established_year: number;
  address: GymAddress;
  contact_phone: string;
  email: string;
  contact: GymContact;
  facilities: string[];
  operating_hours: GymOperatingHours;
  business_details: GymBusinessDetails ;
  max_members: number;
  max_trainers: number;
  owner_id:string
};

export default class AddGym{
  constructor(
    private gymRepository:GymRepository
  ){}

  async execute(data:AddGymInput){
    
    const gym = new Gym({
      id: uuidv4(),
      name: data.name,
      description: data.description,
      gym_type: data.gym_type,
      established_year:data.established_year,
      address: data.address,
      contact_phone: data.contact_phone,
      email: data.email,
      contact:data.contact,
      facilities:data.facilities,
      operating_hours:data.operating_hours,
      business_details:data.business_details, 
      owner_id: data.owner_id,
      max_members: data.max_members,
      max_trainers: data.max_trainers
    });

    await this.gymRepository.create(gym)
    return {gymId:gym.id}
  } 
}