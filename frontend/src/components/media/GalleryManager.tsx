
import MediaUpload from "./MediaUpload";

interface GalleryManagerProps {
  files: File[];
  onFilesChange: (files: File[]) => void;
}

export default function GalleryManager({
  files,
  onFilesChange,
}: GalleryManagerProps) {
  return (
    <MediaUpload
      mediaType="GALLERY"
      title="Gym Gallery"
      description="Upload images showcasing your gym. You can select multiple images."
      files={files}
      onFilesChange={onFilesChange}
      multiple
      cropMode="manual"
    />
  );
}
