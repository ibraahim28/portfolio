"use client";

import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// Types
type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role?: string;
  company?: string;
  avatar?: string;
  rating?: number;
};

// Testimonial data
const testimonials: Testimonial[] = [
  {
    id: "1",
    quote: "Ibrahim is an exceptional developer who consistently delivers high-quality work. His attention to detail and problem-solving skills are outstanding.",
    name: "Sarah Johnson",
    role: "Product Manager",
    company: "TechCorp",
    rating: 5,
  },
  {
    id: "2",
    quote: "Working with Ibrahim was a pleasure. He not only met but exceeded our expectations with his technical expertise and communication skills.",
    name: "Michael Chen",
    role: "CTO",
    company: "InnovateLabs",
    rating: 5,
  },
  {
    id: "3",
    quote: "Ibrahim's ability to translate complex requirements into elegant solutions is remarkable. A true professional who delivers on time, every time.",
    name: "Emily Rodriguez",
    role: "Senior Developer",
    company: "CodeCraft",
    rating: 5,
  },
];

// Enhanced animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  hover: {
    y: -5,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
};

// TestimonialCard component
function TestimonialCard({ testimonial, isActive }: { testimonial: Testimonial; isActive?: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover="hover"
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-400 bg-surface p-6 transition-all duration-300 hover:shadow-xl md:p-8",
        isActive && "ring-2 ring-primary/20"
      )}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(var(--grid-color),0.1)_50%,transparent_75%)] bg-[length:20px_20px]" />
      </div>

      {/* Quote mark watermark */}
      <div className="absolute -right-4 -top-4 text-8xl text-muted/5">
        &quot;
      </div>

      {/* Rating */}
      {testimonial.rating && (
        <div className="mb-4 flex gap-1">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star
              key={i}
              className="h-4 w-4 fill-primary text-primary"
            />
          ))}
        </div>
      )}

      {/* Quote */}
      <blockquote className="relative mb-6 text-base leading-relaxed text-foreground md:text-lg">
        &quot;{testimonial.quote}&quot;
      </blockquote>

      {/* Author info */}
      <div className="flex items-center gap-4">
        <div className="relative h-12 w-12 overflow-hidden rounded-full bg-muted ring-2 ring-primary/10">
          <Image
            src={testimonial.avatar || "/avatars/placeholder.jpg"}
            alt={testimonial.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 48px, 48px"
          />
        </div>
        <div>
          <div className="text-sm font-semibold text-foreground">
            {testimonial.name}
          </div>
          {(testimonial.role || testimonial.company) && (
            <div className="text-xs text-muted-foreground">
              {[testimonial.role, testimonial.company]
                .filter(Boolean)
                .join(" • ")}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// Carousel component for mobile
function TestimonialCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) return testimonials.length - 1;
      if (nextIndex >= testimonials.length) return 0;
      return nextIndex;
    });
  };

  return (
    <div className="relative mx-auto max-w-md">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);
            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
          className="absolute w-full"
        >
          <TestimonialCard
            testimonial={testimonials[currentIndex]}
            isActive={true}
          />
        </motion.div>
      </AnimatePresence>

      {/* Navigation buttons */}
      <div className="absolute -bottom-16 left-0 right-0 flex justify-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => paginate(-1)}
          className="h-8 w-8 rounded-full"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => paginate(1)}
          className="h-8 w-8 rounded-full"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Pagination dots */}
      <div className="absolute -bottom-8 left-0 right-0 flex justify-center gap-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={cn(
              "h-2 w-2 rounded-full transition-all",
              index === currentIndex
                ? "bg-primary"
                : "bg-muted hover:bg-muted-foreground"
            )}
          />
        ))}
      </div>
    </div>
  );
}

// Main Testimonials component
export function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [50, 0, 0, -50]);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative py-24"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(var(--grid-color),0.02)_50%,transparent_100%)]" />

      <motion.div
        style={{ opacity, y }}
        className="container relative mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Section header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            What People Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            Feedback from clients and colleagues I&apos;ve had the pleasure of working with
          </motion.p>
        </div>

        {/* Desktop grid */}
        <div className="hidden md:block">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {testimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
              />
            ))}
          </motion.div>
        </div>

        {/* Mobile carousel */}
        <div className="block md:hidden">
          <TestimonialCarousel testimonials={testimonials} />
        </div>
      </motion.div>
    </section>
  );
} 