import { Check, Dumbbell, RotateCcw } from "lucide-react";

const workoutDays = [
  {
    day: "MON",
    date: "1",
    workout: "Chest",
    status: "completed",
  },
  {
    day: "TUE",
    date: "2",
    workout: "Back",
    status: "completed",
  },
  {
    day: "WED",
    date: "3",
    workout: "Legs",
    status: "today",
  },
  {
    day: "THU",
    date: "4",
    workout: "Shoulders",
    status: "upcoming",
  },
  {
    day: "FRI",
    date: "5",
    workout: "Arms",
    status: "upcoming",
  },
  {
    day: "SAT",
    date: "6",
    workout: "Rest",
    status: "rest",
  },
  {
    day: "SUN",
    date: "7",
    workout: "Rest",
    status: "rest",
  },
];

export function WorkoutCalendar() {
  return (
    <div className="space-y-5">
      {/* Week Navigation */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium">September 2026</p>
          <p className="text-xs text-muted-foreground">
            Your workout schedule
          </p>
        </div>

        <button className="text-sm text-muted-foreground hover:text-foreground">
          View Calendar →
        </button>
      </div>

      {/* Workout Days */}
      <div className="grid grid-cols-7 gap-2">
        {workoutDays.map((item) => (
          <div
            key={item.date}
            className={`flex min-h-24 flex-col items-center justify-between rounded-lg border p-2 text-center ${
              item.status === "today"
                ? "border-primary bg-primary/5"
                : ""
            }`}
          >
            <span className="text-[10px] font-medium text-muted-foreground">
              {item.day}
            </span>

            <span
              className={`text-lg font-semibold ${
                item.status === "today"
                  ? "text-primary"
                  : ""
              }`}
            >
              {item.date}
            </span>

            {item.status === "completed" && (
              <Check className="h-4 w-4" />
            )}

            {item.status === "today" && (
              <Dumbbell className="h-4 w-4 text-primary" />
            )}

            {item.status === "upcoming" && (
              <Dumbbell className="h-4 w-4 text-muted-foreground" />
            )}

            {item.status === "rest" && (
              <RotateCcw className="h-4 w-4 text-muted-foreground" />
            )}

            <span className="max-w-full truncate text-[10px] text-muted-foreground">
              {item.workout}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}