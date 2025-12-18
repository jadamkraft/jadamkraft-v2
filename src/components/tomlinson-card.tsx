"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function TomlinsonCard({ className }: { className?: string }) {
  return (
    <a
      href="https://tomlinson.jadamkraft.com"
      target="_blank"
      rel="noreferrer noopener"
      aria-label="Tomlinson 10 - Open flagship project"
      className={cn(
        "group block h-full w-full rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className
      )}
    >
      <Card
        className={cn(
          "relative h-full w-full overflow-hidden border-border/60 bg-card/60 shadow-sm transition-all",
          "hover:-translate-y-0.5 hover:shadow-lg",
          "focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background"
        )}
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/assets/tomlinson10.png"
            alt="Tomlinson 10 - A focused build exploring product storytelling, system design, and polished UI"
            fill
            priority
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/50 transition-opacity duration-500 group-hover:bg-black/40" />
          {/* Brightness overlay on hover */}
          <div className="absolute inset-0 bg-white/0 transition-all duration-500 group-hover:bg-white/10" />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 flex h-full flex-col justify-between p-6">
          {/* Header Section */}
          <div className="space-y-3">
            <Badge
              variant="secondary"
              className="w-fit bg-secondary/80 backdrop-blur-sm text-foreground/90"
            >
              Flagship
            </Badge>
            <h3 className="text-xl font-semibold leading-tight tracking-tight text-white drop-shadow-lg md:text-2xl">
              Tomlinson 10
            </h3>
          </div>

          {/* Action Button - appears/enhances on hover */}
          <div className="mt-auto">
            <Button
              variant="secondary"
              size="default"
              className={cn(
                "gap-2 bg-secondary/90 backdrop-blur-sm text-foreground transition-all duration-300",
                "opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0",
                "group-hover:bg-secondary group-hover:shadow-md",
                "pointer-events-none"
              )}
            >
              Open project
              <ArrowUpRight className="size-4" />
            </Button>
          </div>
        </div>
      </Card>
    </a>
  );
}
