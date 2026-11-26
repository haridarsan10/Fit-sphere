
import type { Area } from "react-easy-crop";

export default function getCroppedImage(
  imageSrc: string,
  pixelCrop: Area,
  fileName: string,
  fileType: string
): Promise<File> {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      if (!context) {
        reject(new Error("Could not create canvas context"));
        return;
      }

      canvas.width = pixelCrop.width;
      canvas.height = pixelCrop.height;

      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = "high";

      context.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
      );

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Could not crop the image"));
            return;
          }

          const croppedFile = new File([blob], fileName, {
            type: blob.type || fileType,
            lastModified: Date.now(),
          });

          resolve(croppedFile);
        },
        fileType,
        0.95
      );
    };

    image.onerror = () => {
      reject(new Error("Failed to load image"));
    };

    image.src = imageSrc;
  });
}
