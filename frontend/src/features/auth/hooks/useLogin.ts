import { useMutation } from "@tanstack/react-query";
import { login } from "../api/login"
import { toast } from "react-toastify";
import type { Axios, AxiosError } from "axios";


export const useLogin=()=>{
  return useMutation({
    mutationFn:login,
    onSuccess:(data)=>{
      console.log("SUCCESS",data)
      localStorage.setItem("token",data.data.accessToken)
      toast.success('Login successfull')
    },
    onError:(error:AxiosError<any>)=>{
      const message=error?.response?.data?.message || "Something went wrong!"
      toast.error(message)
    }
  })
}