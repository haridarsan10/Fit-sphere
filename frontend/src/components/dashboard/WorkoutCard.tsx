import { Button } from "@/components/ui/button";
import { CheckCircle2, Circle } from "lucide-react";

export function WorkoutCard() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Chest Workout</h3>
        <p className="text-sm text-muted-foreground">
          5 exercises assigned
        </p>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-green-500" />
          <span>Bench Press</span>
        </div>

        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-green-500" />
          <span>Incline Dumbbell Press</span>
        </div>

        <div className="flex items-center gap-2">
          <Circle className="h-5 w-5 text-muted-foreground" />
          <span>Cable Fly</span>
        </div>
      </div>

      <Button className="w-full">
        Start Workout
      </Button>
    </div>
  );
}