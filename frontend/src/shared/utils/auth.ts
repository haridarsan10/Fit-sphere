import { isTokenExpired } from "./jwt";

export function getToken(){
  return localStorage.getItem("token")
}

export function isAuthenticated(){
  
  const token=getToken()

  if(!token){
    return false
  }

  if (isTokenExpired(token)) return false;


  return true
}

export function logout(){
  localStorage.removeItem('token')
}

