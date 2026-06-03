export interface RegisterRequest{
  firstName:string,
  lastName:string,
  email:string,
  password:string,
  confirmPassword:string,
  role:string
}

export interface RegisterResponse{
  message:string,
  success:boolean,
  userId:string
}