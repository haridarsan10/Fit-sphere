export interface VerifyOtpRequest{
  email:string
}

export interface VerifyOtpResponse{
  message:string,
  success:boolean
}