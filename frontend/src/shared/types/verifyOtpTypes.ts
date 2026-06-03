export interface VerifyOtpRequest{
  email:string,
  otp:string
}

export interface VerifyOtpResponse{
  message:string,
  success:boolean
}