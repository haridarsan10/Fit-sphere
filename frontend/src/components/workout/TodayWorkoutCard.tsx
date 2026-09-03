import { Clock, Dumbbell } from "lucide-react";
import { Button } from "@/components/ui/button";

const exercises = [
  "Bench Press",
  "Incline Dumbbell Press",
  "Cable Fly",
  "Tricep Pushdown",
  "Overhead Extension",
];

export function TodayWorkoutCard() {
  return (
    <div className="flex h-full flex-col">
      {/* Workout Info */}
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-2">
          <Dumbbell className="h-4 w-4" />
          5 Exercises
        </span>

        <span className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          ~45 min
        </span>
      </div>

      {/* Exercise List */}
      <div className="mt-5 space-y-3">
        {exercises.map((exercise, index) => (
          <div
            key={exercise}
            className="flex items-center gap-3"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium">
              {index + 1}
            </span>

            <span className="text-sm">
              {exercise}
            </span>
          </div>
        ))}
      </div>

      {/* Action */}
      <Button className="mt-6 w-full">
        Start Workout
      </Button>
    </div>
  );
}