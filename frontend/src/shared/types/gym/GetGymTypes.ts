export interface Gym {
  id: string;
  name: string;
  status: string;
  contact_phone: string;
  address: {
    city: string;
    state: string;
  };
}

export interface GetGymsResponse {
  hasGym: boolean;
  gyms: Gym[];
}