import { useMutation } from "@tanstack/react-query"
import { verifyotp } from "../api/verifyotp"
import type { AxiosError } from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
 


export const useVerifyOtp=()=>{
  return useMutation({
    mutationFn:verifyotp,
    onSuccess:(data)=>{
      console.log("SUCCESS:",data)
      toast.success('Otp verification successfull')
    },
    onError:(error:AxiosError<any>)=>{
      const message =error?.response?.data?.message || "Something went wrong"
      toast.error(message)
    }
  })
}