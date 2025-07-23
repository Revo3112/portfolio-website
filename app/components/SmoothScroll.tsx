"use client";

import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";

interface SmoothScrollProps {
  children: React.ReactNode;
}

const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number | null>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Initialize Lenis with optimized settings
    const lenis = new Lenis({
      duration: 0.8, // Reduced duration for smoother performance
      easing: (t) => 1 - Math.pow(1 - t, 3), // Simpler easing function
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.8, // Reduced for better control
      touchMultiplier: 1.5, // Reduced for mobile
      infinite: false,
      autoResize: true,
      syncTouch: true, // Better touch performance
    });

    lenisRef.current = lenis;

    // Optimized animation frame with performance monitoring
    function raf(time: number) {
      if (lenisRef.current) {
        lenisRef.current.raf(time);
        rafRef.current = requestAnimationFrame(raf);
      }
    }

    // Handle scroll start/end for performance optimization
    lenis.on('scroll', () => {
      if (!isScrolling) {
        setIsScrolling(true);
        document.body.classList.add('is-scrolling');
      }

      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Set timeout to detect scroll end
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
        document.body.classList.remove('is-scrolling');
      }, 150);
    });

    rafRef.current = requestAnimationFrame(raf);

    // Cleanup
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
      document.body.classList.remove('is-scrolling');
    };
  }, [isScrolling]);

  return <>{children}</>;
};

export default SmoothScroll;
