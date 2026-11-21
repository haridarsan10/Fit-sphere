
import PageContainer from "@/components/common/PageContainer";
import PageHeader from "@/components/common/PageHeader";
import { SectionCard } from "@/components/common/SectionCard";
import { Button } from "@/components/ui/button";
import { gymOwnerGymDetailsRoute } from "@/app/router/gymOwner/gymOwnerGymDetailsRoute";


import { useNavigate } from "@tanstack/react-router";

import {
  PencilIcon,
  Building2,
  MapPin,
  Phone,
  Mail,
  Globe,
  Camera,
  Play,
  CalendarDays,
  Users,
  Dumbbell,
  Clock,
  Image as ImageIcon,
  FileText,
  ArrowLeft
} from "lucide-react";

import { useGetGymById } from "../hooks/useGetGymById";

const operatingDays = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const;

const formatStatus = (status: string) => {
  const statusStyles: Record<string, string> = {
    ACTIVE: "bg-green-100 text-green-700",
    APPROVED: "bg-green-100 text-green-700",
    PENDING: "bg-yellow-100 text-yellow-700",
    SUSPENDED: "bg-red-100 text-red-700",
    REJECTED: "bg-red-100 text-red-700",
  };

  return statusStyles[status] ?? "bg-muted text-muted-foreground";
};

const InfoItem = ({
  label,
  value,
}: {
  label: string;
  value?: string | number | null;
}) => (
  <div className="space-y-1">
    <p className="text-sm text-muted-foreground">{label}</p>
    <p className="text-sm font-medium break-words">
      {value || "Not provided"}
    </p>
  </div>
);

export default function GymDetails() {
  const navigate = useNavigate();

  const { gymId } = gymOwnerGymDetailsRoute.useParams();

  const { data: gym, isLoading, isError, error } = useGetGymById(gymId);

  const handleBack = () => {
    navigate({ to: "/gym-owner/gyms" });
  };

  const handleEditGym=()=>{
    navigate({
      to: "/gym-owner/gyms/edit-gym/$gymId",
      params: { gymId },
    });
  }

  if (isLoading) {
    return (
      <PageContainer>
        <PageHeader
          title="Gym Details"
          description="View and manage your gym information."
        />
        <p className="mt-6 text-sm text-muted-foreground">
          Loading gym details...
        </p>
      </PageContainer>
    );
  }

  if (isError || !gym) {
    return (
      <PageContainer>
        <PageHeader
          title="Gym Details"
          description="View and manage your gym information."
        />

        <p className="mt-6 text-sm text-destructive">
          {error instanceof Error
            ? error.message
            : "Failed to load gym details."}
        </p>

        <Button className="mt-4" variant="outline" onClick={handleBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to My Gyms
        </Button>
      </PageContainer>
    );
  }

  const fullAddress = [
    gym.address.address_line_1,
    gym.address.address_line_2,
    gym.address.city,
    gym.address.district,
    gym.address.state,
    gym.address.pincode,
    gym.address.country,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <PageContainer>
      <PageHeader
        title={gym.name}
        description="View and manage your gym information."
      />

      <div className="mt-6 flex justify-end">
        <Button onClick={handleEditGym}>
          <PencilIcon className="mr-2 h-4 w-4" />
          Edit Gym
        </Button>
      </div>

      {/* Back button and status */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <Button variant="outline" onClick={handleBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to My Gyms
        </Button>

        <span
          className={`rounded-full px-3 py-1.5 text-xs font-semibold ${formatStatus(
            gym.status
          )}`}
        >
          {gym.status}
        </span>
      </div>

      {/* Gym Overview */}
      <div className="mt-6 rounded-xl border bg-card p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-muted">
            {gym.media?.logo?.url ? (
              <img
                src={gym.media.logo.url}
                alt={`${gym.name} logo`}
                className="h-full w-full object-cover"
              />
            ) : (
              <Building2 className="h-10 w-10 text-muted-foreground" />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="text-xl font-bold">{gym.name}</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {gym.gym_type}
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {gym.address.city}, {gym.address.state}
              </span>

              <span className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                {gym.contact_phone}
              </span>
            </div>
          </div>
        </div>

        {gym.description && (
          <div className="mt-5 border-t pt-5">
            <p className="text-sm leading-6 text-muted-foreground">
              {gym.description}
            </p>
          </div>
        )}
      </div>

      {/* Basic Information */}
      <div className="mt-6">
        <SectionCard
          title="Basic Information"
          description="General information about your gym."
        >
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <InfoItem label="Gym Name" value={gym.name} />
            <InfoItem label="Gym Type" value={gym.gym_type} />
            <InfoItem label="Gym ID" value={gym.id} />
            <InfoItem
              label="Established Year"
              value={gym.established_year}
            />
            <InfoItem label="Status" value={gym.status} />
            <InfoItem label="Owner ID" value={gym.owner_id} />
          </div>
        </SectionCard>
      </div>

      {/* Address and Contact */}
      <div className="mt-6">
        <SectionCard
          title="Address & Contact Information"
          description="Location and communication details."
        >
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Gym Address</p>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    {fullAddress}
                  </p>
                </div>
              </div>

              <InfoItem
                  label="Coordinates"
                  value={
                    gym.address.coordinates?.latitude != null &&
                    gym.address.coordinates?.longitude != null
                      ? `${gym.address.coordinates.latitude}, ${gym.address.coordinates.longitude}`
                      : "Not provided"
                  }
                />
            </div>

            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Primary Phone</p>
                  <p className="text-sm text-muted-foreground">
                    {gym.contact_phone}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">
                    {gym.email}
                  </p>
                </div>
              </div>

              <InfoItem
                label="Alternate Phone"
                value={gym.contact?.alternate_phone}
              />

              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Website</p>
                  {gym.contact?.website ? (
                    <a
                      href={gym.contact.website}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-primary hover:underline"
                    >
                      {gym.contact.website}
                    </a>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Not provided
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 border-t pt-5">
            <h3 className="mb-4 text-sm font-semibold">Social Media</h3>

            <div className="flex flex-wrap gap-5">
              {gym.contact?.social_links?.instagram && (
                <a
                  href={gym.contact.social_links.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
                >
                  <Camera className="h-4 w-4" />
                  Instagram
                </a>
              )}

              {gym.contact?.social_links?.facebook && (
                <a
                  href={gym.contact.social_links.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
                >
                  <Globe className="h-4 w-4" />
                  Facebook
                </a>
              )}

              {gym.contact?.social_links?.youtube && (
                <a
                  href={gym.contact.social_links.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
                >
                  <Play className="h-4 w-4" />
                  YouTube
                </a>
              )}

              {!gym.contact?.social_links?.instagram &&
                !gym.contact?.social_links?.facebook &&
                !gym.contact?.social_links?.youtube && (
                  <p className="text-sm text-muted-foreground">
                    No social media links added.
                  </p>
                )}
            </div>
          </div>
        </SectionCard>
      </div>

      {/* Gym Media */}
      <div className="mt-6">
        <SectionCard
          title="Gym Media"
          description="Logo, cover image and gallery images."
        >
          <div className="space-y-6">
            <div>
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold">
                <ImageIcon className="h-4 w-4" />
                Cover Image
              </h3>

              {gym.media?.cover_image ? (
                <img
                  src={gym.media.cover_image.url}
                  alt="Gym cover"
                  className="h-52 w-full rounded-lg object-cover"
                />
              ) : (
                <div className="flex h-40 items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
                  No cover image uploaded.
                </div>
              )}
            </div>

            <div>
              <h3 className="mb-3 text-sm font-semibold">Gallery</h3>

              {gym.media?.gallery?.length ? (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                  {gym.media.gallery.map((media) => (
                    <div key={media.id}>
                      <img
                        src={media.url}
                        alt={media.caption || "Gym gallery"}
                        className="h-36 w-full rounded-lg object-cover"
                      />
                      {media.caption && (
                        <p className="mt-1 text-xs text-muted-foreground">
                          {media.caption}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No gallery images uploaded.
                </p>
              )}
            </div>

            <div>
              <h3 className="mb-3 text-sm font-semibold">
                Facility Images
              </h3>

              {gym.media?.facility_images?.length ? (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                  {gym.media.facility_images.map((media) => (
                    <div key={media.id}>
                      <img
                        src={media.url}
                        alt={media.caption || "Facility"}
                        className="h-36 w-full rounded-lg object-cover"
                      />
                      {media.caption && (
                        <p className="mt-1 text-xs text-muted-foreground">
                          {media.caption}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No facility images uploaded.
                </p>
              )}
            </div>

            <div>
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold">
                <FileText className="h-4 w-4" />
                Verification Documents
              </h3>

              {gym.media?.verification_documents?.length ? (
                <div className="space-y-2">
                  {gym.media.verification_documents.map((media) => (
                    <div
                      key={media.id}
                      className="flex items-center justify-between rounded-lg border p-3"
                    >
                      <div>
                        <p className="text-sm font-medium">
                          {media.file_name || media.caption || "Document"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {media.mime_type || "File"}
                        </p>
                      </div>

                      <a
                        href={media.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-primary hover:underline"
                      >
                        View
                      </a>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No verification documents uploaded.
                </p>
              )}
            </div>
          </div>
        </SectionCard>
      </div>

      {/* Facilities */}
      <div className="mt-6">
        <SectionCard
          title="Facilities"
          description="Facilities and amenities available at your gym."
        >
          {gym.facilities?.length ? (
            <div className="flex flex-wrap gap-2">
              {gym.facilities.map((facility, index) => (
                <span
                  key={`${facility}-${index}`}
                  className="rounded-full border bg-muted/50 px-3 py-2 text-sm"
                >
                  {facility}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No facilities added yet.
            </p>
          )}
        </SectionCard>
      </div>

      {/* Operating Hours */}
      <div className="mt-6">
        <SectionCard
          title="Operating Hours"
          description="Weekly opening and closing schedule."
        >
          {gym.operating_hours ? (
            <div className="space-y-3">
              {operatingDays.map((day) => {
                const hours = gym.operating_hours?.[day];

                return (
                  <div
                    key={day}
                    className="flex flex-wrap items-center justify-between gap-2 border-b pb-3 last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium capitalize">
                        {day}
                      </span>
                    </div>

                    {hours?.is_open ? (
                      <span className="text-sm text-muted-foreground">
                        {hours.open} - {hours.close}
                      </span>
                    ) : (
                      <span className="text-sm text-muted-foreground">
                        Closed
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Operating hours have not been configured.
            </p>
          )}
        </SectionCard>
      </div>

      {/* Business Details */}
      <div className="mt-6">
        <SectionCard
          title="Business Details"
          description="Legal and registration information."
        >
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <InfoItem
              label="Legal Business Name"
              value={gym.business_details?.legal_name}
            />

            <InfoItem
              label="GSTIN"
              value={gym.business_details?.gstin}
            />

            <InfoItem
              label="Registration Number"
              value={gym.business_details?.registration_number}
            />
          </div>
        </SectionCard>
      </div>

      {/* Gym Capacity and Dates */}
      <div className="mt-6">
        <SectionCard
          title="Gym Capacity & Records"
          description="Membership capacity and registration information."
        >
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-muted-foreground" />
              <InfoItem
                label="Maximum Members"
                value={gym.max_members}
              />
            </div>

            <div className="flex items-center gap-3">
              <Dumbbell className="h-5 w-5 text-muted-foreground" />
              <InfoItem
                label="Maximum Trainers"
                value={gym.max_trainers}
              />
            </div>

            <div className="flex items-center gap-3">
              <CalendarDays className="h-5 w-5 text-muted-foreground" />
              <InfoItem
                label="Created At"
                value={
                  gym.created_at
                    ? new Date(gym.created_at).toLocaleDateString()
                    : null
                }
              />
            </div>
          </div>
        </SectionCard>
      </div>
    </PageContainer>
  );
}
