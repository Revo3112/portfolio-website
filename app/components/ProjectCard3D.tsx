
// components/ProjectCard3D.tsx - MOBILE DETECTION FIX
"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { ExternalLink, Github, Star, ArrowUpRight } from "lucide-react";
import { useMobileOptimization } from "../hooks/useMobileOptimization";

interface ProjectCard3DProps {
  project: {
    title: string;
    description: string;
    image: string;
    tags: string[];
    github: string;
    live?: string;
    featured?: boolean;
    type: string;
  };
  index: number;
}

const ProjectCard3D: React.FC<ProjectCard3DProps> = ({ project, index }) => {
  const { isMobile, isDesktop, hasMounted } = useMobileOptimization();
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse position values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring animation for smooth movement
  const springConfig = { damping: 25, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);

  const transformStyle = {
    rotateX: isDesktop ? rotateX : 0, // Only on desktop
    rotateY: isDesktop ? rotateY : 0, // Only on desktop
    transformStyle: "preserve-3d" as const,
  };


  // SSR SAFE: Return skeleton until client detection
  if (!hasMounted) {
    return (
      <div className="bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/10 backdrop-blur-xl rounded-2xl border border-purple-500/20 p-6 min-h-[400px]">
        <div className="animate-pulse">
          <div className="h-48 bg-gray-700/20 rounded-lg mb-4" />
          <div className="space-y-3">
            <div className="h-6 bg-gray-700/20 rounded w-3/4" />
            <div className="h-4 bg-gray-700/20 rounded w-full" />
            <div className="h-4 bg-gray-700/20 rounded w-5/6" />
            <div className="h-4 bg-gray-700/20 rounded w-4/6" />
          </div>
          <div className="flex gap-2 mt-4">
            <div className="h-6 bg-gray-700/20 rounded px-3 w-16" />
            <div className="h-6 bg-gray-700/20 rounded px-3 w-20" />
            <div className="h-6 bg-gray-700/20 rounded px-3 w-12" />
          </div>
        </div>
      </div>
    );
  }

  // Mobile version - Simple card (unchanged)
  if (isMobile) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        className="bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/10 backdrop-blur-xl rounded-2xl border border-purple-500/20 overflow-hidden"
      >
        {/* Mobile layout remains the same */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60" />

          {project.featured && (
            <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
              <Star className="w-3 h-3" />
              Featured
            </div>
          )}
        </div>

        <div className="p-6 space-y-4">
          <h3 className="text-xl font-bold text-white">{project.title}</h3>
          <p className="text-gray-400 text-sm line-clamp-2">{project.description}</p>

          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, 3).map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="text-xs px-2 py-1 bg-purple-500/20 text-purple-300 rounded border border-purple-500/30"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4">
            <div className="flex gap-3">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 rounded-lg text-gray-300 text-sm"
              >
                <Github className="w-4 h-4" />
                Code
              </a>
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-lg text-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Desktop/tablet version with 3D effects
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !isDesktop) return; // Only on desktop

    const rect = cardRef.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        transformStyle: "preserve-3d",
      }}
      className="relative group"
    >
      <motion.div
        style={transformStyle}
        className="relative h-full"
      >
        {/* Card Container */}
        <div className="relative h-full bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/10 backdrop-blur-xl rounded-2xl border border-purple-500/20 overflow-hidden transition-all duration-300 hover:border-purple-500/40">

          {/* Glow Effect - Only on desktop */}
          {isDesktop && (
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: `radial-gradient(600px circle at ${mouseX.get() * 100 + 50}% ${mouseY.get() * 100 + 50}%, rgba(139, 92, 246, 0.15), transparent 40%)`,
              }}
            />
          )}

          {/* Project Image with Parallax */}
          <motion.div
            className="relative h-48 overflow-hidden"
            style={{
              transform: isDesktop && isHovered ? "translateZ(50px)" : "translateZ(0px)",
              transition: "transform 0.3s ease-out",
            }}
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60" />

            {/* Featured Badge */}
            {project.featured && (
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 shadow-lg"
                style={{
                  transform: isDesktop && isHovered ? "translateZ(60px)" : "translateZ(0px)",
                  transition: "transform 0.3s ease-out",
                }}
              >
                <Star className="w-3 h-3" />
                Featured
              </motion.div>
            )}
          </motion.div>

          {/* Content */}
          <div className="p-6 relative">
            {/* Title with 3D effect */}
            <motion.h3
              className="text-2xl font-bold mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300"
              style={{
                transform: isDesktop && isHovered ? "translateZ(30px)" : "translateZ(0px)",
                transition: "transform 0.3s ease-out",
              }}
            >
              {project.title}
            </motion.h3>

            {/* Description */}
            <motion.p
              className="text-gray-400 mb-4 line-clamp-2"
              style={{
                transform: isDesktop && isHovered ? "translateZ(20px)" : "translateZ(0px)",
                transition: "transform 0.3s ease-out",
              }}
            >
              {project.description}
            </motion.p>

            {/* Tags with stagger animation */}
            <motion.div
              className="flex flex-wrap gap-2 mb-4"
              style={{
                transform: isDesktop && isHovered ? "translateZ(25px)" : "translateZ(0px)",
                transition: "transform 0.3s ease-out",
              }}
            >
              {project.tags.slice(0, 3).map((tag, tagIndex) => (
                <motion.span
                  key={tagIndex}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 + tagIndex * 0.05 }}
                  className="text-xs px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full border border-purple-500/30 backdrop-blur-sm"
                >
                  {tag}
                </motion.span>
              ))}
              {project.tags.length > 3 && (
                <span className="text-xs px-3 py-1 text-purple-300">
                  +{project.tags.length - 3} more
                </span>
              )}
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              className="flex items-center justify-between"
              style={{
                transform: isDesktop && isHovered ? "translateZ(35px)" : "translateZ(0px)",
                transition: "transform 0.3s ease-out",
              }}
            >
              <div className="flex gap-3">
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: isDesktop ? 1.05 : 1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 rounded-lg text-gray-300 hover:text-white hover:border-purple-400/50 transition-all duration-300"
                >
                  <Github className="w-4 h-4" />
                  Code
                </motion.a>
                {project.live && (
                  <motion.a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: isDesktop ? 1.05 : 1 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live
                  </motion.a>
                )}
              </div>

              {/* Project Type Badge */}
              <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full text-xs font-medium text-purple-400 border border-purple-500/20">
                {project.type}
              </div>
            </motion.div>
          </div>

          {/* Hover Arrow - Only on desktop */}
          {isDesktop && (
            <motion.div
              className="absolute top-4 left-4 w-8 h-8 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                transform: isHovered ? "translateZ(70px)" : "translateZ(0px)",
                transition: "transform 0.3s ease-out",
              }}
            >
              <ArrowUpRight className="w-4 h-4 text-white" />
            </motion.div>
          )}

          {/* 3D Shadow Effect - Only on desktop */}
          {isDesktop && (
            <motion.div
              className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-600/20 to-cyan-600/20 rounded-2xl blur-xl"
              style={{
                transform: isHovered ? "translateZ(-20px) scale(0.95)" : "translateZ(0px) scale(1)",
                opacity: isHovered ? 0.6 : 0.3,
                transition: "all 0.3s ease-out",
              }}
            />
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard3D;
