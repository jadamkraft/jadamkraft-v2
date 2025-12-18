import { BentoGrid } from "@/components/bento-grid";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, Mail } from "lucide-react";
import { fetchGitHubStats } from "@/lib/github";

export default async function HomePage() {
  const githubStats = await fetchGitHubStats("jadamkraft");
  return (
    <main className="mx-auto min-h-dvh w-full max-w-6xl px-4 py-8 md:px-8 md:py-12">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div className="space-y-2">
          <Badge variant="secondary" className="bg-secondary/60">
            Command Center
          </Badge>
          <h1 className="text-xl font-semibold tracking-tight md:text-2xl">
            jadamkraft-v2
          </h1>
        </div>
        <div className="hidden items-center gap-2 md:flex">
          <Button asChild variant="secondary">
            <a href="#contact">
              <Mail className="size-4" />
              Contact
            </a>
          </Button>
          <Button asChild>
            <a
              href="https://github.com/jadamkraft"
              target="_blank"
              rel="noreferrer noopener"
            >
              <Github className="size-4" />
              GitHub
            </a>
          </Button>
        </div>
      </div>

      <BentoGrid githubStats={githubStats} />
    </main>
  );
}
