import { apiClient } from "../../../services/apiClient";
import type { AddGymInput } from "@/shared/types/gym/GymApiTypes";

export const addGym=(data:AddGymInput)=>{
  return apiClient.post<string>('/gym',data)
}