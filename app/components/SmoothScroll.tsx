"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { useMobileOptimization } from "../hooks/useMobileOptimization";

interface SmoothScrollProps {
  children: React.ReactNode;
}

const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number | null>(null);
  const { hasMounted, isMobile } = useMobileOptimization();

  useEffect(() => {
    if (!hasMounted) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      return; // Skip smooth scrolling if user prefers reduced motion
    }

    // Intersection Observer compatible Lenis configuration
    const lenis = new Lenis({
      duration: isMobile ? 0.6 : 0.7, // Faster for better IntersectionObserver sync
      easing: (t) => 1 - Math.pow(1 - t, 2), // Lighter easing for smoother reveals
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: isMobile ? 0.8 : 1, // Lighter on mobile for touch compatibility
      touchMultiplier: isMobile ? 1.0 : 1.2, // Reduced multipliers for smoother detection
      infinite: false,
      autoResize: true,
      syncTouch: true,
      lerp: isMobile ? 0.08 : 0.06, // Much lighter lerp for responsive scroll detection
    });

    lenisRef.current = lenis;

    // Add scroll event listener untuk better integration dengan Intersection Observer
    const handleLenisScroll = (data: any) => {
      // Trigger manual scroll event untuk Intersection Observer compatibility
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('scroll'));
      }
    };

    lenis.on('scroll', handleLenisScroll);

    // Lightweight RAF loop optimized for scroll detection
    function raf(time: number) {
      lenisRef.current?.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    }

    rafRef.current = requestAnimationFrame(raf);

    // Enhanced cleanup
    return () => {
      if (lenisRef.current) {
        lenisRef.current.off('scroll', handleLenisScroll);
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    };
  }, [hasMounted, isMobile]);

  return <>{children}</>;
};

export default SmoothScroll;
