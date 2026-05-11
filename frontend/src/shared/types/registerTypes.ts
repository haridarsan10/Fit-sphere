export interface RegisterRequest{
  email:string,
  name:string,
  password:string,
  role:string
}

export interface RegisterResponse{
  message:string,
  success:boolean
}