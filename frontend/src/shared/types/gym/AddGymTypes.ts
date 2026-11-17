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


export interface AddGymInput{
  name: string;
  description: string;
  gym_type: string;
  address: GymAddress;
  contact_phone: string;
  email: string;
}
