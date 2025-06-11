"use client";

import { motion, useReducedMotion } from "motion/react";
import { Github, Linkedin, MessageCircleDashed, Twitter } from "lucide-react";

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

export function Footer() {
  const prefersReducedMotion = useReducedMotion();
  const variants = prefersReducedMotion ? reducedMotionVariants : fadeInUp;

  return (
    <footer className="border-t border-muted bg-surface/50 backdrop-blur-sm z-[9999]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <motion.div
          variants={variants}
          className="flex flex-col items-center justify-between gap-8 sm:flex-row"
        >
          <div className="flex flex-col items-center gap-4 sm:items-start">
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target={link.isExternal ? "_blank" : undefined}
                  rel={link.isExternal ? "noopener noreferrer" : undefined}
                  whileHover={buttonHover}
                  className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  aria-label={link.name}
                >
                  <link.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Ibrahim Dawer. All rights reserved.
            </p>
          </div>

          <motion.div whileHover={buttonHover}>
            <Button variant="outline" className="group gap-2" asChild>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download
              >
                Download Resume
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform group-hover:translate-y-0.5"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}
