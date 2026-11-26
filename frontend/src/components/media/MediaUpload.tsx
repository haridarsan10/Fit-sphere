
import { useEffect, useState } from "react";
import {
  ImagePlus,
  RotateCcw,
  X,
} from "lucide-react";
import { toast } from "react-toastify";

import type { ChangeEvent } from "react";
import type { GymMediaType } from "@/shared/types/gym/GymTypes";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import MediaCropper from "./MediaCropper";

type CropMode = "auto" | "manual" | "none";

interface MediaUploadProps {
  mediaType: GymMediaType;
  title: string;
  description: string;
  files: File[];
  onFilesChange: (files: File[]) => void;
  multiple?: boolean;
  cropMode?: CropMode;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

const getAspectRatio = (type: GymMediaType) => {
  switch (type) {
    case "COVER_IMAGE":
      return 16 / 9;

    case "LOGO":
      return 1;

    case "GALLERY":
    case "FACILITY":
    default:
      return 4 / 3;
  }
};

export default function MediaUpload({
  mediaType,
  title,
  description,
  files,
  onFilesChange,
  multiple = false,
  cropMode = multiple ? "manual" : "auto",
}: MediaUploadProps) {
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [cropIndex, setCropIndex] = useState<number | null>(null);
  const [cropImageUrl, setCropImageUrl] = useState("");

  const aspect = getAspectRatio(mediaType);

  const cropFile =
    cropIndex !== null ? files[cropIndex] ?? null : null;

  // Generate thumbnail URLs.
  useEffect(() => {
    const urls = files.map((file) =>
      URL.createObjectURL(file)
    );

    setPreviewUrls(urls);

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [files]);

  // Generate cropper image URL.
  useEffect(() => {
    if (cropIndex === null || !cropFile) {
      setCropImageUrl("");
      return;
    }

    const url = URL.createObjectURL(cropFile);

    setCropImageUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [cropIndex, cropFile]);

  // Close cropper if its selected file no longer exists.
  useEffect(() => {
    if (cropIndex !== null && !files[cropIndex]) {
      setCropIndex(null);
    }
  }, [files, cropIndex]);

  const validateFile = (file: File) => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error(
        `${file.name}: Only JPG, PNG and WEBP images are allowed.`
      );
      return false;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error(
        `${file.name}: File size cannot exceed 10 MB.`
      );
      return false;
    }

    return true;
  };

  // Select one or multiple images.
  const handleFileSelect = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFiles = Array.from(
      event.target.files ?? []
    );

    event.target.value = "";

    if (!selectedFiles.length) return;

    const validFiles = selectedFiles.filter(validateFile);

    if (!validFiles.length) return;

    if (!multiple) {
      onFilesChange([validFiles[0]]);

      if (cropMode === "auto") {
        setCropIndex(0);
      } else {
        setCropIndex(null);
      }

      return;
    }

    onFilesChange([...files, ...validFiles]);
  };

  // Open cropper for an individual image.
  const handleCrop = (index: number) => {
    if (cropMode === "none") return;

    setCropIndex(index);
  };

  // Replace selected image with cropped image.
  const handleCropConfirm = (croppedFile: File) => {
    if (cropIndex === null) return;

    const updatedFiles = files.map((file, index) =>
      index === cropIndex ? croppedFile : file
    );

    onFilesChange(updatedFiles);
    setCropIndex(null);
  };

  // Cancel cropping and discard that image.
  const handleCropCancel = () => {
    if (cropIndex === null) return;

    const updatedFiles = files.filter(
      (_, index) => index !== cropIndex
    );

    onFilesChange(updatedFiles);
    setCropIndex(null);
  };

  // Remove an individual selected image.
  const handleRemoveSelected = (index: number) => {
    const updatedFiles = files.filter(
      (_, fileIndex) => fileIndex !== index
    );

    onFilesChange(updatedFiles);

    if (cropIndex === index) {
      setCropIndex(null);
    } else if (cropIndex !== null && cropIndex > index) {
      setCropIndex(cropIndex - 1);
    }
  };

  // Remove all selected images.
  const handleClearSelection = () => {
    onFilesChange([]);
    setCropIndex(null);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            {title}
          </CardTitle>

          <CardDescription>
            {description}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* File Selection */}
          <div className="space-y-2">
            <Label htmlFor={`media-upload-${mediaType}`}>
              {multiple ? "Add Images" : "Choose Image"}
            </Label>

            <Input
              id={`media-upload-${mediaType}`}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple={multiple}
              onChange={handleFileSelect}
            />

            <p className="text-xs text-muted-foreground">
              JPG, PNG or WEBP. Maximum 10 MB per image.
              {multiple && " You can select multiple images."}
            </p>
          </div>

          {/* Selected Images */}
          {files.length > 0 ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>
                  Selected Images ({files.length})
                </Label>

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleClearSelection}
                >
                  Clear all
                </Button>
              </div>

              {/* Fixed-height preview */}
              <div className="h-40 overflow-y-auto rounded-lg border bg-muted/20 p-2">
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {files.map((file, index) => (
                    <div
                      key={`${file.name}-${file.lastModified}-${index}`}
                      className="flex min-w-0 items-center gap-2 rounded-md border bg-background p-2"
                    >
                      {/* Thumbnail */}
                      {previewUrls[index] && (
                        <img
                          src={previewUrls[index]}
                          alt={file.name}
                          className="h-10 w-10 shrink-0 rounded-md object-cover"
                        />
                      )}

                      {/* File Information */}
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-medium">
                          {file.name}
                        </p>

                        <p className="text-xs text-muted-foreground">
                          {(file.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>

                      {/* Crop Action */}
                      {cropMode === "manual" && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 shrink-0"
                          onClick={() => handleCrop(index)}
                          title="Crop image"
                          aria-label={`Crop ${file.name}`}
                        >
                          <RotateCcw className="h-3.5 w-3.5" />
                        </Button>
                      )}

                      {/* Remove Action */}
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 shrink-0 text-destructive hover:text-destructive"
                        onClick={() => handleRemoveSelected(index)}
                        title="Remove image"
                        aria-label={`Remove ${file.name}`}
                      >
                        <X className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-dashed bg-muted/20 text-center">
              <ImagePlus className="mb-2 h-8 w-8 text-muted-foreground" />

              <p className="text-sm font-medium">
                No images selected
              </p>

              <p className="text-xs text-muted-foreground">
                {multiple
                  ? "Select images to add to your collection."
                  : "Choose an image to get started."}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Cropper Modal */}
      {cropFile && cropImageUrl && cropMode !== "none" && (
        <MediaCropper
          imageSrc={cropImageUrl}
          fileName={cropFile.name}
          fileType={cropFile.type}
          aspect={aspect}
          onCancel={handleCropCancel}
          onConfirm={handleCropConfirm}
        />
      )}
    </>
  );
}
