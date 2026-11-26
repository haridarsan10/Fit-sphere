
import MediaUpload from "./MediaUpload";

interface CoverImageUploadProps {
  files: File[];
  onFilesChange: (files: File[]) => void;
}

export default function CoverImageUpload({
  files,
  onFilesChange,
}: CoverImageUploadProps) {
  return (
    <MediaUpload
      mediaType="COVER_IMAGE"
      title="Gym Cover Image"
      description="Upload your gym's cover image. Use a wide landscape image. JPG, PNG or WEBP."
      files={files}
      onFilesChange={onFilesChange}
      multiple={false}
      cropMode="auto"
    />
  );
}
