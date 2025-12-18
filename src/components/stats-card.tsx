import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { GitHubStats } from "@/lib/github";

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

interface StatsCardProps {
  githubStats: GitHubStats;
}

export function StatsCard({ githubStats }: StatsCardProps) {
  return (
    <div className="flex h-full w-full flex-col justify-between gap-3">
      <div className="space-y-2">
        {githubStats.status === "online" ? (
          <div className="space-y-1 font-mono text-xs">
            <div className="text-foreground">
              <span className="text-muted-foreground">Repos:</span>{" "}
              {githubStats.totalRepos}
            </div>
            {githubStats.latestCommit && (
              <div className="truncate text-foreground">
                <span className="text-muted-foreground">Latest:</span>{" "}
                {githubStats.latestCommit.message.split("\n")[0].slice(0, 30)}
                {githubStats.latestCommit.message.length > 30 ? "..." : ""}
              </div>
            )}
          </div>
        ) : (
          <div className="text-xs text-muted-foreground">Disconnected</div>
        )}
      </div>

      <Button asChild variant="outline" size="sm" className="w-full text-xs">
        <a
          href="https://github.com/jadamkraft"
          target="_blank"
          rel="noreferrer noopener"
        >
          <Github className="size-3" />
          View
        </a>
      </Button>
    </div>
  );
}
