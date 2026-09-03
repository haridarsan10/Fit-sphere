import { CalendarDays, Clock, Dumbbell } from "lucide-react";
import { Button } from "@/components/ui/button";

export function NextWorkoutCard() {
  return (
    <div className="flex h-full flex-col">
      {/* Workout */}
      <div>
        <h3 className="text-xl font-semibold">
          Back & Biceps
        </h3>

        <div className="mt-3 space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
            Tomorrow
          </div>

          <div className="flex items-center gap-2">
            <Dumbbell className="h-4 w-4" />
            6 Exercises
          </div>

          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            ~50 min
          </div>
        </div>
      </div>

      {/* Action */}
      <Button
        variant="outline"
        className="mt-6 w-full"
      >
        View Workout
      </Button>
    </div>
  );
}