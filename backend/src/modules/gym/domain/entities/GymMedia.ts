
export type GymMediaType =
  | "LOGO"
  | "COVER_IMAGE"
  | "GALLERY"
  | "FACILITY"
  | "VERIFICATION_DOCUMENT";

export interface GymMediaProps {
  id: string;
  gym_id: string;

  type: GymMediaType;

  url: string;
  public_id: string;

  file_name?: string | null;
  mime_type?: string | null;
  file_size?: number | null;

  caption?: string | null;
  display_order?: number;

  created_at?: Date;
  updated_at?: Date | null;
  deleted_at?: Date | null;
}

export default class GymMedia {
  public readonly id: string;
  public readonly gym_id: string;

  public type: GymMediaType;

  public url: string;
  public public_id: string;

  public file_name: string | null;
  public mime_type: string | null;
  public file_size: number | null;

  public caption: string | null;
  public display_order: number;

  public created_at: Date;
  public updated_at: Date | null;
  public deleted_at: Date | null;

  constructor(params: GymMediaProps) {
    this.id = params.id;
    this.gym_id = params.gym_id;

    this.type = params.type;

    this.url = params.url;
    this.public_id = params.public_id;

    this.file_name = params.file_name ?? null;
    this.mime_type = params.mime_type ?? null;
    this.file_size = params.file_size ?? null;

    this.caption = params.caption ?? null;
    this.display_order = params.display_order ?? 0;

    this.created_at = params.created_at ?? new Date();
    this.updated_at = params.updated_at ?? null;
    this.deleted_at = params.deleted_at ?? null;

    this.validate();
  }

  private validate(): void {
    if (!this.id) {
      throw new Error("Media ID is required.");
    }

    if (!this.gym_id) {
      throw new Error("Gym ID is required.");
    }

    if (!this.url) {
      throw new Error("Media URL is required.");
    }

    if (!this.public_id) {
      throw new Error("Media public ID is required.");
    }

    if (this.file_size !== null && this.file_size <= 0) {
      throw new Error("Media file size must be greater than zero.");
    }

    if (this.display_order < 0) {
      throw new Error("Display order cannot be negative.");
    }
  }

  public updateCaption(caption: string): void {
    this.caption = caption;
    this.updated_at = new Date();
  }

  public updateDisplayOrder(order: number): void {
    if (order < 0) {
      throw new Error("Display order cannot be negative.");
    }

    this.display_order = order;
    this.updated_at = new Date();
  }

  public updateUrl(url: string, public_id: string): void {
    if (!url || !public_id) {
      throw new Error("Media URL and public ID are required.");
    }

    this.url = url;
    this.public_id = public_id;
    this.updated_at = new Date();
  }

  public isDeleted(): boolean {
    return this.deleted_at !== null;
  }

  public delete(): void {
    if (this.isDeleted()) {
      throw new Error("Media is already deleted.");
    }

    this.deleted_at = new Date();
    this.updated_at = new Date();
  }
}
