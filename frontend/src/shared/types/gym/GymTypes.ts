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

export type GymStatus =
  | "PENDING"
  | "ACTIVE"
  | "SUSPENDED"
  | "REJECTED";

export type GymMediaType =
  | "LOGO"
  | "COVER_IMAGE"
  | "GALLERY"
  | "FACILITY"
  | "VERIFICATION_DOCUMENT";

export interface GymMedia {
  id: string;
  gym_id: string;
  type: GymMediaType;
  url: string;
  public_id: string;
  file_name?: string | null;
  mime_type?: string | null;
  file_size?: number | null;
  caption?: string | null;
  display_order: number;
  created_at?: string;
  updated_at?: string | null;
}

export interface GymMediaCollection {
  logo: GymMedia | null;
  cover_image: GymMedia | null;
  gallery: GymMedia[];
  facility_images: GymMedia[];
  verification_documents: GymMedia[];
}

export interface GymContact {
  alternate_phone?: string | null;
  website?: string | null;
  social_links?: {
    instagram?: string | null;
    facebook?: string | null;
    youtube?: string | null;
  } | null;
}

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

export interface GymBusinessDetails {
  legal_name?: string | null;
  gstin?: string | null;
  registration_number?: string | null;
}

export interface Gym {
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

  media: GymMediaCollection;
  facilities: string[];
  operating_hours: GymOperatingHours | null;
  business_details: GymBusinessDetails | null;

  status: GymStatus;
  reject_reason?: string | null;

  max_members: number;
  max_trainers: number;

  created_at: string;
  updated_at?: string | null;
  deleted_at?: string | null;
}
