import { BentoGrid } from "@/components/bento-grid";
import { BentoItem } from "@/components/bento-item";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowUpRight, Github, Mail } from "lucide-react";

export default function HomePage() {
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
              href="https://github.com/"
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
        <BentoItem className="md:col-span-4 md:row-span-2">
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
        <BentoItem
          className="md:col-span-2 md:row-span-2"
          eyebrow="Flagship"
          title="Tomlinson 10"
          href="https://tomlinson.jadamkraft.com"
          icon={<ArrowUpRight className="size-4" />}
        >
          <p className="text-sm leading-relaxed text-muted-foreground">
            A focused build exploring product storytelling, system design, and
            polished UI in public.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium">
            Open project <ArrowUpRight className="size-4" />
          </div>
        </BentoItem>

        {/* Creative (Poet) */}
        <BentoItem
          className="md:col-span-3"
          eyebrow="Creative"
          title="Clark Kent"
        >
          <div className="font-serif">
            <p className="text-sm leading-relaxed text-muted-foreground">
              I keep two lives in one jacket:
              <br />
              one pocket for the build logs,
              <br />
              the other for the bruise of a line
              <br />
              that finally tells the truth.
            </p>
            <p className="mt-4 text-xs text-muted-foreground">
              (Poem module placeholder — serif typography on purpose.)
            </p>
          </div>
        </BentoItem>

        {/* Stats (Engineer) */}
        <BentoItem
          className="md:col-span-3"
          eyebrow="Stats"
          title="GitHub activity"
        >
          <div className="font-mono text-xs leading-relaxed text-muted-foreground">
            <div className="space-y-1">
              <div>$ github contributions --year 2025</div>
              <div className="text-foreground">… fetching (placeholder)</div>
              <div className="opacity-70">
                green squares will live here soon.
              </div>
            </div>
          </div>
          <div className="mt-4">
            <Button asChild variant="outline" className="w-full">
              <a
                href="https://github.com/"
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
          className="md:col-span-6"
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
                  href="https://github.com/"
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
