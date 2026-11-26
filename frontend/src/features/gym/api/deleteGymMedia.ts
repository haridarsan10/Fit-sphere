import { apiClient } from "@/services/apiClient"

export const deleteGymMedia=async (gymId:string,mediaId:string)=>{
  const response=await apiClient.delete(`/gymMedia/${gymId}/media/${mediaId}`)
  return response.data
}