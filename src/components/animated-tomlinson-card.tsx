"use client";

import { motion } from "framer-motion";
import { TomlinsonCard } from "./tomlinson-card";

export function AnimatedTomlinsonCard() {
  return (
    <motion.div layout className="md:col-span-2 md:row-span-2 h-full">
      <TomlinsonCard className="h-full" />
    </motion.div>
  );
}
