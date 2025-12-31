"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface DigitalHearthCardProps {
  eyebrow?: string;
  className?: string;
}

export function DigitalHearthCard({
  eyebrow,
  className,
}: DigitalHearthCardProps) {
  return (
    <a
      href="https://www.digitalhearth.care"
      target="_blank"
      rel="noreferrer noopener"
      aria-label="The Digital Hearth - Open project"
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
            src="/assets/digital-hearth-bg.png"
            alt="The Digital Hearth - Caregiver Support System"
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
            {eyebrow && (
              <Badge
                variant="secondary"
                className="w-fit bg-rose-500/90 backdrop-blur-sm text-white border-rose-400/50"
              >
                {eyebrow}
              </Badge>
            )}
            <h3 className="text-xl font-semibold leading-tight tracking-tight text-white drop-shadow-lg md:text-2xl">
              The Digital Hearth
            </h3>
            <p className="text-sm leading-relaxed text-white/90 drop-shadow-md max-w-md">
              Caregiver Support System. Full-stack Azure AI implementation.
            </p>
          </div>

          {/* Action Indicator */}
          <div className="mt-auto flex items-center gap-2 text-xs font-medium text-white/80">
            <span className="drop-shadow-md">Open project</span>
            <ArrowUpRight className="size-3 opacity-80" />
          </div>
        </div>
      </Card>
    </a>
  );
}

