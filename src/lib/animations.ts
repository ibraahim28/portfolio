import { type Variants } from "motion/react";

// Base animation configurations
export const baseAnimationConfig = {
  duration: 0.5,
  ease: [0.4, 0, 0.2, 1], // Custom ease curve for smooth motion
} as const;

// Shared animation variants
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

// Staggered children variants
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Section title animation
export const sectionTitle: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ...baseAnimationConfig,
      delay: 0.1,
    },
  },
};

// Card hover animation
export const cardHover = {
  scale: 1.02,
  transition: {
    duration: 0.2,
    ease: "easeOut",
  },
};

// Button hover animation
export const buttonHover = {
  scale: 1.05,
  transition: {
    duration: 0.2,
    ease: "easeOut",
  },
};

// Scroll-triggered animation options
export const scrollReveal = {
  once: true,
  amount: 0.2, // Trigger when 20% of the element is visible
  margin: "0px 0px -100px 0px", // Offset trigger point
} as const;

// Reduced motion variants
export const reducedMotionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

// Helper function to check for reduced motion preference
export const prefersReducedMotion = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}; 