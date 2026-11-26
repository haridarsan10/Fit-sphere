
import { z } from "zod";

export const gymMediaSchema = z.object({
  type: z.enum([
    "LOGO",
    "COVER_IMAGE",
    "GALLERY",
    "FACILITY",
    "VERIFICATION_DOCUMENT",
  ]),

  file: z
    .instanceof(File, { message: "Please select a file" })
    .refine(
      (file) => file.size > 0,
      "File cannot be empty"
    )
    .refine(
      (file) => file.size <= 10 * 1024 * 1024,
      "File size must be less than 10MB"
    )
    .refine(
      (file) =>
        [
          "image/jpeg",
          "image/png",
          "image/webp",
          "application/pdf",
        ].includes(file.type),
      "Only JPG, PNG, WEBP and PDF files are allowed"
    ),

  caption: z.string().optional(),

  display_order: z.number().int().min(0).default(0),
});

export type GymMediaFormValue = z.infer<typeof gymMediaSchema>;
