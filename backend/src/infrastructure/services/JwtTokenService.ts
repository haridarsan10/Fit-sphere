import type TokenService from "../../modules/auth/application/services/TokenService.js";
import jwt,{ type JwtPayload } from 'jsonwebtoken'
import type {TokenPayload} from "../../modules/auth/application/services/TokenService.js" 

export default class JwtTokenService implements TokenService{
  private secret='your_secret_key'

  async generate(sub: string, email: string, role: string):Promise<string> {
    
    const token=jwt.sign({sub,email,role},this.secret,{expiresIn:'1h'})
    return token
  }

  verifyToken(token: string): TokenPayload {
    try {
      const decoded = jwt.verify(token, this.secret) as JwtPayload & TokenPayload

      return {
        sub: decoded.sub as string,
        email: decoded.email,
        role: decoded.role
      }
    } catch {
      throw new Error("Invalid or expired token")
    }
  }
}