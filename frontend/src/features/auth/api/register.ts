import { apiClient } from "@/services/apiClient";
import type { RegisterRequest,RegisterResponse } from "@/shared/types/registerTypes";

export const register=(data:RegisterRequest)=>{
  return apiClient.post<RegisterResponse>('/api/auth/register',data)
}