import { TrendingDown, Dumbbell, Target } from "lucide-react";

export function ProgressCard() {
  return (
    <div className="space-y-5">
      {/* Weight Summary */}
      <div>
        <p className="text-sm text-muted-foreground">
          Current Weight
        </p>

        <div className="mt-1 flex items-end gap-2">
          <span className="text-3xl font-bold">68 kg</span>

          <span className="mb-1 flex items-center text-sm text-green-600">
            <TrendingDown className="mr-1 h-4 w-4" />
            2 kg
          </span>
        </div>

        <p className="mt-1 text-xs text-muted-foreground">
          Down from 70 kg this month
        </p>
      </div>

      {/* Simple Progress Placeholder */}
      <div className="flex h-32 items-end gap-2 rounded-lg bg-muted/40 p-4">
        {[45, 60, 50, 70, 65, 80, 90].map((height, index) => (
          <div
            key={index}
            className="flex flex-1 items-end"
          >
            <div
              className="w-full rounded-sm bg-primary/70"
              style={{ height: `${height}%` }}
            />
          </div>
        ))}
      </div>

      {/* Progress Metrics */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg border p-3">
          <div className="flex items-center gap-2">
            <Dumbbell className="h-4 w-4 text-muted-foreground" />

            <span className="text-xs text-muted-foreground">
              Strength
            </span>
          </div>

          <p className="mt-1 font-semibold">+12%</p>
        </div>

        <div className="rounded-lg border p-3">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-muted-foreground" />

            <span className="text-xs text-muted-foreground">
              Consistency
            </span>
          </div>

          <p className="mt-1 font-semibold">85%</p>
        </div>
      </div>
    </div>
  );
}