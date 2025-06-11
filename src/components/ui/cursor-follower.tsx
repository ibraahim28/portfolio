"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect } from "react";

export function CursorFollower() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 200, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 200, damping: 20 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [mouseX, mouseY]);

  return window.innerWidth > 768 ? (
    <motion.div
      className="fixed top-0 left-0 z-50 pointer-events-none"
      style={{
        translateX: springX,
        translateY: springY,
      }}
    >
      <div className="w-6 h-6 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/40 shadow-md -translate-x-1/2 -translate-y-1/2" />
    </motion.div>
  ) : null;
}
