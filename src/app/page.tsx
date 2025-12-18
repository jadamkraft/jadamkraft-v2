import { BentoGrid } from "@/components/bento-grid";
import { BentoItem } from "@/components/bento-item";
import { AnimatedTomlinsonCard } from "@/components/animated-tomlinson-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowUpRight, Github, Mail } from "lucide-react";
import { fetchGitHubStats } from "@/lib/github";

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

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

      <BentoGrid>
        {/* Hero */}
        <BentoItem colSpan={2} rowSpan={2}>
          <div className="flex h-full flex-col justify-between gap-6">
            <div className="flex items-start justify-between gap-6">
              <div className="space-y-3">
                <Badge variant="outline" className="border-border/60">
                  Solutions Engineer
                </Badge>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">J Adam Kraft</p>
                  <h2 className="text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
                    Building fast systems with a human pulse.
                  </h2>
                </div>
              </div>

              <div className="relative hidden size-28 shrink-0 overflow-hidden rounded-2xl border border-border/60 bg-muted md:block">
                <div className="absolute inset-0 bg-[radial-gradient(700px_circle_at_30%_20%,hsl(var(--foreground)/0.10),transparent_55%)]" />
                <div className="absolute inset-0 grid place-items-center text-xs text-muted-foreground">
                  Photo
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Separator className="bg-border/60" />
              <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                <span className="font-mono">Next.js</span>
                <span className="font-mono">TypeScript</span>
                <span className="font-mono">Tailwind</span>
                <span className="font-mono">shadcn/ui</span>
              </div>
            </div>
          </div>
        </BentoItem>

        {/* Flagship */}
        <AnimatedTomlinsonCard />

        {/* Creative (Poet) */}
        <BentoItem
          colSpan={1}
          rowSpan={2}
          eyebrow="Creative"
          title="Just a half touch"
        >
          <div
            className="relative flex h-full flex-col justify-start rounded-lg bg-cover bg-center bg-no-repeat p-8 font-serif italic leading-loose text-foreground"
            style={{
              backgroundImage: "url('/assets/paper-texture.png')",
            }}
          >
            <p className="text-sm">
              Just a half touch, Incidental. Maybe in times small things stayed
              small. When did the world change?
            </p>
            <p className="mt-4 text-sm">
              It only ever made my soul scream louder. I can't find any place to
              rest my body now
            </p>
            <p className="mt-4 text-sm">Except in Ex- istential dreams.</p>
          </div>
        </BentoItem>

        {/* Stats (Engineer) */}
        <BentoItem
          colSpan={1}
          rowSpan={1}
          eyebrow="Stats"
          title={
            <div className="flex items-center gap-2">
              <span>GitHub activity</span>
              {githubStats.status === "online" && (
                <span
                  className="inline-block size-2 rounded-full bg-green-500"
                  aria-label="Systems Online"
                />
              )}
            </div>
          }
        >
          <div className="font-mono text-xs leading-relaxed text-muted-foreground">
            <div className="space-y-1">
              <div>$ github contributions --year 2025</div>
              {githubStats.status === "online" ? (
                <>
                  <div className="text-foreground">
                    Public repos:{" "}
                    <span className="font-mono">{githubStats.totalRepos}</span>
                  </div>
                  {githubStats.latestCommit ? (
                    <div className="text-foreground">
                      Latest commit:{" "}
                      <span className="font-mono">
                        {githubStats.latestCommit.message}
                      </span>
                      <br />
                      <span className="opacity-70">
                        {formatDate(githubStats.latestCommit.date)}
                      </span>
                    </div>
                  ) : (
                    <div className="opacity-70">No recent commits</div>
                  )}
                </>
              ) : (
                <div className="text-foreground">Status: Disconnected</div>
              )}
            </div>
          </div>
          <div className="mt-4">
            <Button asChild variant="outline" className="w-full">
              <a
                href="https://github.com/jadamkraft"
                target="_blank"
                rel="noreferrer noopener"
              >
                <Github className="size-4" />
                View profile
              </a>
            </Button>
          </div>
        </BentoItem>

        {/* Contact */}
        <BentoItem
          colSpan={2}
          rowSpan={1}
          eyebrow="Contact"
          title="Let’s build"
        >
          <div
            id="contact"
            className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center"
          >
            <p className="text-sm text-muted-foreground">
              Open to consulting, collaborations, and weird-but-useful ideas.
            </p>
            <div className="flex w-full flex-col gap-2 sm:flex-row md:w-auto">
              <Button asChild className="w-full md:w-auto">
                <a href="mailto:adam@jadamkraft.com">
                  <Mail className="size-4" />
                  Email me
                </a>
              </Button>
              <Button asChild variant="secondary" className="w-full md:w-auto">
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
        </BentoItem>
      </BentoGrid>
    </main>
  );
}
