import { Button } from "@/components/ui/button";
import { Github, Mail } from "lucide-react";

export function ContactCard() {
  return (
    <div
      id="contact"
      className="flex h-full w-full flex-col justify-between gap-3"
    >
      <div className="space-y-1">
        <p className="text-xs font-medium">Let's build</p>
        <p className="text-xs text-muted-foreground line-clamp-2">
          Open to consulting, collaborations, and weird-but-useful ideas.
        </p>
      </div>
      <div className="flex gap-2">
        <Button asChild size="sm" className="flex-1 text-xs">
          <a href="mailto:adam@jadamkraft.com">
            <Mail className="size-3" />
            <span className="hidden sm:inline">Email</span>
          </a>
        </Button>
        <Button
          asChild
          variant="secondary"
          size="sm"
          className="flex-1 text-xs"
        >
          <a
            href="https://github.com/jadamkraft"
            target="_blank"
            rel="noreferrer noopener"
          >
            <Github className="size-3" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </Button>
      </div>
    </div>
  );
}
