import type { Gym,GymAddress } from "./GymTypes";

export interface AddGymInput {
  name: string;
  description: string;
  gym_type: string;
  address: GymAddress;
  contact_phone: string;
  email: string;
}

export interface GetGymsResponse {
  hasGym: boolean;
  gyms: Gym[];
}