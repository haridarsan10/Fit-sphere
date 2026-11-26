import Gym from "../domain/entities/Gym.js";
import type GymRepository from "../domain/repositories/GymRepository.js";
import GymModel from "../../../infrastructure/database/models/GymModel.js";
import type GymMediaRepository from "../domain/repositories/GymMediaRepository.js";

export default class MongoGymRepository implements GymRepository {

  constructor(
    private readonly gymMediaRepo: GymMediaRepository
  ) { }

  private async getMediaCollection(gymId: string) {
    const media = await this.gymMediaRepo.findByGymId(gymId)

    return {
      logo: media.find(m => m.type === "LOGO") ?? null,
      cover_image: media.find(m => m.type === "COVER_IMAGE") ?? null,
      gallery: media.filter(m => m.type === "GALLERY"),
      facility_images: media.filter(m => m.type === "FACILITY"),
      verification_documents: media.filter(
        m => m.type === "VERIFICATION_DOCUMENT"
      )
    }

  }

  private async toDomain(doc: any): Promise<Gym> {

    const media = await this.getMediaCollection(doc.id)

    return new Gym({
      id: doc.id,
      name: doc.name,
      description: doc.description,
      gym_type: doc.gym_type,
      established_year: doc.established_year ?? null,

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
      contact: doc.contact ?? {},

      owner_id: doc.owner_id,

      media: media,

      facilities: doc.facilities ?? [],
      operating_hours: doc.operating_hours ?? null,

      business_details: doc.business_details ?? null,

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
    const doc = await GymModel.findOne({ id: gymId })

    if (!doc) return null

    const gymData = await this.toDomain(doc)

    if (doc.updated_at) {
      gymData.updated_at = new Date(doc.updated_at)
    }

    if (doc.deleted_at) {
      gymData.deleted_at = new Date(doc.deleted_at)
    }

    return gymData
  }

  async update(gym: Gym): Promise<Gym | null> {
    const updatedGym = await GymModel.findOneAndUpdate(
      { id: gym.id },
      {
        name: gym.name,
        description: gym.description,
        gym_type: gym.gym_type,
        established_year: gym.established_year,

        address: gym.address,

        contact_phone: gym.contact_phone,
        email: gym.email,
        contact: gym.contact,

        facilities: gym.facilities,
        operating_hours: gym.operating_hours,

        business_details: gym.business_details,

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

    return await this.toDomain(updatedGym);
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

      established_year: gym.established_year,
      contact: gym.contact,
      facilities: gym.facilities,
      operating_hours: gym.operating_hours,
      business_details: gym.business_details,

      status: gym.status,
      reject_reason: gym.reject_reason,

      max_members: gym.max_members,
      max_trainers: gym.max_trainers,

      created_at: gym.created_at,
      updated_at: gym.updated_at,
      deleted_at: gym.deleted_at
    });

    return await this.toDomain(createdGym);
  }


  async findByOwnerId(owner_id: string): Promise<Gym[]> {
    const docs = await GymModel.find({ owner_id });

    return Promise.all(docs.map(doc => this.toDomain(doc)));
  }
}