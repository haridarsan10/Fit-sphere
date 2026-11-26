
import type { GymMediaType } from "../domain/entities/GymMedia.js";
import GymMedia from "../domain/entities/GymMedia.js";
import type GymMediaRepository from "../domain/repositories/GymMediaRepository.js";
import GymMediaModel from "../../../infrastructure/database/models/GymMediaModel.js";

export default class MongoGymMediaRepository implements GymMediaRepository {

  private toDomain(doc: any): GymMedia {
    return new GymMedia({
      id: doc.id,
      gym_id: doc.gym_id,
      type: doc.type,
      url: doc.url,
      public_id: doc.public_id,
      file_name: doc.file_name,
      mime_type: doc.mime_type,
      file_size: doc.file_size,
      caption: doc.caption,
      display_order: doc.display_order,
    });
  }

  async create(media: GymMedia): Promise<GymMedia> {
    const createdGymMedia = await GymMediaModel.create({
      id: media.id,
      gym_id: media.gym_id,
      type: media.type,
      url: media.url,
      public_id: media.public_id,
      file_name: media.file_name,
      mime_type: media.mime_type,
      file_size: media.file_size,
      caption: media.caption,
      display_order: media.display_order,
    });

    return this.toDomain(createdGymMedia);
  }

  async findByGymId(gymId: string): Promise<GymMedia[]> {
    const docs = await GymMediaModel.find({
      gym_id: gymId,
      deleted_at: null,
    });

    return docs.map(doc => this.toDomain(doc));
  }

  async findById(id: string): Promise<GymMedia | null> {
    const doc = await GymMediaModel.findOne({
      id,
      deleted_at: null,
    });

    if (!doc) return null;

    return this.toDomain(doc);
  }

  async findByGymIdAndType(
    gymId: string,
    type: GymMediaType
  ): Promise<GymMedia[]> {
    const docs = await GymMediaModel.find({
      gym_id: gymId,
      type,
      deleted_at: null,
    });

    return docs.map(doc => this.toDomain(doc));
  }

  async update(media: GymMedia): Promise<GymMedia> {
    const updatedDoc = await GymMediaModel.findOneAndUpdate(
      {
        id: media.id,
        gym_id: media.gym_id,
        deleted_at: null,
      },
      {
        $set: {
          type: media.type,
          url: media.url,
          public_id: media.public_id,
          file_name: media.file_name,
          mime_type: media.mime_type,
          file_size: media.file_size,
          caption: media.caption,
          display_order: media.display_order,
          updated_at: new Date(),
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedDoc) {
      throw new Error("Gym media not found");
    }

    return this.toDomain(updatedDoc);
  }

  async deleteById(id: string): Promise<void> {
    const deletedDoc = await GymMediaModel.findOneAndDelete({ id });

    if (!deletedDoc) {
      throw new Error("Gym media not found");
    }
  }
}
