import { apiClient } from "../../../services/apiClient";
import type { LoginRequest,LoginResponse } from "../../../shared/types/auth/loginTypes";


export const login=(data:LoginRequest)=>{
  return apiClient.post<LoginResponse>('/api/auth/login',data)
}

