import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateGym } from "../api/updateGym";
import { toast } from "react-toastify";
import type {  AxiosError } from "axios";
import type { GymFormValues } from "../schemas/GymSchema";
import { useNavigate } from "@tanstack/react-router";


export const useUpdateGym=(gymId:string)=>{

  const queryClient=useQueryClient()
  const navigate=useNavigate()

  return useMutation({
    mutationFn: (updatedData: GymFormValues) =>updateGym({ gymId, updatedData }),
    onSuccess:()=>{

      queryClient.invalidateQueries({
        queryKey: ["gyms"],
      });

      queryClient.invalidateQueries({
        queryKey:['gym']
      })

      toast.success('Gym updated successfully')
      
      navigate({
      to: "/gym-owner/gyms/$gymId",
      params: { gymId },
      replace:true
    });
    },

     onError:(error:AxiosError<any>)=>{
          const message=error?.response?.data?.message || "Something went wrong!"
          toast.error(message)
     }

  })
}