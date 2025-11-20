"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState, memo } from "react";
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
  const { isMobile, isDesktop, shouldReduceEffects, hasMounted } = useMobileOptimization();
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Mouse position values - Only for desktop
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring animation for smooth movement - Disabled on mobile
  // OPTIMIZED: Reduced stiffness and damping for smoother, less jittery movement
  const springConfig = { damping: 20, stiffness: 100 };
  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [10, -10]),
    shouldReduceEffects ? { damping: 100, stiffness: 50 } : springConfig
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-10, 10]),
    shouldReduceEffects ? { damping: 100, stiffness: 50 } : springConfig
  );

  // Transform style - Disabled on mobile
  const transformStyle = {
    rotateX: shouldReduceEffects ? 0 : rotateX,
    rotateY: shouldReduceEffects ? 0 : rotateY,
    transformStyle: shouldReduceEffects ? "flat" as const : "preserve-3d" as const,
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceEffects) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXFromCenter = e.clientX - rect.left - width / 2;
    const mouseYFromCenter = e.clientY - rect.top - height / 2;

    mouseX.set(mouseXFromCenter / width);
    mouseY.set(mouseYFromCenter / height);
  };

  const handleMouseLeave = () => {
    if (shouldReduceEffects) return;
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  // SSR Safe Loading Skeleton
  if (!hasMounted) {
    return (
      <div className="bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/10 backdrop-blur-xl rounded-2xl border border-purple-500/20 p-6 min-h-[400px]">
        <div className="animate-pulse">
          <div className="h-48 bg-purple-500/20 rounded-xl mb-6" />
          <div className="h-8 bg-purple-500/20 rounded w-3/4 mb-4" />
          <div className="h-4 bg-purple-500/20 rounded w-full mb-2" />
          <div className="h-4 bg-purple-500/20 rounded w-5/6" />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="perspective-1000"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={transformStyle}
        className="relative group h-full will-change-transform" // Added will-change-transform
      >
        <div className="relative h-full bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl rounded-2xl border border-white/10 p-6 overflow-hidden transition-colors duration-300 group-hover:border-purple-500/30">

          {/* Image Container */}
          <div className="relative h-48 mb-6 rounded-xl overflow-hidden transform-style-3d">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
            {!imageError ? (
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center">
                <div className="text-center p-4">
                  <div className="text-6xl mb-2">📁</div>
                  <p className="text-sm text-gray-400">Project Image</p>
                </div>
              </div>
            )}

            {/* Floating Tech Tags */}
            <div className="absolute bottom-3 left-3 z-20 flex flex-wrap gap-2 transform-style-3d translate-z-20">
              {project.tags.slice(0, 3).map((tag, i) => (
                <span
                  key={i}
                  className="px-2 py-1 text-[10px] font-medium bg-black/50 backdrop-blur-md border border-white/10 rounded-full text-white/90"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="relative z-20 transform-style-3d translate-z-30">
            <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-purple-400 transition-colors">
              {project.title}
            </h3>
            <p className="text-gray-400 text-sm mb-6 line-clamp-3">
              {project.description}
            </p>

            {/* Actions */}
            <motion.div
              className="flex items-center gap-4 mt-auto"
              style={{ transform: "translateZ(40px)" }}
            >
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: !shouldReduceEffects ? 1.1 : 1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 bg-white/10 rounded-full hover:bg-purple-500/20 hover:text-purple-400 transition-colors"
              >
                <Github className="w-5 h-5" />
              </motion.a>

              {project.live && (
                <motion.a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: !shouldReduceEffects ? 1.05 : 1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live
                </motion.a>
              )}
            </motion.div>

            {/* Project Type Badge */}
            <div className="mt-4 flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full text-xs font-medium text-purple-400 border border-purple-500/20 w-fit">
              {project.type}
            </div>
          </div>

          {/* Hover Arrow - Desktop only */}
          {!shouldReduceEffects && (
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

          {/* 3D Shadow Effect - Desktop only */}
          {!shouldReduceEffects && (
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

export default memo(ProjectCard3D);
