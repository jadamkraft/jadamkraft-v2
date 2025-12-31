"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Linkedin, Twitter } from "lucide-react";

export function SocialMediaTile() {
  return (
    <div className="flex h-full w-full flex-col justify-between gap-2">
      <div className="flex flex-col gap-2">
        <Button
          asChild
          variant="outline"
          size="sm"
          className="w-full text-xs"
        >
          <a
            href="https://www.linkedin.com/in/jadamkraft/"
            target="_blank"
            rel="noreferrer noopener"
          >
            <Linkedin className="size-3" />
            LinkedIn
          </a>
        </Button>
        <Button
          asChild
          variant="outline"
          size="sm"
          className="w-full text-xs"
        >
          <a
            href="https://x.com/thejadamkraft"
            target="_blank"
            rel="noreferrer noopener"
          >
            <Twitter className="size-3" />
            X
          </a>
        </Button>
      </div>
    </div>
  );
}

