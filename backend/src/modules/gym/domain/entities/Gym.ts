import GymMedia from "./GymMedia.js";

export type GymStatus =
  | "DRAFT"
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

    this.status = params.status ?? "DRAFT";
    this.reject_reason = params.reject_reason ?? null;

    this.max_members = params.max_members;
    this.max_trainers = params.max_trainers;

    this.created_at = params.created_at ?? new Date();
    this.updated_at = params.updated_at ?? null;
    this.deleted_at = params.deleted_at ?? null;

    this.validate();
  }

  
  // =========================
  // VALIDATION
  // =========================

  private validate(): void {
    if (!this.id?.trim()) {
      throw new Error("Gym ID is required.");
    }

    if (!this.owner_id?.trim()) {
      throw new Error("Gym owner ID is required.");
    }

    if (!this.name || this.name.trim().length < 3) {
      throw new Error("Gym name must contain at least 3 characters.");
    }

    if (!this.description?.trim()) {
      throw new Error("Gym description is required.");
    }

    this.validateAddress(this.address);

    if (!this.contact_phone?.trim() || !this.email?.trim()) {
      throw new Error("Gym contact information is required.");
    }

    if (this.established_year !== null) {
      const current_year = new Date().getFullYear();

      if (
        !Number.isInteger(this.established_year) ||
        this.established_year < 1800 ||
        this.established_year > current_year
      ) {
        throw new Error("Invalid gym established year.");
      }
    }

    if (
      !Number.isInteger(this.max_members) ||
      !Number.isInteger(this.max_trainers) ||
      this.max_members < 0 ||
      this.max_trainers < 0
    ) {
      throw new Error("Gym capacity must be non-negative integers.");
    }

    this.validateMediaOwnership();
  }

  private validateAddress(address: GymAddress): void {
    if (
      !address?.address_line_1?.trim() ||
      !address?.city?.trim() ||
      !address?.state?.trim() ||
      !address?.country?.trim() ||
      !address?.pincode?.trim()
    ) {
      throw new Error("Complete gym address is required.");
    }
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

  // =========================
  // DELETED GYM PROTECTION
  // =========================

  private ensureNotDeleted(): void {
    if (this.isDeleted()) {
      throw new Error("Cannot perform operations on a deleted gym.");
    }
  }

  // =========================
  // STATUS CHECKS
  // =========================

  public isActive(): boolean {
    return this.status === "ACTIVE";
  }

  public isPending(): boolean {
    return this.status === "PENDING";
  }

  public isDraft(): boolean {
    return this.status === "DRAFT";
  }

  public isSuspended(): boolean {
    return this.status === "SUSPENDED";
  }

  public isRejected(): boolean {
    return this.status === "REJECTED";
  }

  // =========================
  // PROFILE COMPLETION
  // =========================

  public calculateProfileCompletion(): number {
    const checks = [
      this.name.trim().length >= 3,
      !!this.description.trim(),
      !!this.gym_type.trim(),

      !!this.address.address_line_1?.trim(),
      !!this.address.city?.trim(),
      !!this.address.state?.trim(),
      !!this.address.country?.trim(),
      !!this.address.pincode?.trim(),

      !!this.contact_phone.trim(),
      !!this.email.trim(),

      this.isOperatingHoursComplete(),
      this.facilities.length > 0,

      this.media.logo !== null,
      this.media.cover_image !== null,
      this.media.verification_documents.length > 0,
    ];

    const completed = checks.filter(Boolean).length;

    return Math.round((completed / checks.length) * 100);
  }

  public isProfileComplete(): boolean {
    return this.calculateProfileCompletion() === 100;
  }

  private isOperatingHoursComplete(): boolean {
    if (!this.operating_hours) {
      return false;
    }

    const days = Object.values(this.operating_hours);

    return days.length === 7 && days.every((day) => {
      if (day.is_open) {
        return !!day.open?.trim() && !!day.close?.trim();
      }

      return true;
    });
  }

  // =========================
  // STATUS TRANSITIONS
  // =========================

  public submitForApproval(): void {
    this.ensureNotDeleted();

    if (!this.isDraft()) {
      throw new Error("Only draft gyms can be submitted for approval.");
    }

    if (!this.isProfileComplete()) {
      throw new Error(
        `Gym profile is incomplete. Current completion: ${this.calculateProfileCompletion()}%.`
      );
    }

    this.status = "PENDING";
    this.updated_at = new Date();
  }

  public reviseRejectedGym(): void {
    this.ensureNotDeleted();

    if (!this.isRejected()) {
      throw new Error("Only rejected gyms can be revised.");
    }

    this.status = "DRAFT";
    this.reject_reason = null;
    this.updated_at = new Date();
  }

  public approve(): void {
    this.ensureNotDeleted();

    if (!this.isPending()) {
      throw new Error("Only pending gyms can be approved.");
    }

    this.status = "ACTIVE";
    this.reject_reason = null;
    this.updated_at = new Date();
  }

  public reject(reason: string): void {
    this.ensureNotDeleted();

    if (!this.isPending()) {
      throw new Error("Only pending gyms can be rejected.");
    }

    if (!reason?.trim()) {
      throw new Error("Rejection reason is required.");
    }

    this.status = "REJECTED";
    this.reject_reason = reason.trim();
    this.updated_at = new Date();
  }

  public suspend(): void {
    this.ensureNotDeleted();

    if (!this.isActive()) {
      throw new Error("Only active gyms can be suspended.");
    }

    this.status = "SUSPENDED";
    this.updated_at = new Date();
  }

  public reactivate(): void {
    this.ensureNotDeleted();

    if (!this.isSuspended()) {
      throw new Error("Only suspended gyms can be reactivated.");
    }

    this.status = "ACTIVE";
    this.updated_at = new Date();
  }

  // =========================
  // BASIC INFORMATION
  // =========================

  public updateBasicInformation(
    name: string,
    description: string,
    gym_type: string
  ): void {
    this.ensureNotDeleted();

    if (!name?.trim() || name.trim().length < 3) {
      throw new Error("Gym name must contain at least 3 characters.");
    }

    if (!description?.trim()) {
      throw new Error("Gym description is required.");
    }

    if (!gym_type?.trim()) {
      throw new Error("Gym type is required.");
    }

    this.name = name.trim();
    this.description = description.trim();
    this.gym_type = gym_type.trim();

    this.updated_at = new Date();
  }

  public updateEstablishedYear(
    established_year: number | null
  ): void {
    this.ensureNotDeleted();

    if (established_year !== null) {
      const current_year = new Date().getFullYear();

      if (
        !Number.isInteger(established_year) ||
        established_year < 1800 ||
        established_year > current_year
      ) {
        throw new Error("Invalid gym established year.");
      }
    }

    this.established_year = established_year;
    this.updated_at = new Date();
  }

  public updateAddress(address: GymAddress): void {
    this.ensureNotDeleted();
    this.validateAddress(address);

    this.address = address;
    this.updated_at = new Date();
  }

  public updateContact(
    contact_phone: string,
    email: string,
    contact: GymContact
  ): void {
    this.ensureNotDeleted();

    if (!contact_phone?.trim() || !email?.trim()) {
      throw new Error("Phone number and email are required.");
    }

    this.contact_phone = contact_phone.trim();
    this.email = email.trim();
    this.contact = contact;

    this.updated_at = new Date();
  }

  // =========================
  // FACILITIES
  // =========================

  public updateFacilities(facilities: string[]): void {
    this.ensureNotDeleted();

    if (!Array.isArray(facilities)) {
      throw new Error("Facilities must be an array.");
    }

    this.facilities = [
      ...new Set(
        facilities
          .filter((facility) => typeof facility === "string")
          .map((facility) => facility.trim())
          .filter(Boolean)
      ),
    ];

    this.updated_at = new Date();
  }

  // =========================
  // OPERATING HOURS
  // =========================

  public updateOperatingHours(hours: GymOperatingHours): void {
    this.ensureNotDeleted();

    const days = Object.values(hours);

    if (days.length !== 7) {
      throw new Error("Operating hours must contain all seven days.");
    }

    for (const day of days) {
      if (typeof day.is_open !== "boolean") {
        throw new Error("Invalid operating day configuration.");
      }

      if (day.is_open) {
        if (!day.open || !day.close) {
          throw new Error("Opening and closing times are required.");
        }

        const time_pattern = /^([01]\d|2[0-3]):[0-5]\d$/;

        if (
          !time_pattern.test(day.open) ||
          !time_pattern.test(day.close) ||
          day.open === day.close
        ) {
          throw new Error("Invalid operating hours.");
        }
      }
    }

    this.operating_hours = hours;
    this.updated_at = new Date();
  }

  // =========================
  // BUSINESS DETAILS
  // =========================

  public updateBusinessDetails(
    details: GymBusinessDetails
  ): void {
    this.ensureNotDeleted();

    this.business_details = details;
    this.updated_at = new Date();
  }

  // =========================
  // CAPACITY
  // =========================

  public updateCapacity(
    max_members: number,
    max_trainers: number
  ): void {
    this.ensureNotDeleted();

    if (
      !Number.isInteger(max_members) ||
      !Number.isInteger(max_trainers) ||
      max_members < 0 ||
      max_trainers < 0
    ) {
      throw new Error("Gym capacity must be non-negative integers.");
    }

    this.max_members = max_members;
    this.max_trainers = max_trainers;

    this.updated_at = new Date();
  }

  // =========================
  // MEDIA
  // =========================

  public addMedia(media: GymMedia): void {
    this.ensureNotDeleted();

    if (media.gym_id !== this.id) {
      throw new Error("Media does not belong to this gym.");
    }

    if (media.isDeleted()) {
      throw new Error("Deleted media cannot be added.");
    }

    const all_media = [
      this.media.logo,
      this.media.cover_image,
      ...this.media.gallery,
      ...this.media.facility_images,
      ...this.media.verification_documents,
    ];

    if (all_media.some((item) => item?.id === media.id)) {
      throw new Error("Media is already attached to this gym.");
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
    this.ensureNotDeleted();

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

  // =========================
  // SOFT DELETION
  // =========================

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