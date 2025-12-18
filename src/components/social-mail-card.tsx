import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

export function SocialMailCard() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <Button
        asChild
        variant="ghost"
        size="lg"
        className="h-full w-full flex-col gap-2"
      >
        <a href="mailto:adam@jadamkraft.com">
          <Mail className="size-6" />
          <span className="text-xs font-medium">Email</span>
        </a>
      </Button>
    </div>
  );
}
