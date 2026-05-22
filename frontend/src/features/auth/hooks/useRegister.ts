import { useMutation } from "@tanstack/react-query"
import { register } from "../api/register"
import { useNavigate } from "@tanstack/react-router"
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const useRegister=()=>{
  return useMutation({
    mutationFn:register,
    onSuccess:(data)=>{
      console.log("SUCCESS:",data)
      toast.success('Registration successfull')
    },
    onError:(error)=>{
      console.log("ERROR:", error)
      toast.error('Something went wrong!')
    }
  })
}