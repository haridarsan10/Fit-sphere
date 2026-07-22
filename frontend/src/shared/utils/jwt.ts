import { jwtDecode } from "jwt-decode";
import type { JwtPayload } from "../types/auth/loginTypes";

export function getCurrentUser(token:string | null):JwtPayload|null{
  try {

    if(!token){
      return null
    }

    return jwtDecode<JwtPayload>(token)

  } catch (error) {
    return null
  }
}

export function isTokenExpired(token:string):boolean{

  if(!token)return true

  const now=Date.now()/1000

  const user=getCurrentUser(token)

  if(!user){
    return true
  }

  if (!user.exp) {
    return true;
  }

  return user.exp < now;
}