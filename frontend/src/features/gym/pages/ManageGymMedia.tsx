
import { useCallback, useState } from "react";
import { ArrowLeft, ImageIcon, Images, Save, X } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

import { gymOwnerManageGymMediaRoute } from "@/app/router/gymOwner/gymOwnerManageGymMediaRoute";

import PageContainer from "@/components/common/PageContainer";
import PageHeader from "@/components/common/PageHeader";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useGetGymById } from "../hooks/useGetGymById";
import { useAddGymMedia } from "../hooks/useAddGymMedia";
import { usedeleteGymMedia } from "../hooks/useDeleteGymMedia";

import LogoUpload from "@/components/media/LogoUpload";
import CoverImageUpload from "@/components/media/CoverImageUpload";
import GalleryManager from "@/components/media/GalleryManager";
import FacilityImageManager from "@/components/media/FacilityImageManager";
import VerificationDocumentManger from "@/components/media/VerificationDocumentManager";
import MediaPreview from "@/components/media/MediaPreview";

import type { GymMedia, GymMediaType } from "@/shared/types/gym/GymTypes";

type PendingMedia = {
  logo: File[];
  coverImage: File[];
  gallery: File[];
  facility: File[];
  verificationDocuments: File[];
};

const INITIAL_PENDING_MEDIA: PendingMedia = {
  logo: [],
  coverImage: [],
  gallery: [],
  facility: [],
  verificationDocuments: [],
};

interface UploadedMediaSectionProps {
  title: string;
  description: string;
  media: GymMedia[];
  onDelete: (media: GymMedia) => void;
  onUndoDelete: (media: GymMedia) => void;
  pendingDeletions: string[];
}

function UploadedMediaSection({
  title,
  description,
  media,
  onDelete,
  onUndoDelete,
  pendingDeletions,
}: UploadedMediaSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent>
        {media.length > 0 ? (
          <div className="space-y-2">
            {media.map((item) => (
              <MediaPreview
                key={item.id}
                media={item}
                onDelete={onDelete}
                onUndoDelete={onUndoDelete}
                isMarkedForDeletion={pendingDeletions.includes(item.id)}
              />
            ))}
          </div>
        ) : (
          <div className="flex h-28 flex-col items-center justify-center rounded-lg border border-dashed bg-muted/20 text-center">
            <ImageIcon className="mb-2 h-6 w-6 text-muted-foreground" />

            <p className="text-sm font-medium">
              No uploaded media
            </p>

            <p className="text-xs text-muted-foreground">
              Uploaded files will appear here.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function ManageGymMedia() {
  const navigate = useNavigate();

  const { gymId } = gymOwnerManageGymMediaRoute.useParams();

  const {
    data: gym,
    isLoading,
    isError,
  } = useGetGymById(gymId);

  const addMediaMutation = useAddGymMedia();
  const deleteMediaMutation = usedeleteGymMedia(gymId);

  const [pendingMedia, setPendingMedia] =
    useState<PendingMedia>(INITIAL_PENDING_MEDIA);

  const [pendingDeletions, setPendingDeletions] =
    useState<string[]>([]);

  const [isSaving, setIsSaving] = useState(false);

  // Parent-controlled file handlers.
  const handleLogoFilesChange = useCallback((files: File[]) => {
    setPendingMedia((previous) => ({
      ...previous,
      logo: files,
    }));
  }, []);

  const handleCoverFilesChange = useCallback((files: File[]) => {
    setPendingMedia((previous) => ({
      ...previous,
      coverImage: files,
    }));
  }, []);

  const handleGalleryFilesChange = useCallback((files: File[]) => {
    setPendingMedia((previous) => ({
      ...previous,
      gallery: files,
    }));
  }, []);

  const handleFacilityFilesChange = useCallback((files: File[]) => {
    setPendingMedia((previous) => ({
      ...previous,
      facility: files,
    }));
  }, []);

  const handleVerificationFilesChange = useCallback(
    (files: File[]) => {
      setPendingMedia((previous) => ({
        ...previous,
        verificationDocuments: files,
      }));
    },
    []
  );

  const handleGoBack = () => {
    navigate({
      to: "/gym-owner/gyms/$gymId",
      params: { gymId },
    });
  };

  // Stage an existing media item for deletion.
  const handleDeleteMedia = (media: GymMedia) => {
    setPendingDeletions((previous) =>
      previous.includes(media.id)
        ? previous
        : [...previous, media.id]
    );
  };

  // Undo a staged deletion.
  const handleUndoDelete = (media: GymMedia) => {
    setPendingDeletions((previous) =>
      previous.filter((id) => id !== media.id)
    );
  };

  const hasPendingUploads = Object.values(pendingMedia).some(
    (files) => files.length > 0
  );

  const hasPendingChanges =
    hasPendingUploads || pendingDeletions.length > 0;

  // Discard all unsaved changes.
  const handleCancelChanges = () => {
    setPendingMedia({
      ...INITIAL_PENDING_MEDIA,
    });

    setPendingDeletions([]);
  };

  // Upload all files first, then process deletions.
  const handleSaveChanges = async () => {
    if (!hasPendingChanges || isSaving) return;

    setIsSaving(true);

    const uploadGroups: {
      key: keyof PendingMedia;
      type: GymMediaType;
    }[] = [
      { key: "logo", type: "LOGO" },
      { key: "coverImage", type: "COVER_IMAGE" },
      { key: "gallery", type: "GALLERY" },
      { key: "facility", type: "FACILITY" },
      {
        key: "verificationDocuments",
        type: "VERIFICATION_DOCUMENT",
      },
    ];

    try {
      // STEP 1: Upload all pending files sequentially.
      for (const group of uploadGroups) {
        const files = [...pendingMedia[group.key]];

        for (const file of files) {
          await addMediaMutation.mutateAsync({
            gym_id: gymId,
            type: group.type,
            file,
          });

          // Remove successfully uploaded file from pending state.
          // This prevents duplicate uploads if a later file fails.
          setPendingMedia((previous) => ({
            ...previous,
            [group.key]: previous[group.key].filter(
              (pendingFile) => pendingFile !== file
            ),
          }));
        }
      }

      // STEP 2: Only after every upload succeeds,
      // process staged deletions sequentially.
      const deletions = [...pendingDeletions];

      for (const mediaId of deletions) {
        await deleteMediaMutation.mutateAsync(mediaId);

        // Remove successfully deleted ID from pending state.
        setPendingDeletions((previous) =>
          previous.filter((id) => id !== mediaId)
        );
      }
    } catch (error) {
      // Keep failed and unprocessed changes for retry.
      // Successful operations have already been removed
      // from their respective pending lists.
      console.error("Unable to save gym media changes:", error);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <PageContainer>
        <p className="text-muted-foreground">
          Loading gym media...
        </p>
      </PageContainer>
    );
  }

  if (isError || !gym) {
    return (
      <PageContainer>
        <p className="text-destructive">
          Unable to load gym details. Please try again.
        </p>

        <Button
          variant="outline"
          className="mt-4"
          onClick={handleGoBack}
        >
          Go Back
        </Button>
      </PageContainer>
    );
  }

  // Existing uploaded media from the gym response.
  const logoMedia = gym.media?.logo ? [gym.media.logo] : [];

  const coverMedia = gym.media?.cover_image
    ? [gym.media.cover_image]
    : [];

  const galleryMedia = gym.media?.gallery ?? [];
  const facilityMedia = gym.media?.facility_images ?? [];
  const verificationMedia =
    gym.media?.verification_documents ?? [];

  return (
    <PageContainer>
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={handleGoBack}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>

        <PageHeader
          title="Manage Gym Media"
          description="Manage your gym logo, cover image, gallery, facility images and verification documents."
        />
      </div>

      {/* Gym Information */}
      <Card className="mt-6">
        <CardHeader>
          <div className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5 text-muted-foreground" />

            <CardTitle>{gym.name}</CardTitle>
          </div>

          <CardDescription>
            Manage all media associated with this gym.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-muted-foreground">
            {gym.address.city}, {gym.address.state}
          </p>
        </CardContent>
      </Card>

      {/* Upload Media */}
      <div className="mt-8 space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Upload Media</h2>

          <p className="text-sm text-muted-foreground">
            Select, crop and organize your media before saving.
            Your changes will not be uploaded until you click Save Changes.
          </p>
        </div>

        {/* Logo and Cover */}
        <div className="grid gap-6 lg:grid-cols-2">
          <LogoUpload
            files={pendingMedia.logo}
            onFilesChange={handleLogoFilesChange}
          />

          <CoverImageUpload
            files={pendingMedia.coverImage}
            onFilesChange={handleCoverFilesChange}
          />
        </div>

        {/* Gallery and Facility */}
        <div className="grid gap-6 lg:grid-cols-2">
          <GalleryManager
            files={pendingMedia.gallery}
            onFilesChange={handleGalleryFilesChange}
          />

          <FacilityImageManager
            files={pendingMedia.facility}
            onFilesChange={handleFacilityFilesChange}
          />
        </div>

        {/* Verification Documents */}
        <VerificationDocumentManger
          files={pendingMedia.verificationDocuments}
          onFilesChange={handleVerificationFilesChange}
        />

        {/* Common Save and Cancel Actions */}
        <Card>
          <CardContent className="flex flex-col justify-between gap-4 pt-6 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm font-medium">
                {hasPendingChanges
                  ? "You have unsaved changes"
                  : "All changes are saved"}
              </p>

              <p className="text-xs text-muted-foreground">
                {hasPendingUploads &&
                  `${Object.values(pendingMedia).reduce(
                    (total, files) => total + files.length,
                    0
                  )} file(s) waiting to upload`}
                {hasPendingUploads && pendingDeletions.length > 0
                  ? " · "
                  : ""}
                {pendingDeletions.length > 0 &&
                  `${pendingDeletions.length} file(s) marked for deletion`}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancelChanges}
                disabled={!hasPendingChanges || isSaving}
              >
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>

              <Button
                type="button"
                onClick={handleSaveChanges}
                disabled={!hasPendingChanges || isSaving}
              >
                <Save className="mr-2 h-4 w-4" />
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Uploaded Media */}
      <div className="mt-10 space-y-4">
        <div className="flex items-center gap-2">
          <Images className="h-5 w-5 text-muted-foreground" />

          <div>
            <h2 className="text-lg font-semibold">
              Uploaded Media
            </h2>

            <p className="text-sm text-muted-foreground">
              View and manage files already uploaded to your gym.
            </p>
          </div>
        </div>

        {/* Logo and Cover */}
        <div className="grid gap-6 lg:grid-cols-2">
          <UploadedMediaSection
            title="Gym Logo"
            description="Currently uploaded gym logo."
            media={logoMedia}
            onDelete={handleDeleteMedia}
            onUndoDelete={handleUndoDelete}
            pendingDeletions={pendingDeletions}
          />

          <UploadedMediaSection
            title="Cover Image"
            description="Currently uploaded gym cover image."
            media={coverMedia}
            onDelete={handleDeleteMedia}
            onUndoDelete={handleUndoDelete}
            pendingDeletions={pendingDeletions}
          />
        </div>

        {/* Gallery and Facility */}
        <div className="grid gap-6 lg:grid-cols-2">
          <UploadedMediaSection
            title="Gallery Images"
            description={`${galleryMedia.length} uploaded gallery image(s).`}
            media={galleryMedia}
            onDelete={handleDeleteMedia}
            onUndoDelete={handleUndoDelete}
            pendingDeletions={pendingDeletions}
          />

          <UploadedMediaSection
            title="Facility Images"
            description={`${facilityMedia.length} uploaded facility image(s).`}
            media={facilityMedia}
            onDelete={handleDeleteMedia}
            onUndoDelete={handleUndoDelete}
            pendingDeletions={pendingDeletions}
          />
        </div>

        {/* Verification Documents */}
        <UploadedMediaSection
          title="Verification Documents"
          description={`${verificationMedia.length} uploaded verification document(s).`}
          media={verificationMedia}
          onDelete={handleDeleteMedia}
          onUndoDelete={handleUndoDelete}
          pendingDeletions={pendingDeletions}
        />
      </div>
    </PageContainer>
  );
}
