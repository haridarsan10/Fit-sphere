import { useMutation } from "@tanstack/react-query";
import { addGym } from "../api/addGym";
import { toast } from "react-toastify";
import type {  AxiosError } from "axios";
import { useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";

export const useAddGym=()=>{

  const navigate=useNavigate()
  const queryClient = useQueryClient();


  return useMutation({
    mutationFn:addGym,
    onSuccess: () => {
      queryClient.invalidateQueries({
      queryKey: ["gyms"],
    });

      toast.success("Gym added successfully");
      navigate({to:'/gym-owner/gyms',replace:true})
    },


    onError:(error:AxiosError<any>)=>{
      const message=error?.response?.data?.message || "Something went wrong!"
      toast.error(message)
    }
  })
}