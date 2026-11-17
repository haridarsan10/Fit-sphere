import { useQuery } from "@tanstack/react-query"
import { getGym } from "../api/getGym"

export const useGetGym=()=>{
  return useQuery({
    queryKey:["gyms"],
    queryFn:getGym
  })
}