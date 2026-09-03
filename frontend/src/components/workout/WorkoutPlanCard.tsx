import { CalendarDays, Dumbbell } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WorkoutPlanCardProps {
  title: string;
  description: string;
  duration: string;
  frequency: string;
  status: "Active" | "Completed";
}

export function WorkoutPlanCard({
  title,
  description,
  duration,
  frequency,
  status,
}: WorkoutPlanCardProps) {
  return (
    <div className="flex h-full flex-col rounded-lg border p-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-semibold">
          {title}
        </h3>

        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
            status === "Active"
              ? "bg-primary/10 text-primary"
              : "bg-muted text-muted-foreground"
          }`}
        >
          {status}
        </span>
      </div>

      <p className="mt-2 text-sm text-muted-foreground">
        {description}
      </p>

      {/* Details */}
      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-muted-foreground" />
          <span>{duration}</span>
        </div>

        <div className="flex items-center gap-2">
          <Dumbbell className="h-4 w-4 text-muted-foreground" />
          <span>{frequency}</span>
        </div>
      </div>

      {/* Action */}
      <Button
        variant="outline"
        className="mt-4 w-full"
      >
        View Plan
      </Button>
    </div>
  );
}