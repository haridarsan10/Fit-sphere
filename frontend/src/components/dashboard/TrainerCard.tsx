import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle, Video } from "lucide-react";

export function TrainerCard() {
  return (
    <div className="space-y-5">
      {/* Trainer Profile */}
      <div className="flex items-center gap-4">
        <Avatar className="h-14 w-14">
          <AvatarImage
            src="https://i.pravatar.cc/150?img=12"
            alt="Alex Johnson"
          />
          <AvatarFallback>AJ</AvatarFallback>
        </Avatar>

        <div className="min-w-0">
          <h3 className="font-semibold">Alex Johnson</h3>
          <p className="text-sm text-muted-foreground">
            Personal Trainer
          </p>
        </div>
      </div>

      {/* Trainer Message */}
      <div className="rounded-lg bg-muted/50 p-4">
        <p className="text-sm text-muted-foreground">
          Trainer's note
        </p>

        <p className="mt-1 text-sm">
          "Increase your squat weight next week."
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button className="flex-1" variant="outline">
          <MessageCircle className="mr-2 h-4 w-4" />
          Chat
        </Button>

        <Button className="flex-1">
          <Video className="mr-2 h-4 w-4" />
          Video Call
        </Button>
      </div>
    </div>
  );
}