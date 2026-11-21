import { useQuery } from "@tanstack/react-query"
import { getGymById } from "../api/getGymById"

export const useGetGymById=(gymId:string)=>{
  return useQuery({
    queryKey:["gym",gymId],
    queryFn:()=>getGymById(gymId),
    enabled:!!gymId
  })
}