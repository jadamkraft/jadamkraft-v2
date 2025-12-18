import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export function HeroCard() {
  return (
    <div className="flex h-full w-full flex-col justify-between gap-6">
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
  );
}
