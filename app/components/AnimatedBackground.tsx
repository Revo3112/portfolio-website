// components/AnimatedBackground.tsx - MOBILE PERFORMANCE OPTIMIZED
"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import { useMobileOptimization } from "../hooks/useMobileOptimization";

interface Particle {
  id: number;
  x: number;
  y: number;
  z: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
  rotationSpeed: number;
}

interface FloatingShape {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  duration: number;
  delay: number;
  shape: 'circle' | 'square' | 'triangle' | 'diamond';
}

interface PseudoObject {
  id: number;
  x: number;
  y: number;
  z: number;
  width: number;
  height: number;
  rotation: number;
  duration: number;
  delay: number;
  type: 'hexagon' | 'ring' | 'cross' | 'spiral' | 'wave' | 'grid';
  opacity: number;
  color: string;
}

interface OrbitingElement {
  id: number;
  centerX: number;
  centerY: number;
  radius: number;
  angle: number;
  size: number;
  duration: number;
  delay: number;
}

const AnimatedBackground = () => {
  const { shouldReduceEffects, isDesktop, isMobile, shouldEnableFullEffects, hasMounted } = useMobileOptimization();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // SSR-safe: Only render full effects after both mount and client
  const readyToRender = hasMounted && isClient;

  // MOBILE ULTRA-OPTIMIZED: Minimal particles with simpler animations
  const particles = useMemo(() => {
    if (!readyToRender) return [];

    if (shouldReduceEffects) {
      // MOBILE: Only 3 particles with simple movement
      return [...Array(3)].map((_, i) => ({
        id: i,
        x: 20 + (i * 30),
        y: 20 + (i * 25),
        z: 0, // No Z-axis for mobile
        size: 3,
        duration: 8, // Longer, slower animations
        delay: i * 2,
        color: i % 2 === 0 ? 'purple' : 'cyan',
        rotationSpeed: 0 // No rotation for mobile
      }));
    }

    if (shouldEnableFullEffects) {
      return [...Array(40)].map((_, i) => ({
        id: i,
        x: (i * 61.8) % 100,
        y: ((i * 61.8) + 10) % 100,
        z: (i * 23) % 200,
        size: ((i * 4) % 4) + 1.5,
        duration: ((i * 3) % 3) + 2.5,
        delay: ((i * 5) % 6) + 1,
        color: ['purple', 'cyan', 'pink', 'blue'][i % 4],
        rotationSpeed: (i % 3) + 1
      }));
    }

    return [...Array(20)].map((_, i) => ({
      id: i,
      x: (i * 61.8) % 100,
      y: ((i * 61.8) + 10) % 100,
      z: (i * 15) % 100,
      size: ((i * 3) % 3) + 1.5,
      duration: ((i * 2) % 2) + 3,
      delay: ((i * 4) % 4) + 1,
      color: ['purple', 'cyan'][i % 2],
      rotationSpeed: 1
    }));
  }, [readyToRender, shouldReduceEffects, shouldEnableFullEffects]);

  // MOBILE: Disable pseudo objects completely
  const pseudoObjects = useMemo(() => {
    if (!readyToRender || shouldReduceEffects) return [];

    const objectCount = shouldEnableFullEffects ? 15 : 8;
    const types: PseudoObject['type'][] = ['hexagon', 'ring', 'cross', 'spiral', 'wave', 'grid'];
    const colors = ['purple', 'cyan', 'pink', 'blue', 'emerald'];

    return [...Array(objectCount)].map((_, i) => ({
      id: i,
      x: (i * 73.6) % 85 + 7.5,
      y: (i * 41.2) % 85 + 7.5,
      z: (i * 37) % 300 + 50,
      width: ((i * 11) % 60) + 80,
      height: ((i * 13) % 60) + 80,
      rotation: (i * 67) % 360,
      duration: ((i * 7) % 12) + 15,
      delay: (i * 3) % 8,
      type: types[i % types.length],
      opacity: Math.max(0.15 - (((i * 37) % 300 + 50) / 300) * 0.12, 0.03),
      color: colors[i % colors.length]
    }));
  }, [readyToRender, shouldReduceEffects, shouldEnableFullEffects]);

  // MOBILE: Disable orbiting elements completely
  const orbitingElements = useMemo(() => {
    if (!readyToRender || shouldReduceEffects) return [];

    const elementCount = shouldEnableFullEffects ? 8 : 4;

    return [...Array(elementCount)].map((_, i) => ({
      id: i,
      centerX: (i % 2 === 0) ? 25 : 75,
      centerY: (i < elementCount / 2) ? 25 : 75,
      radius: ((i * 19) % 150) + 100,
      angle: (i * 45) % 360,
      size: ((i * 7) % 8) + 4,
      duration: ((i * 5) % 15) + 20,
      delay: i * 2.5
    }));
  }, [readyToRender, shouldReduceEffects, shouldEnableFullEffects]);

  // MOBILE: Disable floating shapes completely
  const floatingShapes = useMemo(() => {
    if (!readyToRender || shouldReduceEffects) return [];

    const shapeCount = shouldEnableFullEffects ? 12 : 6;
    const shapes: ('circle' | 'square' | 'triangle' | 'diamond')[] = ['circle', 'square', 'triangle', 'diamond'];

    return [...Array(shapeCount)].map((_, i) => ({
      id: i,
      x: (i * 83.7) % 90 + 5,
      y: (i * 47.3) % 90 + 5,
      size: ((i * 7) % 30) + 40,
      rotation: (i * 45) % 360,
      duration: ((i * 4) % 6) + 8,
      delay: (i * 2) % 4,
      shape: shapes[i % shapes.length]
    }));
  }, [readyToRender, shouldReduceEffects, shouldEnableFullEffects]);

  // SSR SAFE: Return minimal background until client is ready
  if (!readyToRender) {
    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background-secondary/30 to-background-tertiary/20" />
      </div>
    );
  }

  const particleColors = {
    purple: 'rgba(139, 92, 246, 0.6)',
    cyan: 'rgba(6, 182, 212, 0.6)',
    pink: 'rgba(236, 72, 153, 0.6)',
    blue: 'rgba(59, 130, 246, 0.6)',
    emerald: 'rgba(16, 185, 129, 0.6)'
  };

  // Pseudo-3D Object Component (Desktop only)
  const PseudoObjectComponent = ({ obj }: { obj: PseudoObject }) => {
    const scale = 1 - (obj.z / 500);
    const blur = obj.z / 100;
    const baseColor = particleColors[obj.color as keyof typeof particleColors];

    const renderShape = () => {
      const commonStyles = {
        width: '100%',
        height: '100%',
        background: `linear-gradient(135deg, ${baseColor}, transparent)`,
        border: `1px solid ${baseColor}`,
        filter: `blur(${blur}px)`,
        opacity: obj.opacity
      };

      switch (obj.type) {
        case 'hexagon':
          return (
            <div
              style={{
                ...commonStyles,
                clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)'
              }}
            />
          );
        case 'ring':
          return (
            <div style={commonStyles} className="rounded-full relative">
              <div
                className="absolute inset-4 rounded-full"
                style={{ background: 'var(--background)' }}
              />
            </div>
          );
        case 'cross':
          return (
            <div style={commonStyles} className="relative">
              <div className="absolute inset-y-0 left-1/2 w-px transform -translate-x-1/2" style={{ background: baseColor }} />
              <div className="absolute inset-x-0 top-1/2 h-px transform -translate-y-1/2" style={{ background: baseColor }} />
            </div>
          );
        case 'spiral':
          return (
            <div style={commonStyles} className="rounded-full relative overflow-hidden">
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: `conic-gradient(from 0deg, transparent, ${baseColor}, transparent)`
                }}
              />
            </div>
          );
        case 'wave':
          return (
            <div style={commonStyles} className="relative overflow-hidden">
              <div
                className="absolute inset-0"
                style={{
                  background: `repeating-linear-gradient(45deg, ${baseColor}, transparent 10px, ${baseColor} 20px)`
                }}
              />
            </div>
          );
        case 'grid':
          return (
            <div style={commonStyles} className="relative">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `
                    linear-gradient(${baseColor} 1px, transparent 1px),
                    linear-gradient(90deg, ${baseColor} 1px, transparent 1px)
                  `,
                  backgroundSize: '20% 20%'
                }}
              />
            </div>
          );
        default:
          return <div style={commonStyles} className="rounded-lg" />;
      }
    };

    return (
      <motion.div
        className="absolute"
        style={{
          left: `${obj.x}%`,
          top: `${obj.y}%`,
          width: `${obj.width * scale}px`,
          height: `${obj.height * scale}px`,
          zIndex: Math.floor(10 - obj.z / 35)
        }}
        animate={{
          x: [0, Math.sin(obj.id * 0.7) * 80, Math.cos(obj.id * 0.5) * 60, 0],
          y: [0, Math.cos(obj.id * 0.8) * 50, Math.sin(obj.id * 0.6) * 40, 0],
          rotate: [obj.rotation, obj.rotation + 180, obj.rotation + 360],
          scale: [scale * 0.9, scale * 1.1, scale * 0.9]
        }}
        transition={{
          duration: obj.duration,
          repeat: Infinity,
          delay: obj.delay,
          ease: "easeInOut"
        }}
      >
        {renderShape()}
      </motion.div>
    );
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background-secondary/30 to-background-tertiary/20" />

      {/* MOBILE VERSION - ULTRA LIGHTWEIGHT */}
      {shouldReduceEffects && (
        <>
          {/* Static gradient - no animation to save performance */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/8 via-transparent to-cyan-500/8" />

          {/* Single subtle animated layer - very slow to save battery */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-tr from-purple-500/5 to-transparent"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{
              duration: 12, // Very slow animation
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Minimal particles - only 3 simple dots */}
          <div className="absolute inset-0" style={{ zIndex: 2 }}>
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute rounded-full"
                style={{
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  background: particleColors[particle.color as keyof typeof particleColors],
                  // No box-shadow for mobile to save performance
                }}
                animate={{
                  // Simple up-down movement only
                  y: [0, -30, 0],
                  opacity: [0.3, 0.7, 0.3],
                  // No rotation, no complex movement
                }}
                transition={{
                  duration: particle.duration,
                  repeat: Infinity,
                  delay: particle.delay,
                  ease: "easeInOut" // Simple easing
                }}
              />
            ))}
          </div>
        </>
      )}

      {/* TABLET VERSION - MODERATE EFFECTS */}
      {!shouldReduceEffects && !shouldEnableFullEffects && (
        <>
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-cyan-500/5"
            animate={{ opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
          />

          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                "radial-gradient(ellipse at 30% 30%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)",
                "radial-gradient(ellipse at 70% 70%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)",
                "radial-gradient(ellipse at 30% 30%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)"
              ]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Tablet particles */}
          <div className="absolute inset-0" style={{ zIndex: 4 }}>
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute rounded-full"
                style={{
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  background: particleColors[particle.color as keyof typeof particleColors],
                }}
                animate={{
                  y: [0, -50, 0],
                  x: [0, Math.sin((particle.id * Math.PI) / 8) * 15, 0],
                  opacity: [0, 0.6, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: particle.duration,
                  repeat: Infinity,
                  delay: particle.delay,
                  ease: "easeOut"
                }}
              />
            ))}
          </div>
        </>
      )}

      {/* DESKTOP VERSION - FULL EFFECTS */}
      {shouldEnableFullEffects && (
        <>
          {/* Enhanced gradient animations for desktop */}
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                "radial-gradient(ellipse at 20% 20%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)",
                "radial-gradient(ellipse at 80% 80%, rgba(6, 182, 212, 0.15) 0%, transparent 50%)",
                "radial-gradient(ellipse at 50% 10%, rgba(236, 72, 153, 0.15) 0%, transparent 50%)",
                "radial-gradient(ellipse at 20% 20%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)"
              ]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                "linear-gradient(45deg, rgba(139, 92, 246, 0.08), transparent, rgba(6, 182, 212, 0.08))",
                "linear-gradient(135deg, rgba(6, 182, 212, 0.08), transparent, rgba(236, 72, 153, 0.08))",
                "linear-gradient(225deg, rgba(236, 72, 153, 0.08), transparent, rgba(139, 92, 246, 0.08))",
                "linear-gradient(315deg, rgba(139, 92, 246, 0.08), transparent, rgba(6, 182, 212, 0.08))"
              ]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          />

          <motion.div
            className="absolute inset-0 opacity-40"
            style={{
              background: `
                radial-gradient(circle at 25% 25%, rgba(139, 92, 246, 0.4) 0%, transparent 50%),
                radial-gradient(circle at 75% 75%, rgba(6, 182, 212, 0.4) 0%, transparent 50%),
                radial-gradient(circle at 75% 25%, rgba(236, 72, 153, 0.4) 0%, transparent 50%),
                radial-gradient(circle at 25% 75%, rgba(168, 85, 247, 0.4) 0%, transparent 50%)
              `
            }}
            animate={{
              opacity: [0.2, 0.4, 0.2],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Background Pseudo-3D Objects Layer */}
          {pseudoObjects.length > 0 && (
            <div className="absolute inset-0" style={{ zIndex: 1 }}>
              {pseudoObjects.map((obj) => (
                <PseudoObjectComponent key={obj.id} obj={obj} />
              ))}
            </div>
          )}

          {/* Orbiting Elements Layer */}
          {orbitingElements.length > 0 && (
            <div className="absolute inset-0" style={{ zIndex: 3 }}>
              {orbitingElements.map((element) => (
                <motion.div
                  key={element.id}
                  className="absolute rounded-full"
                  style={{
                    width: `${element.size}px`,
                    height: `${element.size}px`,
                    background: `radial-gradient(circle, rgba(139, 92, 246, 0.4), rgba(6, 182, 212, 0.2))`,
                    border: '1px solid rgba(139, 92, 246, 0.3)',
                    left: `${element.centerX}%`,
                    top: `${element.centerY}%`,
                    transformOrigin: 'center center'
                  }}
                  animate={{
                    x: [
                      Math.cos((element.angle * Math.PI) / 180) * element.radius,
                      Math.cos(((element.angle + 90) * Math.PI) / 180) * element.radius,
                      Math.cos(((element.angle + 180) * Math.PI) / 180) * element.radius,
                      Math.cos(((element.angle + 270) * Math.PI) / 180) * element.radius,
                      Math.cos((element.angle * Math.PI) / 180) * element.radius
                    ],
                    y: [
                      Math.sin((element.angle * Math.PI) / 180) * element.radius,
                      Math.sin(((element.angle + 90) * Math.PI) / 180) * element.radius,
                      Math.sin(((element.angle + 180) * Math.PI) / 180) * element.radius,
                      Math.sin(((element.angle + 270) * Math.PI) / 180) * element.radius,
                      Math.sin((element.angle * Math.PI) / 180) * element.radius
                    ],
                    scale: [0.8, 1.2, 0.8],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{
                    duration: element.duration,
                    repeat: Infinity,
                    delay: element.delay,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
          )}

          {/* Floating geometric shapes */}
          {floatingShapes.length > 0 && (
            <div className="absolute inset-0" style={{ zIndex: 4 }}>
              {floatingShapes.map((shape) => {
                const ShapeComponent = ({ className, style }: { className: string; style: any }) => {
                  switch (shape.shape) {
                    case 'circle':
                      return <div className={`${className} rounded-full`} style={style} />;
                    case 'square':
                      return <div className={`${className} rounded-lg`} style={style} />;
                    case 'triangle':
                      return (
                        <div
                          className={className}
                          style={{
                            ...style,
                            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
                          }}
                        />
                      );
                    case 'diamond':
                      return (
                        <div
                          className={className}
                          style={{
                            ...style,
                            clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
                          }}
                        />
                      );
                    default:
                      return <div className={`${className} rounded-full`} style={style} />;
                  }
                };

                return (
                  <motion.div
                    key={shape.id}
                    className="absolute"
                    style={{
                      left: `${shape.x}%`,
                      top: `${shape.y}%`,
                      width: `${shape.size}px`,
                      height: `${shape.size}px`,
                    }}
                    animate={{
                      x: [0, 30, -20, 0],
                      y: [0, -40, 30, 0],
                      rotate: [shape.rotation, shape.rotation + 180, shape.rotation + 360],
                      scale: [0.8, 1.2, 0.8],
                      opacity: [0.1, 0.3, 0.1]
                    }}
                    transition={{
                      duration: shape.duration,
                      repeat: Infinity,
                      delay: shape.delay,
                      ease: "easeInOut"
                    }}
                  >
                    <ShapeComponent
                      className="w-full h-full border border-white/10"
                      style={{
                        background: `linear-gradient(135deg,
                          rgba(139, 92, 246, 0.1),
                          rgba(6, 182, 212, 0.05))`,
                        backdropFilter: 'blur(1px)'
                      }}
                    />
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Enhanced particle system */}
          <div className="absolute inset-0" style={{ zIndex: 5 }}>
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute rounded-full"
                style={{
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  background: particleColors[particle.color as keyof typeof particleColors],
                  boxShadow: `0 0 ${particle.size * 3}px ${particleColors[particle.color as keyof typeof particleColors]}`
                }}
                animate={{
                  y: [0, -80 - particle.z * 0.3, particle.z * 0.2, 0],
                  x: [
                    0,
                    Math.sin((particle.id * Math.PI) / 8) * 20,
                    Math.cos((particle.id * Math.PI) / 6) * 15,
                    0
                  ],
                  opacity: [0, 0.8, 0.4, 0],
                  scale: [0, 1, 1.2, 0],
                  rotate: [0, 180 * particle.rotationSpeed, 360 * particle.rotationSpeed]
                }}
                transition={{
                  duration: particle.duration,
                  repeat: Infinity,
                  delay: particle.delay,
                  ease: "easeOut"
                }}
              />
            ))}
          </div>

          {/* Grid pattern overlay */}
          <motion.div
            className="absolute inset-0 opacity-20"
            style={{
              zIndex: 2,
              backgroundImage: `
                linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px'
            }}
            animate={{
              opacity: [0.1, 0.2, 0.1],
              backgroundPosition: ['0px 0px', '60px 60px', '0px 0px']
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear"
            }}
          />

          {/* Corner accent elements */}
          <motion.div
            className="absolute top-0 left-0 w-96 h-96 opacity-20"
            style={{
              zIndex: 1,
              background: `radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)`
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            className="absolute bottom-0 right-0 w-96 h-96 opacity-20"
            style={{
              zIndex: 1,
              background: `radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, transparent 70%)`
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          />
        </>
      )}
    </div>
  );
};

export default AnimatedBackground;
