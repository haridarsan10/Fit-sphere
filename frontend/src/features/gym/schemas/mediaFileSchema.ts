
import { z } from "zod";
import type { GymMediaType } from "@/shared/types/gym/GymTypes";

const IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

const DOCUMENT_TYPES = [
  ...IMAGE_TYPES,
  "application/pdf",
];

export const createMediaFileSchema = (mediaType: GymMediaType) => {
  const allowedTypes =
    mediaType === "VERIFICATION_DOCUMENT"
      ? DOCUMENT_TYPES
      : IMAGE_TYPES;

  return z
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
      (file) => allowedTypes.includes(file.type),
      mediaType === "VERIFICATION_DOCUMENT"
        ? "Only JPG, PNG, WEBP and PDF files are allowed"
        : "Only JPG, PNG and WEBP images are allowed"
    );
};
