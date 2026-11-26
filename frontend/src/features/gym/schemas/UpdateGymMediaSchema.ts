
import { z } from "zod";
import type { GymMediaType } from "@/shared/types/gym/GymTypes";
import { createMediaFileSchema } from "./mediaFileSchema";

export const createUpdateGymMediaSchema = (
  mediaType: GymMediaType
) => {
  return z
    .object({
      file: createMediaFileSchema(mediaType).optional(),

      caption: z.string().optional(),

      display_order: z.number().int().min(0).optional(),
    })
    .refine(
      (data) =>
        data.file !== undefined ||
        data.caption !== undefined ||
        data.display_order !== undefined,
      {
        message: "Please provide at least one field to update",
      }
    );
};

export type GymMediaFormValue = z.infer<
  ReturnType<typeof createUpdateGymMediaSchema>
>;
