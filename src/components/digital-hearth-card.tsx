"use client";

import * as React from "react";
import { Heart, ArrowUpRight } from "lucide-react";

export function DigitalHearthCard() {
  return (
    <div className="flex h-full w-full flex-col justify-between gap-3">
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-gradient-to-br from-rose-500/20 to-orange-500/20 p-2">
            <Heart className="size-5 text-rose-500" />
          </div>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Caregiver Support System. Full-stack Azure AI implementation.
        </p>
      </div>
      <div className="flex items-center gap-2 text-xs font-medium text-foreground/80">
        <span>The Digital Hearth</span>
        <ArrowUpRight className="size-3 opacity-60" />
      </div>
    </div>
  );
}

