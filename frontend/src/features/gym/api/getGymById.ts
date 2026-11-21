import { apiClient } from "@/services/apiClient";
import type { Gym } from "@/shared/types/gym/GymTypes";

export const getGymById=async (gymId:string):Promise<Gym>=>{

  const response= await apiClient.get<Gym>(`/gym/${gymId}`)

  return response.data
}