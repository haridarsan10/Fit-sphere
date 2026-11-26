
import { useEffect, useState } from "react";
import {
  FileText,
  ImageIcon,
  RotateCcw,
  X,
} from "lucide-react";
import { toast } from "react-toastify";

import type { ChangeEvent } from "react";

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

interface VerificationDocumentManagerProps {
  files: File[];
  onFilesChange: (files: File[]) => void;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const ALLOWED_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
];

export default function VerificationDocumentManger({
  files,
  onFilesChange,
}: VerificationDocumentManagerProps) {
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [cropIndex, setCropIndex] = useState<number | null>(null);
  const [cropImageUrl, setCropImageUrl] = useState("");

  const cropFile =
    cropIndex !== null ? files[cropIndex] : null;

  // Generate and clean up image preview URLs.
  useEffect(() => {
    const urls = files.map((file) =>
      file.type.startsWith("image/")
        ? URL.createObjectURL(file)
        : ""
    );

    setPreviewUrls(urls);

    return () => {
      urls.forEach((url) => {
        if (url) URL.revokeObjectURL(url);
      });
    };
  }, [files]);

  // Generate a separate URL for the cropper.
  useEffect(() => {
    if (!cropFile || !cropFile.type.startsWith("image/")) {
      setCropImageUrl("");
      return;
    }

    const url = URL.createObjectURL(cropFile);
    setCropImageUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [cropFile]);

  const handleFileSelect = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFiles = Array.from(
      event.target.files ?? []
    );

    event.target.value = "";

    if (!selectedFiles.length) return;

    const validFiles = selectedFiles.filter((file) => {
      if (!ALLOWED_TYPES.includes(file.type)) {
        toast.error(
          `${file.name}: Only PDF, JPG, PNG and WEBP files are allowed.`
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
    });

    if (validFiles.length) {
      onFilesChange([...files, ...validFiles]);
    }
  };

  const handleCrop = (index: number) => {
    const file = files[index];

    if (!file?.type.startsWith("image/")) return;

    setCropIndex(index);
  };

  const handleCropConfirm = (croppedFile: File) => {
    if (cropIndex === null) return;

    onFilesChange(
      files.map((file, index) =>
        index === cropIndex ? croppedFile : file
      )
    );

    setCropIndex(null);
  };

  // Cancelling crop discards the selected image.
  const handleCropCancel = () => {
    if (cropIndex === null) return;

    onFilesChange(
      files.filter((_, index) => index !== cropIndex)
    );

    setCropIndex(null);
  };

  const handleRemoveFile = (index: number) => {
    onFilesChange(
      files.filter((_, fileIndex) => fileIndex !== index)
    );

    if (cropIndex === index) {
      setCropIndex(null);
    } else if (cropIndex !== null && cropIndex > index) {
      setCropIndex((previous) =>
        previous === null ? null : previous - 1
      );
    }
  };

  const handleClearSelection = () => {
    onFilesChange([]);
    setCropIndex(null);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-muted-foreground" />

            <CardTitle>Verification Documents</CardTitle>
          </div>

          <CardDescription>
            Select documents required to verify your gym.
            Accepted formats: PDF, JPG, PNG and WEBP.
            Maximum file size: 10 MB per document.
            Images can optionally be cropped before saving.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* File Selection */}
          <div className="space-y-2">
            <Label htmlFor="verification-document">
              Add Documents
            </Label>

            <Input
              id="verification-document"
              type="file"
              accept=".pdf,image/jpeg,image/png,image/webp"
              multiple
              onChange={handleFileSelect}
            />
          </div>

          {/* Selected Documents */}
          {files.length > 0 ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>
                  Selected Documents ({files.length})
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

              <div className="h-44 space-y-2 overflow-y-auto rounded-lg border bg-muted/20 p-2">
                {files.map((file, index) => {
                  const isPdf =
                    file.type === "application/pdf";

                  return (
                    <div
                      key={`${file.name}-${file.lastModified}-${index}`}
                      className="flex items-center gap-3 rounded-md border bg-background p-2"
                    >
                      {/* Thumbnail */}
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-md bg-muted">
                        {isPdf ? (
                          <FileText className="h-6 w-6 text-muted-foreground" />
                        ) : previewUrls[index] ? (
                          <img
                            src={previewUrls[index]}
                            alt={file.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <ImageIcon className="h-6 w-6 text-muted-foreground" />
                        )}
                      </div>

                      {/* File Details */}
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-medium">
                          {file.name}
                        </p>

                        <p className="text-xs text-muted-foreground">
                          {(file.size / (1024 * 1024)).toFixed(2)} MB
                          {" · "}
                          {isPdf ? "PDF" : "Image"}
                        </p>
                      </div>

                      {/* Optional Image Crop */}
                      {!isPdf && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 shrink-0"
                          onClick={() => handleCrop(index)}
                          title="Crop image"
                          aria-label={`Crop ${file.name}`}
                        >
                          <RotateCcw className="h-4 w-4" />
                        </Button>
                      )}

                      {/* Remove */}
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 shrink-0 text-destructive hover:text-destructive"
                        onClick={() => handleRemoveFile(index)}
                        title="Remove document"
                        aria-label={`Remove ${file.name}`}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="flex h-44 flex-col items-center justify-center rounded-lg border border-dashed bg-muted/20 text-center">
              <FileText className="mb-2 h-8 w-8 text-muted-foreground" />

              <p className="text-sm font-medium">
                No documents selected
              </p>

              <p className="text-xs text-muted-foreground">
                Select documents to add to your pending changes.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Image Cropper */}
      {cropFile && cropImageUrl && (
        <MediaCropper
          imageSrc={cropImageUrl}
          fileName={cropFile.name}
          fileType={cropFile.type}
          aspect={4 / 3}
          onCancel={handleCropCancel}
          onConfirm={handleCropConfirm}
        />
      )}
    </>
  );
}
