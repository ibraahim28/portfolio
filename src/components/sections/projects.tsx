"use client";

import { motion, useReducedMotion } from "motion/react";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { reducedMotionVariants } from "@/lib/animations";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Badge } from "@/components/ui/badge";

type Project = {
  title: string;
  description: string;
  image?: string;
  techStack: string[];
  githubUrl: string;
  demoUrl?: string;
  isProjectLive: boolean;
};

const projects: Project[] = [
  {
    title: "E-Commerce Store",
    description:
      "A modern e-commerce platform with real-time inventory, Filtering and Searching through categories, and an intuitive admin dashboard. Built with React.js and MongoDB for scalability.",
    image: "/projects/ecommerce-placeholder.jpg",
    techStack: [
      "React.js",
      "MongoDB",
      "Node.js",
      "Express.js",
      "Stripe",
      "Tailwind CSS",
      "JWT",
      "Redux",
      "Axios",
    ],
    githubUrl: "https://github.com/ibrahimdawer/ecommerce",
    demoUrl: "https://ecommerce.ibrahimdawer.com",
    isProjectLive: true,
  },
  {
    title: "Chat App",
    description:
      "Real-time chat application with, file sharing, Profile picture upload, and 30+ Dynamic themes. Features include message persistence and real-time user online/offline status.",
    image: "/projects/chat-placeholder.jpg",
    techStack: [
      "React.js",
      "Node.js",
      "Tailwind CSS",
      "Zustand",
      "Socket.io",
      "DaisyUI",
      "MongoDB",
    ],
    githubUrl: "https://github.com/ibrahimdawer/chat-app",
    demoUrl: "https://chat.ibrahimdawer.com",
    isProjectLive: true,
  },
  {
    title: "AI Resume Builder",
    description:
      "Interactive resume builder with AI generation, real-time resume score and improvement tips by AI, real-time preview, and PDF export functionality. Supports multiple languages and formats.",
    image: "/projects/resume-placeholder.jpg",
    techStack: [
      "Next.js",
      "JavaScript",
      "Tailwind CSS",
      "React-PDF",
      "Gemini-AI",
      "Stripe",
      "Clerk",
      "Zustand",
      "React-Hook-Form",
    ],
    githubUrl: "https://github.com/ibrahimdawer/resume-builder",
    isProjectLive: false,
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const prefersReducedMotion = useReducedMotion();
  const isEven = index % 2 === 0;
  const variants = prefersReducedMotion
    ? reducedMotionVariants
    : {
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            delay: index * 0.1,
          },
        },
      };

  return (
    <motion.article
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={`
        group relative flex flex-col overflow-hidden rounded-2xl border border-muted 
        bg-surface/50 backdrop-blur-sm transition-all duration-300
        hover:border-primary/20 hover:shadow-md
        md:flex-row ${isEven ? "md:flex-row" : "md:flex-row-reverse"}
      `}
    >
      {/* Image Section */}
      <div className="relative w-full md:w-1/2 aspect-video md:aspect-auto">
        {project.image ? (
          <>
            <Image
              src={project.image}
              alt={`${project.title} preview`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface/90 via-surface/50 to-transparent md:bg-gradient-to-r md:from-surface/90 md:via-surface/50 md:to-transparent" />
          </>
        ) : (
          <div className="absolute inset-0 bg-muted/20" />
        )}
      </div>

      {/* Content Section */}
      <div className="flex flex-1 flex-col p-6 md:p-8">
        <h3 className="mb-3 text-2xl font-semibold tracking-tight text-foreground">
          {project.title}
        </h3>

        <p className="mb-6 text-muted-foreground leading-relaxed">
          {project.description}
        </p>

        <div className="mt-auto space-y-6">
          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="bg-muted/50 text-muted-foreground hover:bg-muted/70 transition-colors"
              >
                {tech}
              </Badge>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center rounded-md border border-input bg-background px-4 py-2.5 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              aria-label={`View ${project.title} on GitHub`}
            >
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </Link>

            {project.isProjectLive && project.demoUrl && (
              <Link
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                aria-label={`View live demo of ${project.title}`}
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Live Demo
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function Projects() {
  const prefersReducedMotion = useReducedMotion();
  const containerVariants = prefersReducedMotion
    ? reducedMotionVariants
    : {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
          },
        },
      };

  return (
    <AnimatedSection
      title="Featured Projects"
      description="A showcase of my personal and client projects, highlighting full-stack development expertise and modern web technologies."
      className="py-24 px-4 sm:px-6 lg:px-8 bg-surface"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="mx-auto max-w-6xl space-y-12 md:space-y-16"
      >
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </motion.div>
    </AnimatedSection>
  );
}
