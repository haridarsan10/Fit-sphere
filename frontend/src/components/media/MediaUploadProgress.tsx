
import {
  CheckCircle2,
  LoaderCircle,
  XCircle,
} from "lucide-react";

import { Progress } from "@/components/ui/progress";

interface MediaUploadProgressProps {
  progress: number;
  status: "uploading" | "success" | "error";
  fileName?: string;
  errorMessage?: string;
}

export default function MediaUploadProgress({
  progress,
  status,
  fileName,
  errorMessage,
}: MediaUploadProgressProps) {
  const normalizedProgress = Math.min(
    100,
    Math.max(0, progress)
  );

  const displayedProgress =
    status === "success" ? 100 : normalizedProgress;

  const statusText = {
    uploading: "Uploading...",
    success: "Upload completed",
    error: "Upload failed",
  }[status];

  return (
    <div className="space-y-2 rounded-lg border bg-background p-3">
      <div className="flex items-center gap-3">
        {/* Status Icon */}
        <div className="shrink-0">
          {status === "uploading" && (
            <LoaderCircle className="h-4 w-4 animate-spin text-primary" />
          )}

          {status === "success" && (
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          )}

          {status === "error" && (
            <XCircle className="h-4 w-4 text-destructive" />
          )}
        </div>

        {/* File Information */}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">
            {fileName || "Uploading media"}
          </p>

          <p className="text-xs text-muted-foreground">
            {statusText}
          </p>
        </div>

        {/* Progress Percentage */}
        <span className="shrink-0 text-xs font-medium text-muted-foreground">
          {status === "uploading"
            ? `${Math.round(normalizedProgress)}%`
            : status === "success"
              ? "100%"
              : "Failed"}
        </span>
      </div>

      <Progress
        value={displayedProgress}
        className="h-1.5"
      />

      {status === "error" && (
        <p className="text-xs text-destructive">
          {errorMessage ||
            "Something went wrong while uploading. Please try again."}
        </p>
      )}
    </div>
  );
}
