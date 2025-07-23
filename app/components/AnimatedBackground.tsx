"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useMemo } from "react";

const AnimatedBackground = () => {
  const [isClient, setIsClient] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Ensure we're on the client side to avoid hydration mismatch
  useEffect(() => {
    setIsClient(true);

    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handler);

    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Generate deterministic positions for particles to avoid hydration mismatch
  const particles = useMemo(() => {
    if (!isClient) return [];

    // Reduce particle count for better performance
    return [...Array(prefersReducedMotion ? 10 : 20)].map((_, i) => {
      // Use index-based deterministic values to avoid Math.random() hydration issues
      const seed = i * 0.618033988749; // Golden ratio for better distribution
      const x = ((seed * 100) % 100);
      const y = (((seed + 0.1) * 100) % 100);
      const size = ((seed * 4) % 3) + 1.5;
      const duration = prefersReducedMotion ? 10 : ((seed * 3) % 2) + 2.5;
      const delay = ((seed * 5) % 4) + 1;

      return {
        id: i,
        x,
        y,
        size,
        duration,
        delay,
      };
    });
  }, [isClient, prefersReducedMotion]);  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden transform-gpu">
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background-secondary/30 to-background-tertiary/20" />

      {/* Animated gradient overlay - reduced complexity for performance */}
      <motion.div
        className="absolute inset-0 transform-gpu"
        animate={prefersReducedMotion ? {} : {
          background: [
            "linear-gradient(45deg, rgba(139, 92, 246, 0.06), transparent, rgba(6, 182, 212, 0.06))",
            "linear-gradient(135deg, rgba(6, 182, 212, 0.06), transparent, rgba(139, 92, 246, 0.06))",
            "linear-gradient(45deg, rgba(139, 92, 246, 0.06), transparent, rgba(6, 182, 212, 0.06))"
          ]
        }}
        transition={{
          duration: prefersReducedMotion ? 0 : 25,
          repeat: prefersReducedMotion ? 0 : Infinity,
          ease: "linear"
        }}
      />

      {/* Large floating blobs - optimized with transform-gpu */}
      <motion.div
        className="absolute top-10 left-10 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl transform-gpu"
        animate={prefersReducedMotion ? {} : {
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
          y: [0, -20, 0],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: prefersReducedMotion ? 0 : 18,
          repeat: prefersReducedMotion ? 0 : Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl transform-gpu"
        animate={prefersReducedMotion ? {} : {
          scale: [1, 0.8, 1],
          x: [0, -40, 0],
          y: [0, 30, 0],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: prefersReducedMotion ? 0 : 22,
          repeat: prefersReducedMotion ? 0 : Infinity,
          ease: "easeInOut",
          delay: 3
        }}
      />

      <motion.div
        className="absolute top-1/2 left-1/4 w-72 h-72 bg-purple-400/5 rounded-full blur-2xl"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4
        }}
      />

      {/* Geometric patterns */}
      <motion.div
        className="absolute top-1/4 right-1/3 w-40 h-40 border border-purple-500/15 rounded-3xl"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.2, 1],
          borderRadius: ["24px", "50%", "24px"]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <motion.div
        className="absolute bottom-1/3 left-1/3 w-32 h-32 border-2 border-cyan-500/15 rounded-full"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.2, 0.5, 0.2],
          rotate: [0, -360]
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Hexagon shapes */}
      <motion.div
        className="absolute top-2/3 right-1/4 w-24 h-24 border border-purple-400/20"
        style={{
          clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"
        }}
        animate={{
          rotate: [0, 120, 240, 360],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Floating particles - optimized with conditional rendering and GPU acceleration */}
      {isClient && (
        <div className="absolute inset-0">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full bg-gradient-to-r from-purple-400/20 to-cyan-400/20 transform-gpu"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                willChange: prefersReducedMotion ? 'auto' : 'transform, opacity',
              }}
              animate={prefersReducedMotion ? {} : {
                y: [0, -80, 0],
                opacity: [0, 0.8, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: particle.duration,
                repeat: prefersReducedMotion ? 0 : Infinity,
                delay: particle.delay,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      )}

      {/* Grid pattern overlay with animation */}
      <motion.div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
        animate={{
          backgroundPosition: ['0px 0px', '60px 60px']
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Central radial gradient with pulse */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.05) 0%, rgba(6, 182, 212, 0.03) 50%, transparent 70%)'
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.7, 0.4],
          rotate: [0, 360]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Decorative lines with movement */}
      <motion.div
        className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-purple-500/15 to-transparent"
        animate={{
          opacity: [0.2, 0.6, 0.2],
          scaleY: [1, 1.2, 1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-cyan-500/15 to-transparent"
        animate={{
          opacity: [0.2, 0.6, 0.2],
          scaleY: [1, 1.3, 1]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3
        }}
      />

      {/* Floating glass cards */}
      <motion.div
        className="absolute top-1/3 left-1/2 w-48 h-24 bg-gradient-to-r from-purple-500/10 to-transparent rounded-xl backdrop-blur-sm border border-purple-500/20"
        animate={{
          y: [0, -25, 0],
          rotate: [0, 3, 0],
          opacity: [0.3, 0.7, 0.3]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute bottom-1/2 right-1/4 w-36 h-36 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-2xl backdrop-blur-sm border border-cyan-500/20"
        animate={{
          y: [0, 20, 0],
          rotate: [0, -5, 0],
          scale: [1, 1.05, 1],
          opacity: [0.4, 0.8, 0.4]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />

      {/* Lens flare effect */}
      <motion.div
        className="absolute top-1/4 left-3/4 w-4 h-4 bg-white/20 rounded-full blur-sm"
        animate={{
          scale: [1, 2, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute bottom-1/4 left-1/5 w-6 h-6 bg-purple-400/30 rounded-full blur-sm"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
