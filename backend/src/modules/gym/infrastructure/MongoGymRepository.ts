import Gym from "../domain/entities/Gym.js";
import type GymRepository from "../domain/repositories/GymRepository.js"; 
import GymModel from "../../../infrastructure/database/models/GymModel.js";

export default class MongoGymRepository implements GymRepository{

  private toDomain(doc: any): Gym {
    return new Gym({
      id: doc._id.toString(),
      name: doc.name,
      description: doc.description,
      gym_type: doc.gym_type,

      address: {
        address_line_1: doc.address.address_line_1,
        address_line_2: doc.address.address_line_2 ?? null,
        city: doc.address.city,
        district: doc.address.district ?? null,
        state: doc.address.state,
        country: doc.address.country,
        pincode: doc.address.pincode,
        coordinates: doc.address.coordinates ?? null
      },

      contact_phone: doc.contact_phone,
      email: doc.email,

      owner_id: doc.owner_id,

      status: doc.status,
      reject_reason: doc.reject_reason,

      max_members: doc.max_members ?? 0,
      max_trainers: doc.max_trainers ?? 0,

      created_at: doc.created_at,
      updated_at: doc.updated_at,
      deleted_at: doc.deleted_at
    });
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

  async update(gym: Gym): Promise<Gym | null> {
    const updatedGym = await GymModel.findByIdAndUpdate(
      gym.id,
      {
        name: gym.name,
        description: gym.description,
        gym_type: gym.gym_type,

        address: gym.address,

        contact_phone: gym.contact_phone,
        email: gym.email,

        status: gym.status,
        reject_reason: gym.reject_reason,

        max_members: gym.max_members,
        max_trainers: gym.max_trainers,

        updated_at: gym.updated_at,
        deleted_at: gym.deleted_at
      },
      { returnDocument: "after", runValidators: true }
    );

    if (!updatedGym) return null;

    return this.toDomain(updatedGym);
  }


  async create(gym: Gym): Promise<Gym | null> {
    const createdGym = await GymModel.create({
      id: gym.id,
      name: gym.name,
      description: gym.description,
      gym_type: gym.gym_type,

      address: gym.address,

      contact_phone: gym.contact_phone,
      email: gym.email,

      owner_id: gym.owner_id,

      status: gym.status,
      reject_reason: gym.reject_reason,

      max_members: gym.max_members,
      max_trainers: gym.max_trainers,

      created_at: gym.created_at,
      updated_at: gym.updated_at,
      deleted_at: gym.deleted_at
    });

    return this.toDomain(createdGym);
  }


  async findByOwnerId(owner_id: string): Promise<Gym[]> {
    const docs = await GymModel.find({ owner_id });

    return docs.map(doc => this.toDomain(doc));
  }
}