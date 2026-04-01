import Gym from "../domain/entities/Gym";
import GymRepository from "../domain/repositories/GymRepository"; 
import GymModel from "../../../infrastructure/database/models/GymModel";

export default class MongoGymRepository implements GymRepository{
  async findById(gymId: string): Promise<Gym | null> {
    const doc=await GymModel.findById(gymId)

    if(!doc) return null

    return new Gym({
      id:doc._id.toString(),
      name:doc.name,
      description:doc.description,
      address:doc.address,
      contact_phone:doc.contact_phone,
      email:doc.email,
      owner_id:doc.owner_id,
      status:doc.status,
      reject_reason:doc.reject_reason,
      max_members:doc.max_members,
      max_trainers:doc.max_trainers,
      created_at:doc.created_at,
      updated_at: doc.updated_at?new Date(doc.updated_at):undefined,
      deleted_at: doc.deleted_at?new Date(doc.deleted_at):undefined
    })
  }

  async save(gym: Gym): Promise<void> {
    await GymModel.findByIdAndUpdate(
      gym.id,
      {
        name:gym.name,
        description:gym.description,
        address:gym.address,
        contact_phone:gym.contact_phone,
        email:gym.email,
        owner_id:gym.owner_id,
        status:gym.status,
        reject_reason:gym.reject_reason,
        max_members:gym.max_members,
        max_trainers:gym.max_trainers,
        created_at:gym.created_at,
        updated_at:gym.updated_at,
        deleted_at:gym.deleted_at
      },
      {upsert:true,new:true}
    )
  }
}