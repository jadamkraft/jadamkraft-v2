import * as React from "react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export type BentoItemProps = {
  className?: string;
  title?: string;
  eyebrow?: string;
  icon?: React.ReactNode;
  href?: string;
  children?: React.ReactNode;
};

function isExternalHref(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

export function BentoItem({
  className,
  title,
  eyebrow,
  icon,
  href,
  children,
}: BentoItemProps) {
  const external = href ? isExternalHref(href) : false;

  const card = (
    <Card
      className={cn(
        "group relative h-full overflow-hidden border-border/60 bg-card/60 shadow-sm transition-all",
        "hover:-translate-y-0.5 hover:shadow-lg",
        "focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background",
        className
      )}
    >
      {(title || eyebrow || icon) && (
        <CardHeader className="space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 space-y-2">
              {eyebrow && (
                <Badge
                  variant="secondary"
                  className="w-fit bg-secondary/60 text-foreground/80"
                >
                  {eyebrow}
                </Badge>
              )}
              {title && (
                <CardTitle className="text-base leading-tight tracking-tight">
                  {title}
                </CardTitle>
              )}
            </div>
            {icon && (
              <div className="shrink-0 text-muted-foreground transition-colors group-hover:text-foreground">
                {icon}
              </div>
            )}
          </div>
        </CardHeader>
      )}

      <CardContent className={cn(title || eyebrow || icon ? "pt-0" : "pt-6")}>
        {children}
      </CardContent>

      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100",
          "bg-[radial-gradient(1200px_circle_at_0%_0%,hsl(var(--foreground)/0.08),transparent_55%)]"
        )}
      />
    </Card>
  );

  if (!href) return card;

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer noopener" : undefined}
      className="block h-full rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      {card}
    </a>
  );
}
