import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteGymMedia } from "../api/deleteGymMedia";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";



export const usedeleteGymMedia = (gymId:string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn:(mediaId: string)=> deleteGymMedia(gymId,mediaId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["gym", gymId],
      });

      toast.success("Media deleted successfully");

    },

    onError: (error: AxiosError<{ message?: string }>) => {
      const message =
        error.response?.data?.message ||
        "Unable to delete media";

      toast.error(message);
    },


  });
};