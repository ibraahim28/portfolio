"use client";

import { useState, useRef } from "react";
import { motion, useMotionValue, AnimatePresence } from "motion/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/ui/animated-section";
import {
  Flame,
  Layers,
  Terminal,
  Server,
  Database,
  Package,
  Code2,
  Type,
  Github,
  Cloud,
  Zap,
  Palette,
  Atom,
  Move,
  Globe,
  Link,
  Activity,
  ShieldCheck,
  LayoutDashboard,
  UserCheck,
  Send,
  Braces,
} from "lucide-react";

const categories = ["All", "Frontend", "Backend", "Tools"] as const;
type Category = (typeof categories)[number];

type Tech = {
  name: string;
  icon: React.ElementType;
  category: Category;
  description: string;
};

const techs: Tech[] = [
  {
    name: "HTML5",
    icon: Code2,
    category: "Frontend",
    description: "Markup language for web pages.",
  },
  {
    name: "CSS3",
    icon: Palette,
    category: "Frontend",
    description: "Style sheet language for web pages.",
  },
  {
    name: "JavaScript",
    icon: Braces,
    category: "Frontend",
    description: "Programming language for web pages.",
  },
  {
    name: "TypeScript",
    icon: Type,
    category: "Frontend",
    description: "Typed superset of JavaScript.",
  },
  {
    name: "React",
    icon: Atom,
    category: "Frontend",
    description: "Component-based UI library.",
  },
  {
    name: "Next.js",
    icon: Globe,
    category: "Frontend",
    description: "React framework for SSR & SSG.",
  },
  {
    name: "Tailwind CSS",
    icon: Layers,
    category: "Frontend",
    description: "Utility-first CSS framework.",
  },
  {
    name: "Motion",
    icon: Move,
    category: "Frontend",
    description: "Animation library for React.",
  },
  {
    name: "ShadCN",
    icon: Zap,
    category: "Frontend",
    description: "Beautiful, accessible UI components.",
  },
  {
    name: "Axios",
    icon: Send,
    category: "Frontend",
    description: "HTTP client for making API requests.",
  },
  {
    name: "Node.js",
    icon: Terminal,
    category: "Backend",
    description: "JavaScript runtime for server-side.",
  },
  {
    name: "Express",
    icon: Server,
    category: "Backend",
    description: "Minimal Node.js web framework.",
  },
  {
    name: "MongoDB",
    icon: Database,
    category: "Backend",
    description: "NoSQL document database.",
  },
  {
    name: "Mongoose",
    icon: Link,
    category: "Backend",
    description: "MongoDB object modeling for Node.js.",
  },
  {
    name: "Socket.io",
    icon: Activity,
    category: "Backend",
    description: "Real-time communication protocol.",
  },
  {
    name: "JWT",
    icon: ShieldCheck,
    category: "Backend",
    description: "JSON Web Token for authentication.",
  },
  {
    name: "Firebase",
    icon: Flame,
    category: "Backend",
    description: "Cloud backend platform.",
  },
  {
    name: "Redux",
    icon: Code2,
    category: "Tools",
    description: "State management for JS apps.",
  },
  {
    name: "Figma",
    icon: LayoutDashboard,
    category: "Tools",
    description: "UI/UX design tool.",
  },
  {
    name: "Zustand",
    icon: Package,
    category: "Tools",
    description: "Bear necessities for state management.",
  },
  {
    name: "Clerk",
    icon: UserCheck,
    category: "Tools",
    description: "Authentication & user management.",
  },
  {
    name: "Vercel",
    icon: Cloud,
    category: "Tools",
    description: "Frontend cloud platform.",
  },
  {
    name: "GitHub",
    icon: Github,
    category: "Tools",
    description: "Code hosting & collaboration.",
  },
];

function TiltCard({ children }: { children: React.ReactNode }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

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
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      animate={{
        scale: isHovered ? 1.05 : 1,
        transition: {
          type: "spring",
          stiffness: 180,
          damping: 14,
        },
      }}
      className={
        "group relative rounded-2xl border-subtle bg-background/70 p-4 backdrop-blur-sm text-center transition-transform duration-300 ease-[cubic-bezier(.22,1,.36,1)] flex flex-col items-center gap-2" +
        (isHovered
          ? " shadow-3d dark:shadow-3d-dark"
          : " shadow-subtle dark:shadow-subtle-dark")
      }
      tabIndex={0}
    >
      {children}
    </motion.div>
  );
}

export function Skills() {
  const [filter, setFilter] = useState<Category>("All");
  const filtered =
    filter === "All" ? techs : techs.filter((t) => t.category === filter);

  const minGridHeight =
    "min-h-[220px] sm:min-h-[320px] md:min-h-[220px] xl:min-h-[160px]";

  return (
    <AnimatedSection
      title="Skills & Tools"
      description={undefined}
      className="py-24 px-6 md:px-12 bg-surface"
    >
      {/* Filter Bar */}
      <div className="flex justify-center mb-10">
        <div className="flex gap-2 bg-background/70 rounded-xl p-1 shadow-subtle backdrop-blur-md">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={filter === cat ? "default" : "ghost"}
              className="px-4 py-2 font-medium rounded-lg focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all"
              onClick={() => setFilter(cat)}
              aria-pressed={filter === cat}
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>
      {/* Grid with fade/scale-in and AnimatePresence for filter transitions */}
      <TooltipProvider>
        <div
          className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4 ${minGridHeight}`}
        >
          <AnimatePresence initial={false}>
            {filtered.map((tech, i) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{
                  duration: 0.28,
                  ease: [0.4, 0, 0.2, 1],
                  delay: i * 0.05,
                }}
              >
                <TiltCard>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="flex items-center justify-center w-12 h-12 rounded-full bg-surface/80 shadow-subtle group-hover:shadow-3d transition-all duration-300">
                        <tech.icon className="h-6 w-6 text-muted-foreground group-hover:text-foreground transition-all duration-300" />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent className="text-xs max-w-xs text-center">
                      {tech.description}
                    </TooltipContent>
                  </Tooltip>
                  <span className="text-sm font-medium text-foreground mt-1">
                    {tech.name}
                  </span>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </TooltipProvider>
    </AnimatedSection>
  );
}
