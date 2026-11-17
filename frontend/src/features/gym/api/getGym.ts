import { apiClient } from "../../../services/apiClient";
import type { GetGymsResponse } from "@/shared/types/gym/GetGymTypes";

export const getGym = async (): Promise<GetGymsResponse> => {
  const response = await apiClient.get<GetGymsResponse>("/gym");
  return response.data;
};