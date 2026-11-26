import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateGymMedia } from "../api/updateGymMedia";
import { toast } from "react-toastify";
import type {  AxiosError } from "axios";
import type { GymMediaFormValue } from "../schemas/GymMedia";


export const useUpdateGymMedia=(gymId:string,mediaId:string)=>{

  const queryClient=useQueryClient()

  return useMutation({
    mutationFn: (updatedData: GymMediaFormValue) =>updateGymMedia({gymId,mediaId,updateMediaInput:updatedData}),
    onSuccess:()=>{

      queryClient.invalidateQueries({
        queryKey:['gym',gymId]
      })

      toast.success('Gym media updated successfully')
      
    },

     onError:(error:AxiosError<any>)=>{
          const message=error?.response?.data?.message || "Something went wrong!"
          toast.error(message)
     }

  })
}