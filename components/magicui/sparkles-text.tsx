"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Sparkle {
  id: string;
  x: string;
  y: string;
  color: string;
  delay: number;
  scale: number;
  lifespan: number;
}

const generateSparkle = (): Sparkle => {
  return {
    id: String(Math.random()),
    x: `${Math.random() * 100}%`,
    y: `${Math.random() * 100}%`,
    color: `hsl(${28 + Math.random() * 30}, 80%, ${55 + Math.random() * 25}%)`,
    delay: Math.random() * 2,
    scale: Math.random() * 1 + 0.3,
    lifespan: Math.random() * 10 + 5,
  };
};

const SparkleInstance = ({ sparkle }: { sparkle: Sparkle }) => (
  <motion.svg
    className="pointer-events-none absolute z-20"
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0, 1, 0],
      scale: [0, sparkle.scale, 0],
    }}
    transition={{
      duration: sparkle.lifespan / 5,
      repeat: Infinity,
      delay: sparkle.delay,
    }}
    style={{
      left: sparkle.x,
      top: sparkle.y,
      width: 21,
      height: 21,
    }}
    viewBox="0 0 160 160"
    fill="none"
  >
    <path
      d="M80 0C80 0 84.2846 41.2925 101.496 58.504C118.707 75.7154 160 80 160 80C160 80 118.707 84.2846 101.496 101.496C84.2846 118.707 80 160 80 160C80 160 75.7154 118.707 58.504 101.496C41.2925 84.2846 0 80 0 80C0 80 41.2925 75.7154 58.504 58.504C75.7154 41.2925 80 0 80 0Z"
      fill={sparkle.color}
    />
  </motion.svg>
);

interface SparklesTextProps {
  children: React.ReactNode;
  className?: string;
  sparklesCount?: number;
}

export function SparklesText({
  children,
  className,
  sparklesCount = 10,
}: SparklesTextProps) {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    const generated = Array.from({ length: sparklesCount }, () =>
      generateSparkle(),
    );
    setSparkles(generated);
  }, [sparklesCount]);

  return (
    <span className={cn("relative inline-block", className)}>
      <span className="relative z-10">{children}</span>
      {sparkles.map((sparkle) => (
        <SparkleInstance key={sparkle.id} sparkle={sparkle} />
      ))}
    </span>
  );
}
