import Gym,{type GymProps} from "../domain/entities/Gym.js";
import type GymRepository from "../domain/repositories/GymRepository.js"; 
import GymModel from "../../../infrastructure/database/models/GymModel.js";

export default class MongoGymRepository implements GymRepository{

  private toDomain(doc:any):Gym{
    return new Gym({
      id:doc.id,
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
      created_at:doc.created_at
    })
  }


  async findById(gymId: string): Promise<Gym | null> {
    const doc=await GymModel.findById(gymId)

    if(!doc) return null

    const gymData=this.toDomain(doc)

    if (doc.updated_at) {
      gymData.updated_at = new Date(doc.updated_at)
    }

    if (doc.deleted_at) {
      gymData.deleted_at = new Date(doc.deleted_at)
    }

    return gymData
  }

  async update(gym: Gym): Promise<Gym|null> {
    const updatedGym=await GymModel.findByIdAndUpdate(
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
      {returnDocument: 'after'}
    )

    if (!updatedGym) return null;
    
    return this.toDomain(updatedGym)
  }

  async create(gym: Gym): Promise<Gym|null> {
    try {

      const createdGym=await GymModel.create({
        id:gym.id,
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
      })

      return this.toDomain(createdGym)

    } catch (error) {
      throw error
    }
  }

  async findByOwnerId(owner_id: string): Promise<Gym[]> {
    const docs = await GymModel.find({ owner_id });

    return docs.map(doc => this.toDomain(doc));

  }
}