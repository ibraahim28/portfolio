"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  Github,
  Linkedin,
  Twitter,
  MessageCircleDashed,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

import { buttonHover, fadeInUp, reducedMotionVariants } from "@/lib/animations";
import { Button } from "@/components/ui/button";

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/ibraahim28",
    icon: Github,
    isExternal: true,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/ibrahimdawer",
    icon: Linkedin,
    isExternal: true,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/ibra_dawer",
    icon: Twitter,
    isExternal: true,
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/923463218822",
    icon: MessageCircleDashed,
    isExternal: true,
  },
];

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const variants = prefersReducedMotion ? reducedMotionVariants : fadeInUp;
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isGridHovered, setIsGridHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-background to-background/95">
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={
            {
              "--grid-color": "var(--grid-rgb)",
              backgroundImage: `
              linear-gradient(to right, rgba(var(--grid-color), 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(var(--grid-color), 0.1) 1px, transparent 1px)
            `,
              backgroundSize: "3rem 3rem",
              height: "70vh",
              maskImage: `
              radial-gradient(
                300px circle at ${mousePosition.x}px ${mousePosition.y}px,
                ${isGridHovered ? "rgba(0,0,0,0.15)" : "rgba(0,0,0,0)"} 0%,
                rgba(0,0,0,0.05) 40%,
                rgba(0,0,0,0.1) 60%,
                rgba(0,0,0,0.05) 80%,
                rgba(0,0,0,0) 100%
              ),
              linear-gradient(to bottom, 
                rgba(0,0,0,1) 0%, 
                rgba(0,0,0,0.8) 40%, 
                rgba(0,0,0,0.4) 70%, 
                rgba(0,0,0,0) 100%
              )
            `,
              WebkitMaskImage: `
              radial-gradient(
                300px circle at ${mousePosition.x}px ${mousePosition.y}px,
                ${isGridHovered ? "rgba(0,0,0,0.15)" : "rgba(0,0,0,0)"} 0%,
                rgba(0,0,0,0.05) 40%,
                rgba(0,0,0,0.1) 60%,
                rgba(0,0,0,0.05) 80%,
                rgba(0,0,0,0) 100%
              ),
              linear-gradient(to bottom, 
                rgba(0,0,0,1) 0%, 
                rgba(0,0,0,0.8) 40%, 
                rgba(0,0,0,0.4) 70%, 
                rgba(0,0,0,0) 100%
              )
            `,
              maskComposite: "add",
              WebkitMaskComposite: "source-over",
              transition: "all 0.3s ease-out",
            } as React.CSSProperties
          }
          onMouseEnter={() => setIsGridHovered(true)}
          onMouseLeave={() => setIsGridHovered(false)}
        />

        
      </div>

      <div className="container relative mx-auto px-4 py-24 sm:px-6 lg:px-8 z-10">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            variants={variants}
            className="mb-8 inline-block rounded-full border-subtle bg-surface/50 px-4 py-1.5 text-sm font-medium text-muted-foreground shadow-subtle backdrop-blur-sm"
          >
            MERN Stack Developer
          </motion.div>

          <motion.h1
            variants={variants}
            className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl"
          >
            Hi, I&apos;m{" "}
            <span className="bg-gradient-to-r from-primary to-gray-300 dark:from-primary dark:to-accent bg-clip-text text-transparent">
              Ibrahim Dawer
            </span>
          </motion.h1>

          <motion.p
            variants={variants}
            className="mb-8 text-lg text-muted-foreground sm:text-xl"
          >
            I help startups and creators turn powerful ideas into
            revenue-generating web apps — fast, clean, and built to scale.
          </motion.p>

          <motion.div
            variants={variants}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <motion.div whileHover={buttonHover}>
              <Button
                size="lg"
                className="bg-primary text-primary-foreground shadow-subtle hover:bg-primary/90"
                asChild
              >
                <Link href="#contact">Get in Touch</Link>
              </Button>
            </motion.div>

            <motion.div whileHover={buttonHover}>
              <Button
                variant="outline"
                size="lg"
                className="border-subtle shadow-soft hover:border-subtle-hover hover:shadow-soft-hover"
                asChild
              >
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                >
                  Download Resume
                </a>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            variants={variants}
            className="mt-12 flex justify-center gap-6"
          >
            {socialLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={buttonHover}
                className="rounded-full border-subtle bg-surface/50 p-3 text-muted-foreground shadow-subtle transition-colors hover:border-subtle-hover hover:bg-surface hover:text-foreground hover:shadow-subtle-hover"
                aria-label={link.name}
              >
                <link.icon className="h-5 w-5" />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0% {
            opacity: 0.4;
            transform: scale(1.2);
          }
          100% {
            opacity: 0.8;
            transform: scale(1.4);
          }
        }
      `}</style>
    </section>
  );
}
