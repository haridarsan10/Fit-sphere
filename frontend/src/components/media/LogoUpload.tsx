
import MediaUpload from "./MediaUpload";

interface LogoUploadProps {
  files: File[];
  onFilesChange: (files: File[]) => void;
}

export default function LogoUpload({
  files,
  onFilesChange,
}: LogoUploadProps) {
  return (
    <MediaUpload
      mediaType="LOGO"
      title="Gym Logo"
      description="Upload your gym's official logo. Use a square image (1:1 ratio). JPG, PNG or WEBP."
      files={files}
      onFilesChange={onFilesChange}
      multiple={false}
      cropMode="auto"
    />
  );
}
