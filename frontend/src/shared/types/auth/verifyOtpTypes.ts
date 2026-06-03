export interface VerifyOtpRequest{
  ownerId:string,
  otp:string
}

export interface VerifyOtpResponse{
  message:string,
  success:boolean
}