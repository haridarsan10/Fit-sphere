import { useMutation } from "@tanstack/react-query"
import { register } from "../api/register"
import type { AxiosError } from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "@tanstack/react-router";


export const useRegister=()=>{

  const navigate=useNavigate()

  return useMutation({
    mutationFn:register,
    onSuccess:(data,variables)=>{
      console.log("SUCCESS:",data)

      toast.success('Otp send successfully')

      navigate({ to: '/verify-otp',
        search:{
          ownerId:data.data.userId
      }
    })
    },
    onError:(error: AxiosError<any>)=>{
      const message =error?.response?.data?.message || "Something went wrong"
      toast.error(message)
    }
  })
}