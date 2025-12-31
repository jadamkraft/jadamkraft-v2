"use client";

import * as React from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";

export function LocationTile() {
  return (
    <div className="relative h-full w-full flex flex-col items-center justify-center gap-3 overflow-hidden">
      {/* Background Image Container */}
      <div className="absolute inset-0">
        <Image
          src="/location-bg.png"
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 25vw"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-3">
        {/* Status Indicator */}
        <div className="flex flex-col items-center gap-2">
          <span
            className="inline-block size-2.5 rounded-full bg-green-500 animate-pulse"
            aria-label="Field Ops Active"
          />
          <MapPin className="size-5 text-muted-foreground" />
        </div>

        {/* Primary Location */}
        <p className="text-sm font-semibold text-foreground">Libby, MT</p>

        {/* Secondary HQ Location */}
        <p className="text-xs text-muted-foreground">HQ: Tulsa, OK</p>
      </div>
    </div>
  );
}

