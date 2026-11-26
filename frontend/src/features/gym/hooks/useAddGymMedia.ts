import { useMutation, useQueryClient } from "@tanstack/react-query";
import addGymMedia from "../api/addGymMedia";
import { toast } from "react-toastify";
import type {  AxiosError } from "axios";


export const useAddGymMedia = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addGymMedia,
    

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["gym", variables.gym_id],
      });

      toast.success("Media added successfully");
    },

    onError:(error:AxiosError<any>)=>{
          const message=error?.response?.data?.message || "Something went wrong!"
          toast.error(message)
    }
  });
};