import { apiClient } from "@/services/apiClient"
import type { VerifyOtpRequest,VerifyOtpResponse } from "@/shared/types/auth/verifyOtpTypes"

export const verifyotp=(data:VerifyOtpRequest)=>{
  return apiClient.post<VerifyOtpResponse>('/verify-otp',data)
}