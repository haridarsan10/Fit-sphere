
import { apiClient } from "../../../services/apiClient";
import type { GymMediaFormValue } from "../schemas/UpdateGymMediaSchema";

export const updateGymMedia = async ({
  gymId,
  mediaId,
  updateMediaInput,
}: {
  gymId: string;
  mediaId: string;
  updateMediaInput: GymMediaFormValue;
}) => {
  const formData = new FormData();

  if (updateMediaInput.file) {
    formData.append("file", updateMediaInput.file);
  }

  if (updateMediaInput.caption !== undefined) {
    formData.append("caption", updateMediaInput.caption);
  }

  if (updateMediaInput.display_order !== undefined) {
    formData.append(
      "display_order",
      String(updateMediaInput.display_order)
    );
  }

  const response = await apiClient.patch(
    `/gymMedia/${gymId}/media/${mediaId}`,
    formData
  );

  return response.data;
};
