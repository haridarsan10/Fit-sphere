
import PageContainer from "@/components/common/PageContainer";
import PageHeader from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/common/SectionCard";
import { StatsCard1 } from "@/components/ui/stats-card1";
import { useNavigate } from "@tanstack/react-router";
import { Building2, MapPin, Phone, Plus } from "lucide-react";

// Temporary data until API integration
const gyms = [
  {
    id: "1",
    name: "FitSphere Fitness",
    address: "Palakkad, Kerala",
    phone: "+91 9876543210",
    status: "Approved",
  },
  {
    id: "2",
    name: "FitSphere Premium",
    address: "Thrissur, Kerala",
    phone: "+91 9876543211",
    status: "Pending",
  },
];

export default function MyGyms() {
  const navigate = useNavigate();

  const handleAddGym = () => {
    navigate({ to: "/gym-owner/add-gym" });
  };

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <StatsCard1 />
      </div>

      <div className="mt-6">
        <SectionCard
          title="Your Registered Gyms"
          description="View and manage the gyms associated with your account."
        >
          {gyms.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Building2 className="h-10 w-10 text-muted-foreground mb-3" />
              <h3 className="font-semibold text-lg">No gyms found</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Start by adding your first gym.
              </p>
              <Button className="mt-4" onClick={handleAddGym}>
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Gym
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {gyms.map((gym) => (
                <div
                  key={gym.id}
                  className="rounded-lg border p-5 space-y-4"
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
                      className={`text-xs rounded-full px-2 py-1 font-medium ${
                        gym.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {gym.status}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {gym.address}
                    </div>

                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      {gym.phone}
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      navigate({ to: "/gym-owner/gyms/$gymId", params: { gymId: gym.id } });
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
