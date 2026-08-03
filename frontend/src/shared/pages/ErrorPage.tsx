import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";

interface ErrorPageProps {
  error: Error;
}

export default function ErrorPage({ error }: ErrorPageProps) {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">
        Something went wrong
      </h1>

      <p className="text-muted-foreground">
        {error.message || "An unexpected error occurred"}
      </p>

      <Button
        onClick={() => navigate({ to: "/" })}
      >
        Go Home
      </Button>
    </div>
  );
}