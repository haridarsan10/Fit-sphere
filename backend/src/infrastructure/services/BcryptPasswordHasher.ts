import PasswordHasher from "../../modules/auth/application/services/PasswordHasher";
import bcrypt from "bcrypt"

export default class BcryptPasswordHasher implements PasswordHasher{
  async hash(password: string): Promise<string> {
    const saltRounds=10

    const hashed=await bcrypt.hash(password,saltRounds)

    return hashed
  } 

  async compare(password: string, hashed: string): Promise<boolean> {
    const matched=await bcrypt.compare(password,hashed)

    if(!matched)return false

    return true
  }
}