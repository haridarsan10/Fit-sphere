import { useMutation } from "@tanstack/react-query";
import { login } from "../api/login"
import { toast } from "react-toastify";
import type {  AxiosError } from "axios";
import { useNavigate } from "@tanstack/react-router";
import type { JwtPayload } from "@/shared/types/auth/loginTypes";
import { jwtDecode } from "jwt-decode";
import { dashboardRoutes } from "@/shared/types/auth/loginTypes";

export const useLogin=()=>{

  const navigate=useNavigate()

  return useMutation({
    mutationFn:login,
    onSuccess:(data)=>{
      console.log("SUCCESS",data)
      localStorage.setItem("token",data.data.accessToken)
      
      const token=data.data.accessToken

      const {role}=jwtDecode<JwtPayload>(token)

      localStorage.setItem("role",role)

      console.log(role)

      const route=dashboardRoutes[role]

      toast.success('Login successfull')

      navigate({to:route,replace:true})
    },
    onError:(error:AxiosError<any>)=>{
      const message=error?.response?.data?.message || "Something went wrong!"
      toast.error(message)
    }
  })
}