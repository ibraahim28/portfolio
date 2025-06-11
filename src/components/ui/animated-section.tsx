"use client";

import { motion, useReducedMotion } from "motion/react";
import { type ReactNode } from "react";

import {
  fadeInUp,
  reducedMotionVariants,
  scrollReveal,
  sectionTitle,
} from "@/lib/animations";

interface AnimatedSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export function AnimatedSection({
  title,
  description,
  children,
  className,
}: AnimatedSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  const variants = prefersReducedMotion ? reducedMotionVariants : fadeInUp;

  return (
    <section className={className}>
      <div className="max-w-7xl mx-auto space-y-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={scrollReveal}
          variants={prefersReducedMotion ? reducedMotionVariants : sectionTitle}
          className="text-center space-y-4"
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            {title}
          </h2>
          {description && (
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={scrollReveal}
          variants={variants}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
} 