
import {
  ExternalLink,
  FileText,
  ImageIcon,
  RotateCcw,
  Trash2,
} from "lucide-react";

import type { GymMedia } from "@/shared/types/gym/GymTypes";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

interface MediaPreviewProps {
  media: GymMedia;
  onDelete: (media: GymMedia) => void;
  onUndoDelete: (media: GymMedia) => void;
  isMarkedForDeletion?: boolean;
}

export default function MediaPreview({
  media,
  onDelete,
  onUndoDelete,
  isMarkedForDeletion = false,
}: MediaPreviewProps) {
  const isImage = media.mime_type?.startsWith("image/");
  const isPdf = media.mime_type === "application/pdf";

  const fileSize = media.file_size
    ? media.file_size >= 1024 * 1024
      ? `${(media.file_size / (1024 * 1024)).toFixed(2)} MB`
      : `${(media.file_size / 1024).toFixed(1)} KB`
    : null;

  const handleOpenMedia = () => {
    if (isMarkedForDeletion) return;

    window.open(media.url, "_blank", "noopener,noreferrer");
  };

  return (
    <Card
      className={`overflow-hidden transition-colors ${
        isMarkedForDeletion
          ? "border-destructive/40 bg-destructive/5"
          : ""
      }`}
    >
      <CardContent className="flex items-center gap-3 p-2">
        {/* Thumbnail */}
        <button
          type="button"
          onClick={handleOpenMedia}
          disabled={isMarkedForDeletion}
          className="group relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-md bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed"
          title="View original media"
          aria-label={`View ${media.file_name || "uploaded media"}`}
        >
          {isImage ? (
            <img
              src={media.url}
              alt={media.caption || media.file_name || "Gym media"}
              className={`h-full w-full object-cover ${
                isMarkedForDeletion ? "opacity-40" : ""
              }`}
            />
          ) : isPdf ? (
            <FileText className="h-6 w-6 text-muted-foreground" />
          ) : (
            <ImageIcon className="h-6 w-6 text-muted-foreground" />
          )}

          {!isMarkedForDeletion && (
            <span className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
              <ExternalLink className="h-4 w-4 text-white" />
            </span>
          )}
        </button>

        {/* File Details */}
        <div className="min-w-0 flex-1">
          <p
            className={`truncate text-sm font-medium ${
              isMarkedForDeletion
                ? "text-muted-foreground line-through"
                : ""
            }`}
          >
            {media.file_name || "Untitled"}
          </p>

          <div className="flex flex-wrap items-center gap-x-2 text-xs text-muted-foreground">
            {isPdf && <span>PDF Document</span>}

            {isImage && <span>Image</span>}

            {fileSize && <span>{fileSize}</span>}
          </div>

          {media.caption && (
            <p className="truncate text-xs text-muted-foreground">
              {media.caption}
            </p>
          )}

          {isMarkedForDeletion && (
            <p className="mt-1 text-xs font-medium text-destructive">
              Will be deleted when you save changes
            </p>
          )}
        </div>

        {/* Delete / Undo Action */}
        {isMarkedForDeletion ? (
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-8 shrink-0 gap-1"
            onClick={() => onUndoDelete(media)}
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Undo
          </Button>
        ) : (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
            onClick={() => onDelete(media)}
            title="Mark for deletion"
            aria-label={`Mark ${media.file_name || "uploaded media"} for deletion`}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
