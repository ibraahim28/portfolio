"use client";

import { motion, useMotionValue, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { fadeInUp, reducedMotionVariants } from "@/lib/animations";
import { AnimatedSection } from "@/components/ui/animated-section";
import React from "react";

type Stat = {
  label: string;
  value: string;
};

const stats: Stat[] = [
  { label: "Years of Experience", value: "1+" },
  { label: "Projects Completed", value: "10+" },
  { label: "Happy Clients", value: "2+" },
  { label: "Open Source Contributions", value: "5+" },
];

export function About() {
  const prefersReducedMotion = useReducedMotion();
  const variants = prefersReducedMotion ? reducedMotionVariants : fadeInUp;

  return (
    <AnimatedSection
      title="About Me"
      description="Get to know more about my journey and what drives me."
      className="py-24 px-4 sm:px-6 lg:px-8 bg-surface/50"
    >
      <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        
        <motion.div
          variants={variants}
          className="grid grid-cols-2 gap-6"
          style={{ perspective: 1000 }}
        >
          {stats.map((stat) => (
            <TiltCard key={stat.label}>
              <div className="text-4xl font-bold text-primary mb-1">
                {stat.value}
              </div>
              <div className="text-base text-muted-foreground font-medium">
                {stat.label}
              </div>
            </TiltCard>
          ))}
        </motion.div>

        <motion.div
          variants={variants}
          className="prose prose-gray dark:prose-invert max-w-none mx-auto text-lg text-muted-foreground"
        >
          <p>
            I started as a self-taught web developer, building things for fun —
            now I build software that people actually use. My main stack is MERN
            and Next.js, and I recently built an AI-powered resume builder from
            scratch. I’m available for freelance work and also open to full-time
            roles. If you’re building something useful and need a reliable dev,
            let’s talk.
          </p>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// TiltCard component for 3D hover effect
function TiltCard({ children }: { children: React.ReactNode }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const [isHovered, setIsHovered] = React.useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateAmountX = -(y - centerY) / 4;
    const rotateAmountY = (x - centerX) / 4;
    rotateX.set(rotateAmountX);
    rotateY.set(rotateAmountY);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <motion.div
      ref={cardRef}
      className={
        "rounded-2xl border-subtle bg-background/70 p-8 backdrop-blur-sm text-center transition-transform duration-300 ease-[cubic-bezier(.22,1,.36,1)]" +
        (isHovered
          ? " shadow-3d dark:shadow-3d-dark"
          : " shadow-subtle dark:shadow-subtle-dark")
      }
      style={{
        transformStyle: "preserve-3d",
        rotateX,
        rotateY,
      }}
      animate={{
        scale: isHovered ? 1.06 : 1,
        transition: { type: "spring", stiffness: 180, damping: 18 },
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      tabIndex={0}
    >
      {children}
    </motion.div>
  );
}
