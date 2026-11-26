
import { z } from "zod";
import { createMediaFileSchema } from "./mediaFileSchema";

export const addGymMediaSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("LOGO"),
    file: createMediaFileSchema("LOGO"),
    caption: z.string().optional(),
    display_order: z.number().int().min(0).default(0),
  }),

  z.object({
    type: z.literal("COVER_IMAGE"),
    file: createMediaFileSchema("COVER_IMAGE"),
    caption: z.string().optional(),
    display_order: z.number().int().min(0).default(0),
  }),

  z.object({
    type: z.literal("GALLERY"),
    file: createMediaFileSchema("GALLERY"),
    caption: z.string().optional(),
    display_order: z.number().int().min(0).default(0),
  }),

  z.object({
    type: z.literal("FACILITY"),
    file: createMediaFileSchema("FACILITY"),
    caption: z.string().optional(),
    display_order: z.number().int().min(0).default(0),
  }),

  z.object({
    type: z.literal("VERIFICATION_DOCUMENT"),
    file: createMediaFileSchema("VERIFICATION_DOCUMENT"),
    caption: z.string().optional(),
    display_order: z.number().int().min(0).default(0),
  }),
]);

export type AddGymMediaFormValue = z.infer<
  typeof addGymMediaSchema
>;
