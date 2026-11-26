
import { useCallback, useEffect, useState } from "react";
import Cropper from "react-easy-crop";
import type { Area } from "react-easy-crop";

import { ZoomIn } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

import getCroppedImage from "@/shared/utils/getCroppedImage";

interface MediaCropperProps {
  imageSrc: string;
  fileName: string;
  fileType: string;
  aspect?: number;
  onCancel: () => void;
  onConfirm: (croppedFile: File) => void;
}

export default function MediaCropper({
  imageSrc,
  fileName,
  fileType,
  aspect = 1,
  onCancel,
  onConfirm,
}: MediaCropperProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const [croppedAreaPixels, setCroppedAreaPixels] =
    useState<Area | null>(null);

  const [isCropping, setIsCropping] = useState(false);
  const [error, setError] = useState("");

  // Reset crop settings whenever a different image is opened.
  useEffect(() => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
    setError("");
  }, [imageSrc, aspect]);

  const handleCropComplete = useCallback(
    (_: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const handleApplyCrop = async () => {
    if (isCropping) return;

    if (!croppedAreaPixels) {
      setError("Please wait for the image to load and try again.");
      return;
    }

    try {
      setIsCropping(true);
      setError("");

      const croppedFile = await getCroppedImage(
        imageSrc,
        croppedAreaPixels,
        fileName,
        fileType
      );

      onConfirm(croppedFile);
    } catch {
      setError(
        "Unable to crop this image. Please try again."
      );
    } finally {
      setIsCropping(false);
    }
  };

  const handleDialogChange = (open: boolean) => {
    if (!open && !isCropping) {
      onCancel();
    }
  };

  return (
    <Dialog open onOpenChange={handleDialogChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Adjust Image</DialogTitle>

          <DialogDescription>
            Drag the image to adjust its position and use the
            zoom slider to get the desired result.
          </DialogDescription>
        </DialogHeader>

        {/* Crop Area */}
        <div
          className="relative mx-auto w-full max-w-xl overflow-hidden rounded-lg bg-black"
          style={{
            aspectRatio: String(aspect),
            maxHeight: "55vh",
          }}
        >
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            minZoom={1}
            maxZoom={3}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={handleCropComplete}
          />
        </div>

        {/* Zoom Control */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ZoomIn className="h-4 w-4 text-muted-foreground" />

              <span className="text-sm font-medium">
                Zoom
              </span>
            </div>

            <span className="text-sm text-muted-foreground">
              {zoom.toFixed(1)}x
            </span>
          </div>

          <Slider
            min={1}
            max={3}
            step={0.1}
            value={[zoom]}
            onValueChange={(value) => setZoom(value[0])}
            disabled={isCropping}
          />

          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Minimum</span>
            <span>Maximum</span>
          </div>
        </div>

        {/* Error */}
        {error && (
          <p className="text-sm text-destructive">
            {error}
          </p>
        )}

        {/* Actions */}
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isCropping}
          >
            Cancel
          </Button>

          <Button
            type="button"
            onClick={handleApplyCrop}
            disabled={isCropping || !croppedAreaPixels}
          >
            {isCropping ? "Cropping..." : "Apply Crop"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
