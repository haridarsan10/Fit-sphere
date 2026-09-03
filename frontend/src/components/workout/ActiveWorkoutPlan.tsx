import { CalendarDays, Dumbbell, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ActiveWorkoutPlan() {
  return (
    <div className="space-y-6">
      {/* Plan Header */}
      <div>
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-2xl font-bold">
            Strength & Muscle Building
          </h2>

          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            Active
          </span>
        </div>

        <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
          <UserRound className="h-4 w-4" />
          Assigned by Alex Johnson
        </div>
      </div>

      {/* Plan Information */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-lg border p-4">
          <CalendarDays className="mb-2 h-5 w-5 text-muted-foreground" />

          <p className="text-xs text-muted-foreground">
            Duration
          </p>

          <p className="mt-1 font-semibold">
            8 Weeks
          </p>
        </div>

        <div className="rounded-lg border p-4">
          <Dumbbell className="mb-2 h-5 w-5 text-muted-foreground" />

          <p className="text-xs text-muted-foreground">
            Frequency
          </p>

          <p className="mt-1 font-semibold">
            4 Days / Week
          </p>
        </div>

        <div className="rounded-lg border p-4">
          <p className="text-xs text-muted-foreground">
            Progress
          </p>

          <p className="mt-1 font-semibold">
            Week 4 of 8
          </p>

          <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
            <div className="h-full w-1/2 rounded-full bg-primary" />
          </div>
        </div>
      </div>

      <Button>
        View Workout Plan
      </Button>
    </div>
  );
}