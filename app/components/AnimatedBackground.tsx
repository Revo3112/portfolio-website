"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useMobileOptimization } from "../hooks/useMobileOptimization";

const AnimatedBackground = () => {
  const { shouldReduceEffects, isDesktop, hasMounted } = useMobileOptimization();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!hasMounted || !isClient || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // Background Gradient Animation
      gsap.to(".bg-gradient", {
        backgroundPosition: "200% 200%",
        duration: 20,
        repeat: -1,
        ease: "none",
      });

      if (shouldReduceEffects) return;

      // Particles Animation
      const particles = document.querySelectorAll(".particle");
      particles.forEach((particle) => {
        gsap.to(particle, {
          y: "random(-100, 100)",
          x: "random(-100, 100)",
          rotation: "random(0, 360)",
          opacity: "random(0.3, 0.7)",
          duration: "random(5, 10)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: "random(0, 5)",
        });
      });

      // Floating Shapes Animation
      const shapes = document.querySelectorAll(".floating-shape");
      shapes.forEach((shape) => {
        gsap.to(shape, {
          y: "random(-50, 50)",
          rotation: "random(0, 360)",
          duration: "random(10, 20)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      // Grid Pattern Animation
      gsap.to(".grid-pattern", {
        backgroundPosition: "60px 60px",
        duration: 30,
        repeat: -1,
        ease: "none",
      });

      // Corner Accents
      gsap.to(".corner-accent", {
        scale: 1.2,
        opacity: 0.2,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

    }, containerRef);

    return () => ctx.revert();
  }, [hasMounted, isClient, shouldReduceEffects]);

  const readyToRender = hasMounted && isClient;

  if (!readyToRender) return null;

  return (
    <div ref={containerRef} className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Base Gradient */}
      <div
        className="bg-gradient absolute inset-0 opacity-30"
        style={{
          background: "linear-gradient(45deg, #1a1a2e, #16213e, #1a1a2e)",
          backgroundSize: "400% 400%"
        }}
      />

      {!shouldReduceEffects && (
        <>
          {/* Particles */}
          {Array.from({ length: isDesktop ? 20 : 5 }).map((_, i) => (
            <div
              key={`particle-${i}`}
              className="particle absolute rounded-full bg-purple-500/20 blur-sm"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
              }}
            />
          ))}

          {/* Floating Shapes */}
          {isDesktop && Array.from({ length: 5 }).map((_, i) => (
            <div
              key={`shape-${i}`}
              className="floating-shape absolute border border-cyan-500/10"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 50 + 20}px`,
                height: `${Math.random() * 50 + 20}px`,
                borderRadius: i % 2 === 0 ? "50%" : "10%",
              }}
            />
          ))}

          {/* Grid Pattern */}
          <div
            className="grid-pattern absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
            }}
          />

          {/* Corner Accents */}
          <div
            className="corner-accent absolute top-0 left-0 w-96 h-96 opacity-10"
            style={{
              background: "radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)"
            }}
          />
          <div
            className="corner-accent absolute bottom-0 right-0 w-96 h-96 opacity-10"
            style={{
              background: "radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, transparent 70%)"
            }}
          />
        </>
      )}
    </div>
  );
};

export default AnimatedBackground;
