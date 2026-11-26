import type GymRepository from "../../domain/repositories/GymRepository.js";
import type { GymAddress, GymBusinessDetails, GymContact, GymOperatingHours } from "../../domain/entities/Gym.js";


export interface updateGymInput{
  name?:string,
  description?:string,
  gym_type?:string,
  established_year?:number,
  
  address?:GymAddress,

  contact_phone?:string,
  email?:string,
  contact?:GymContact

  facilities?:string[],
  operating_hours?:GymOperatingHours,
  business_details?:GymBusinessDetails

  max_members?:number,
  max_trainers?:number,
}

export default class UpdateGym{
  constructor(
   private gymRepo:GymRepository
  ){}

  async execute(gymId:string,ownerId:string,updateData:updateGymInput){
    const gym=await this.gymRepo.findById(gymId)
  
    if(!gym)return null    

    if(gym.owner_id!==ownerId){
      throw new Error("You are not authorized to access this gym")
    }

    if (
      updateData.name !== undefined ||
      updateData.description !== undefined ||
      updateData.gym_type !== undefined
    ) {
      gym.updateBasicInformation(
        updateData.name ?? gym.name,
        updateData.description ?? gym.description,
        updateData.gym_type ?? gym.gym_type
      );
    }

    if (updateData.established_year !== undefined) {
      gym.updateEstablishedYear(updateData.established_year)
    }

    if (updateData.address !== undefined) {
      gym.updateAddress(updateData.address);
    }

    if (
      updateData.contact_phone !== undefined ||
      updateData.email !== undefined ||
      updateData.contact !== undefined
    ) {
      gym.updateContact(
        updateData.contact_phone ?? gym.contact_phone,
        updateData.email ?? gym.email,
        updateData.contact ?? gym.contact
      );
    }

    if (updateData.facilities !== undefined) {
      gym.updateFacilities(updateData.facilities);
    }

    if (updateData.operating_hours !== undefined) {
      gym.updateOperatingHours(updateData.operating_hours);
    }

    if (updateData.business_details !== undefined) {
      gym.updateBusinessDetails(updateData.business_details);
    }

    if (
      updateData.max_members !== undefined ||
      updateData.max_trainers !== undefined
    ) {
      gym.updateCapacity(
        updateData.max_members ?? gym.max_members,
        updateData.max_trainers ?? gym.max_trainers
      );
    }

    const updatedGym = await this.gymRepo.update(gym);

    return updatedGym;

    
  }
}