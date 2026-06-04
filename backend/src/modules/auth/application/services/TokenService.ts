export interface TokenPayload {
  sub: string
  email: string
  role: string
}

export default interface TokenService{
  generate(sub:string,email:string,role:string):Promise<string>
  verifyToken(token:string):TokenPayload
} 

