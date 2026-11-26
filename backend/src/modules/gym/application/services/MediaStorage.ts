
export type ResourceType = "image" | "raw" | "video";

export type Options = {
  folder: string;
  resource_type: "image" | "raw";
};

export type MediaUploadResult = {
  url: string;
  public_id: string;
  resource_type: ResourceType;
  file_name: string;
  mime_type: string;
  file_size: number;
};

export type MediaFileMetadata = {
  file_name: string;
  mime_type: string;
};

export interface MediaStorage {
  upload(file: Buffer,metadata: MediaFileMetadata,options: Options): Promise<MediaUploadResult>;
  delete(public_id: string,resource_type: ResourceType): Promise<void>;
}
