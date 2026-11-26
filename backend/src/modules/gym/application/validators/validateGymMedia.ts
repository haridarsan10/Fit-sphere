import type { GymMediaType } from "../../domain/entities/GymMedia.js";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const MAX_DOCUMENT_SIZE = 10 * 1024 * 1024;

const IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp"
];

const DOCUMENT_TYPES = [
  "application/pdf",
  ...IMAGE_TYPES
];


export default function validateGymMedia(
  type: GymMediaType,
  mimeType: string,
  fileSize: number
) {
  const allowedTypes =
    type === "VERIFICATION_DOCUMENT"
      ? DOCUMENT_TYPES
      : IMAGE_TYPES;

  const maxSize =
    type === "VERIFICATION_DOCUMENT"
      ? MAX_DOCUMENT_SIZE
      : MAX_IMAGE_SIZE;

  if (!allowedTypes.includes(mimeType)) {
    throw new Error("Invalid file type");
  }

  if (fileSize > maxSize) {
    throw new Error("File size exceeds the allowed limit");
  }
}