import type { Gym,GymAddress,GymMediaType  } from "./GymTypes";

export interface AddGymInput {
  name: string;
  description: string;
  gym_type: string;
  address: GymAddress;
  contact_phone: string;
  email: string;
}

export interface AddGymMediaInput {
  gym_id: string;
  file: File;
  type: GymMediaType;
  caption?: string;
  display_order?: number;
}

export interface GetGymsResponse {
  hasGym: boolean;
  gyms: Gym[];
}