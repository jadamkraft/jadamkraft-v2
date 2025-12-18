"use client";

import * as React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

type InputState = "reading" | "listening";

interface BookData {
  title: string;
  author: string;
  image: string;
  channel: string;
}

const readingData: BookData = {
  title: "The Seven Storey Mountain",
  author: "Thomas Merton",
  image: "/assets/the-seven-storey-mountain.jpg",
  channel: "VISUAL INPUT",
};

const listeningData: BookData = {
  title: "Confessions",
  author: "St. Augustine",
  image: "/assets/confessions.jpg",
  channel: "AUDIO INPUT",
};

export function ActiveInputTile() {
  const [state, setState] = React.useState<InputState>("reading");
  const [isLibraryOpen, setIsLibraryOpen] = React.useState(false);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setState((prev) => (prev === "reading" ? "listening" : "reading"));
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const currentData = state === "reading" ? readingData : listeningData;

  const handleLibraryClick = () => {
    setIsLibraryOpen(true);
  };

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Background Image Container */}
      <div className="absolute inset-0">
        <Image
          src={currentData.image}
          alt={`${currentData.title} by ${currentData.author}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 25vw"
        />
        {/* Darkened Overlay */}
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex h-full flex-col justify-between p-4 md:p-6">
        {/* Top Section: Channel Label + Library Button */}
        <div className="flex items-start justify-between">
          <span className="font-mono text-xs text-white/80">
            {currentData.channel}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLibraryClick}
            className="h-auto px-2 py-1 font-mono text-xs text-white/80 hover:text-white hover:bg-white/10"
          >
            LOGS
          </Button>
        </div>

        {/* Middle Section: Title and Author */}
        <div className="space-y-1">
          <h3 className="text-lg font-semibold leading-tight tracking-tight text-white drop-shadow-lg md:text-xl">
            {currentData.title}
          </h3>
          <p className="text-sm text-white/90 drop-shadow-md md:text-base">
            {currentData.author}
          </p>
        </div>

        {/* Bottom Section: Progress Bar or Waveform */}
        <div className="mt-2">
          {state === "reading" ? (
            <div className="h-1 w-full bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-white/80 rounded-full"
                style={{ width: "60%" }}
              />
            </div>
          ) : (
            <div className="flex items-end gap-1 h-8">
              {[0, 1, 2, 3, 4].map((index) => {
                const delays = [0, 0.15, 0.3, 0.45, 0.6];
                const initialHeights = [50, 30, 70, 40, 60];
                return (
                  <div
                    key={index}
                    className="w-1 bg-white/80 rounded-full animate-waveform"
                    style={{
                      height: `${initialHeights[index]}%`,
                      animationDelay: `${delays[index]}s`,
                    }}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Library Dialog */}
      <Dialog open={isLibraryOpen} onOpenChange={setIsLibraryOpen}>
        <DialogContent className="p-4 md:p-6">
          <DialogHeader>
            <DialogTitle className="text-lg md:text-xl font-semibold">
              Falling Upward
            </DialogTitle>
            <DialogDescription className="text-sm md:text-base text-muted-foreground mt-1">
              Richard Rohr
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
