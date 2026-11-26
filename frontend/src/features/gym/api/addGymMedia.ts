import { apiClient } from "../../../services/apiClient";
import type { AddGymMediaInput } from "@/shared/types/gym/GymApiTypes";

export default async function addGymMedia(data:AddGymMediaInput){

  const formData = new FormData();

  formData.append("file", data.file);
  formData.append("type", data.type);

  if (data.caption) {
    formData.append("caption", data.caption);
  }

  if (data.display_order !== undefined) {
    formData.append("display_order", String(data.display_order));
  }

  const response = await apiClient.post(`/gymMedia/${data.gym_id}/media`,formData);

  return response.data;
}