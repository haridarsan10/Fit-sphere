
import PageContainer from "@/components/common/PageContainer";
import PageHeader from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/common/SectionCard";
import { StatsCard1 } from "@/components/ui/stats-card1";
import { useNavigate } from "@tanstack/react-router";
import { Building2, MapPin, Phone, Plus } from "lucide-react";

import { useGetGym } from "../hooks/useGetGym";

export default function MyGyms() {
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useGetGym();

  const gyms = data?.gyms  ?? [];

  const handleAddGym = () => {
    navigate({ to: "/gym-owner/add-gym" });
  };

  if (isLoading) {
    return (
      <PageContainer>
        <PageHeader
          title="My Gyms"
          description="Manage and monitor all your registered gyms."
        />
        <p className="mt-6 text-sm text-muted-foreground">
          Loading your gyms...
        </p>
      </PageContainer>
    );
  }

  if (isError) {
    return (
      <PageContainer>
        <PageHeader
          title="My Gyms"
          description="Manage and monitor all your registered gyms."
        />
        <p className="mt-6 text-sm text-destructive">
          {error instanceof Error ? error.message : "Failed to load gyms."}
        </p>
        <Button className="mt-4" onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeader
        title="My Gyms"
        description="Manage and monitor all your registered gyms."
      />

      <div className="mt-6 flex justify-end">
        <Button onClick={handleAddGym}>
          <Plus className="mr-2 h-4 w-4" />
          Add Gym
        </Button>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard1 />
      </div>

      <div className="mt-6">
        <SectionCard
          title="Your Registered Gyms"
          description="View and manage the gyms associated with your account."
        >
          {gyms.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Building2 className="mb-3 h-10 w-10 text-muted-foreground" />
              <h3 className="text-lg font-semibold">No gyms found</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Start by adding your first gym.
              </p>
              <Button className="mt-4" onClick={handleAddGym}>
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Gym
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {gyms.map((gym) => (
                <div
                  key={gym.id}
                  className="space-y-4 rounded-lg border p-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-muted p-3">
                        <Building2 className="h-6 w-6" />
                      </div>

                      <div>
                        <h3 className="font-semibold">{gym.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Gym ID: {gym.id}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        gym.status === "APPROVED"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {gym.status}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 shrink-0" />
                      {gym.address?.city}, {gym.address?.state}
                    </div>

                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 shrink-0" />
                      {gym.contact_phone}
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      navigate({
                        to: "/gym-owner/gyms/$gymId",
                        params: { gymId: gym.id },
                      });
                    }}
                  >
                    View Details
                  </Button>
                </div>
              ))}
            </div>
          )}
        </SectionCard>
      </div>
    </PageContainer>
  );
}
