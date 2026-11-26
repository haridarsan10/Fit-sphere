import type { MediaStorage, MediaUploadResult, Options, ResourceType, MediaFileMetadata } from "../../../modules/gym/application/services/MediaStorage.js";
import cloudinary from "./cloudinaryConfig.js";

export class CloudinaryMediaStorage implements MediaStorage {

  async upload(file: Buffer, metadata: MediaFileMetadata, options: Options): Promise<MediaUploadResult> {

    return new Promise((resolve, reject) => {   

      const uploadStream = cloudinary.uploader.upload_stream(
        options,
        (error, result) => {

          if (error) {
            return reject(error);
          }

          if (!result) {
            return reject(new Error("Cloudinary upload returned no result"));
          }

          const uploadResult: MediaUploadResult = {
            url: result.secure_url,
            public_id: result.public_id,
            resource_type: result.resource_type as ResourceType,
            file_name: metadata.file_name,
            mime_type: metadata.mime_type,
            file_size: result.bytes,
          };

          resolve(uploadResult);
        }
      );

      uploadStream.end(file);
    });
  }

  async delete(public_id: string, resource_type: ResourceType): Promise<void> {
    const result = await cloudinary.uploader.destroy(public_id, {
      resource_type,
    });

    if (result.result !== "ok") {
      throw new Error(
        `Failed to delete Cloudinary asset: ${result.result}`
      );
    }
  }
}