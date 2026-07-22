import { getToken, isAuthenticated } from "@/shared/utils/auth";
import { getCurrentUser } from "@/shared/utils/jwt";
import { redirect } from "@tanstack/react-router";
import { dashboardRoutes } from "@/shared/types/auth/loginTypes";

export function requireGuest(){
    if(!isAuthenticated()){
      return
    }

    const token=getToken()
    const user=getCurrentUser(token)

    if(!user){
      return
    }

    throw redirect({to:dashboardRoutes[user.role]})
}