import GymMedia from "./GymMedia.js";

export type GymStatus =
  | "PENDING"
  | "ACTIVE"
  | "SUSPENDED"
  | "REJECTED";


// Location information
export interface GymAddress {
  address_line_1: string;
  address_line_2?: string | null;

  city: string;
  district?: string | null;
  state: string;
  country: string;
  pincode: string;

  coordinates?: {
    latitude: number;
    longitude: number;
  } | null;
}

// Contact information
export interface GymSocialLinks {
  instagram?: string | null;
  facebook?: string | null;
  youtube?: string | null;
}

export interface GymContact {
  alternate_phone?: string | null;
  website?: string | null;
  social_links?: GymSocialLinks;
}

// Operating hours
export interface DailyOperatingHours {
  is_open: boolean;
  open?: string | null;
  close?: string | null;
}

export interface GymOperatingHours {
  monday: DailyOperatingHours;
  tuesday: DailyOperatingHours;
  wednesday: DailyOperatingHours;
  thursday: DailyOperatingHours;
  friday: DailyOperatingHours;
  saturday: DailyOperatingHours;
  sunday: DailyOperatingHours;
}

// Business verification information
export interface GymBusinessDetails {
  legal_name?: string | null;
  gstin?: string | null;
  registration_number?: string | null;
}

// Gym media collection
export interface GymMediaCollection {
  logo: GymMedia | null;
  cover_image: GymMedia | null;

  gallery: GymMedia[];
  facility_images: GymMedia[];
  verification_documents: GymMedia[];
}

export interface GymProps {
  id: string;

  name: string;
  description: string;
  gym_type: string;
  established_year?: number | null;

  address: GymAddress;

  contact_phone: string;
  email: string;
  contact?: GymContact;

  owner_id: string;

  media?: GymMediaCollection;

  facilities?: string[];
  operating_hours?: GymOperatingHours;

  business_details?: GymBusinessDetails | null;

  status?: GymStatus;
  reject_reason?: string | null;

  max_members: number;
  max_trainers: number;

  created_at?: Date;
  updated_at?: Date | null;
  deleted_at?: Date | null;
}

export default class Gym {
  public readonly id: string;

  public name: string;
  public description: string;
  public gym_type: string;
  public established_year: number | null;

  public address: GymAddress;

  public contact_phone: string;
  public email: string;
  public contact: GymContact;

  public readonly owner_id: string;

  public media: GymMediaCollection;

  public facilities: string[];
  public operating_hours: GymOperatingHours | null;

  public business_details: GymBusinessDetails | null;

  public status: GymStatus;
  public reject_reason: string | null;

  public max_members: number;
  public max_trainers: number;

  public created_at: Date;
  public updated_at: Date | null;
  public deleted_at: Date | null;

  constructor(params: GymProps) {
    this.id = params.id;

    this.name = params.name;
    this.description = params.description;
    this.gym_type = params.gym_type;
    this.established_year = params.established_year ?? null;

    this.address = params.address;

    this.contact_phone = params.contact_phone;
    this.email = params.email;
    this.contact = params.contact ?? {};

    this.owner_id = params.owner_id;

    this.media = params.media ?? {
      logo: null,
      cover_image: null,
      gallery: [],
      facility_images: [],
      verification_documents: [],
    };

    this.facilities = params.facilities ?? [];
    this.operating_hours = params.operating_hours ?? null;

    this.business_details = params.business_details ?? null;

    this.status = params.status ?? "PENDING";
    this.reject_reason = params.reject_reason ?? null;

    this.max_members = params.max_members;
    this.max_trainers = params.max_trainers;

    this.created_at = params.created_at ?? new Date();
    this.updated_at = params.updated_at ?? null;
    this.deleted_at = params.deleted_at ?? null;

    this.validate();
  }

  private validate(): void {
    if (!this.id) {
      throw new Error("Gym ID is required.");
    }

    if (!this.owner_id) {
      throw new Error("Gym owner ID is required.");
    }

    if (!this.name || this.name.trim().length < 3) {
      throw new Error("Gym name must contain at least 3 characters.");
    }

    if (!this.description || !this.description.trim()) {
      throw new Error("Gym description is required.");
    }

    if (!this.address?.address_line_1 ||
        !this.address?.city ||
        !this.address?.state ||
        !this.address?.country ||
        !this.address?.pincode) {
      throw new Error("Complete gym address is required.");
    }

    if (!this.contact_phone || !this.email) {
      throw new Error("Gym contact information is required.");
    }

    if (this.established_year !== null) {
      const current_year = new Date().getFullYear();

      if (
        this.established_year < 1800 ||
        this.established_year > current_year
      ) {
        throw new Error("Invalid gym established year.");
      }
    }

    if (this.max_members < 0 || this.max_trainers < 0) {
      throw new Error("Gym capacity cannot be negative.");
    }

    this.validateMediaOwnership();
  }

  private validateMediaOwnership(): void {
    const all_media = [
      this.media.logo,
      this.media.cover_image,
      ...this.media.gallery,
      ...this.media.facility_images,
      ...this.media.verification_documents,
    ];

    for (const item of all_media) {
      if (item && item.gym_id !== this.id) {
        throw new Error("Media does not belong to this gym.");
      }
    }
  }

  // Status methods

  public isActive(): boolean {
    return this.status === "ACTIVE";
  }

  public isPending(): boolean {
    return this.status === "PENDING";
  }

  public isSuspended(): boolean {
    return this.status === "SUSPENDED";
  }

  public isRejected(): boolean {
    return this.status === "REJECTED";
  }

  public approve(): void {
    if (this.status === "ACTIVE") {
      throw new Error("Gym is already active.");
    }

    if (this.status !== "PENDING") {
      throw new Error("Only pending gyms can be approved.");
    }

    this.status = "ACTIVE";
    this.reject_reason = null;
    this.updated_at = new Date();
  }

  public reject(reason: string): void {
    if (this.status !== "PENDING") {
      throw new Error("Only pending gyms can be rejected.");
    }

    if (!reason.trim()) {
      throw new Error("Rejection reason is required.");
    }

    this.status = "REJECTED";
    this.reject_reason = reason;
    this.updated_at = new Date();
  }

  public suspend(): void {
    if (this.status !== "ACTIVE") {
      throw new Error("Only active gyms can be suspended.");
    }

    this.status = "SUSPENDED";
    this.updated_at = new Date();
  }

  public reactivate(): void {
    if (this.status !== "SUSPENDED") {
      throw new Error("Only suspended gyms can be reactivated.");
    }

    this.status = "ACTIVE";
    this.updated_at = new Date();
  }

  // Gym information methods

  public updateBasicInformation(
    name: string,
    description: string,
    gym_type: string
  ): void {
    if (!name || name.trim().length < 3) {
      throw new Error("Gym name must contain at least 3 characters.");
    }

    if (!description.trim()) {
      throw new Error("Gym description is required.");
    }

    this.name = name;
    this.description = description;
    this.gym_type = gym_type;

    this.updated_at = new Date();
  }

  public updateAddress(address: GymAddress): void {
    if (
      !address.address_line_1 ||
      !address.city ||
      !address.state ||
      !address.country ||
      !address.pincode
    ) {
      throw new Error("Complete gym address is required.");
    }

    this.address = address;
    this.updated_at = new Date();
  }

  public updateContact(
    contact_phone: string,
    email: string,
    contact: GymContact
  ): void {
    if (!contact_phone || !email) {
      throw new Error("Phone number and email are required.");
    }

    this.contact_phone = contact_phone;
    this.email = email;
    this.contact = contact;

    this.updated_at = new Date();
  }

  public updateFacilities(facilities: string[]): void {
    this.facilities = [...new Set(facilities)];
    this.updated_at = new Date();
  }

  public updateOperatingHours(hours: GymOperatingHours): void {
    this.operating_hours = hours;
    this.updated_at = new Date();
  }

  public updateBusinessDetails(
    details: GymBusinessDetails
  ): void {
    this.business_details = details;
    this.updated_at = new Date();
  }

  public updateCapacity(
    max_members: number,
    max_trainers: number
  ): void {
    if (max_members < 0 || max_trainers < 0) {
      throw new Error("Gym capacity cannot be negative.");
    }

    this.max_members = max_members;
    this.max_trainers = max_trainers;

    this.updated_at = new Date();
  }

  // Media methods

  public addMedia(media: GymMedia): void {
    if (media.gym_id !== this.id) {
      throw new Error("Media does not belong to this gym.");
    }

    if (media.isDeleted()) {
      throw new Error("Deleted media cannot be added.");
    }

    switch (media.type) {
      case "LOGO":
        this.media.logo = media;
        break;

      case "COVER_IMAGE":
        this.media.cover_image = media;
        break;

      case "GALLERY":
        this.media.gallery.push(media);
        break;

      case "FACILITY":
        this.media.facility_images.push(media);
        break;

      case "VERIFICATION_DOCUMENT":
        this.media.verification_documents.push(media);
        break;
    }

    this.updated_at = new Date();
  }

  public removeMedia(media_id: string): void {
    const collections = [
      this.media.logo,
      this.media.cover_image,
      ...this.media.gallery,
      ...this.media.facility_images,
      ...this.media.verification_documents,
    ];

    const media = collections.find(
      (item) => item?.id === media_id
    );

    if (!media) {
      throw new Error("Media not found.");
    }

    media.delete();

    if (this.media.logo?.id === media_id) {
      this.media.logo = null;
    }

    if (this.media.cover_image?.id === media_id) {
      this.media.cover_image = null;
    }

    this.media.gallery = this.media.gallery.filter(
      (item) => item.id !== media_id
    );

    this.media.facility_images = this.media.facility_images.filter(
      (item) => item.id !== media_id
    );

    this.media.verification_documents =
      this.media.verification_documents.filter(
        (item) => item.id !== media_id
      );

    this.updated_at = new Date();
  }

  // Soft deletion

  public isDeleted(): boolean {
    return this.deleted_at !== null;
  }

  public delete(): void {
    if (this.isDeleted()) {
      throw new Error("Gym is already deleted.");
    }

    this.deleted_at = new Date();
    this.updated_at = new Date();
  }
}
