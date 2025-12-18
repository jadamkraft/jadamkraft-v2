"use client";

import { Stream } from "@cloudflare/stream-react";

export function SocialGitHubCard() {
  // Cloudflare Stream video ID
  const videoId = "492a25079a2da5610df2b9a06dcef3ac";

  // Start time in seconds
  const startTime = 47;

  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-lg">
      <Stream
        src={videoId}
        startTime={startTime}
        controls
        className="h-full w-full"
      />
    </div>
  );
}
