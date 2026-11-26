
import MediaUpload from "./MediaUpload";

interface FacilityImageManagerProps {
  files: File[];
  onFilesChange: (files: File[]) => void;
}

export default function FacilityImageManager({
  files,
  onFilesChange,
}: FacilityImageManagerProps) {
  return (
    <MediaUpload
      mediaType="FACILITY"
      title="Facility Images"
      description="Upload images of your gym's facilities and equipment. You can select multiple images."
      files={files}
      onFilesChange={onFilesChange}
      multiple
      cropMode="manual"
    />
  );
}
