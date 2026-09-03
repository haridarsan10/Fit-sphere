import { Check, Clock3 } from "lucide-react";

const meals = [
  {
    name: "Breakfast",
    time: "8:00 AM",
    meal: "Oats, Eggs & Banana",
    completed: true,
  },
  {
    name: "Lunch",
    time: "1:00 PM",
    meal: "Chicken, Rice & Vegetables",
    completed: true,
  },
  {
    name: "Dinner",
    time: "8:00 PM",
    meal: "Grilled Chicken & Salad",
    completed: false,
  },
];

export function DietCard() {
  return (
    <div className="space-y-3">
      {meals.map((meal) => (
        <div
          key={meal.name}
          className="flex items-center justify-between rounded-lg border p-3"
        >
          <div className="flex min-w-0 items-center gap-3">
            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                meal.completed
                  ? "bg-primary/10"
                  : "bg-muted"
              }`}
            >
              {meal.completed ? (
                <Check className="h-4 w-4" />
              ) : (
                <Clock3 className="h-4 w-4 text-muted-foreground" />
              )}
            </div>

            <div className="min-w-0">
              <p className="text-sm font-medium">
                {meal.name}
              </p>

              <p className="truncate text-xs text-muted-foreground">
                {meal.meal}
              </p>
            </div>
          </div>

          <span className="ml-2 shrink-0 text-xs text-muted-foreground">
            {meal.time}
          </span>
        </div>
      ))}
    </div>
  );
}