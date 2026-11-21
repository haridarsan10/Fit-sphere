import { apiClient } from "@/services/apiClient"
import type { GymFormValues } from "../schemas/GymSchema";

export const updateGym= async ({gymId,updatedData}: {
  gymId: string;
  updatedData: GymFormValues;
}) => {
  const response= await apiClient.patch<string>(`/gym/${gymId}`,updatedData)
  console.log(response.data)
  return response.data
}