import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

export function SocialGitHubCard() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <Button
        asChild
        variant="ghost"
        size="lg"
        className="h-full w-full flex-col gap-2"
      >
        <a
          href="https://github.com/jadamkraft"
          target="_blank"
          rel="noreferrer noopener"
        >
          <Github className="size-6" />
          <span className="text-xs font-medium">GitHub</span>
        </a>
      </Button>
    </div>
  );
}
