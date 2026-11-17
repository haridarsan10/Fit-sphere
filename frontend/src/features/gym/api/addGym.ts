import { apiClient } from "../../../services/apiClient";
import type { AddGymInput } from "@/shared/types/gym/AddGymTypes";

export const addGym=(data:AddGymInput)=>{
  return apiClient.post<string>('/gym',data)
}