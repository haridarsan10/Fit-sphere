import { useMutation } from "@tanstack/react-query"
import { verifyotp } from "../api/verifyotp"
import type { AxiosError } from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "@tanstack/react-router";

export const useVerifyOtp=()=>{

  const navigate=useNavigate()

  return useMutation({

    mutationFn:verifyotp,

    onSuccess:(data)=>{
      console.log("SUCCESS:",data)
      toast.success('User verified successfully')

      navigate({to:"/login"})
    },
    
    onError:(error:AxiosError<any>)=>{
      const message =error?.response?.data?.message || "Something went wrong"
      toast.error(message)
    }
  })
}