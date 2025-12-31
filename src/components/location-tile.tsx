"use client";

import * as React from "react";
import { MapPin } from "lucide-react";

export function LocationTile() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2">
      <MapPin className="size-4 text-muted-foreground" />
      <p className="text-xs font-medium text-foreground">Tulsa, OK</p>
    </div>
  );
}

