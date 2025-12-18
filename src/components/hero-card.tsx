"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { BentoCardProps } from "@/components/bento-grid";

export function HeroCard({ shape, githubStats }: BentoCardProps) {
  return (
    <motion.div
      className="h-full w-full"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <Card className="relative h-full w-full overflow-hidden border-border/60 bg-card/60 shadow-sm">
        {/* Background Image Container */}
        <div className="absolute inset-0">
          <Image
            src="/assets/profile-pic.png"
            alt="J. Adam Kraft - Solutions Engineer and Christian, Father."
            fill
            priority
            className="object-cover scale-x-[-1]"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 flex h-full flex-col justify-end p-6 md:p-8">
          <div className="space-y-3">
            {/* Micro-copy */}
            <p className="text-sm text-muted-foreground/90 drop-shadow-md">
              Solutions Engineer. Christian, Father.
            </p>
            {/* Tagline */}
            <p className="text-base text-foreground/90 drop-shadow-md md:text-lg">
              Digital craftsmanship. Ancient roots.
            </p>
            {/* Headline */}
            <h1 className="text-3xl font-semibold leading-tight tracking-tight text-white drop-shadow-lg md:text-4xl lg:text-5xl">
              J. Adam Kraft
            </h1>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
