// hooks/useMobileOptimization.ts - SIMPLIFIED SCREEN-SIZE ONLY DETECTION
"use client";

import { useState, useEffect } from 'react';

export const useMobileOptimization = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    setHasMounted(true);

    const detectDevice = () => {
      if (typeof window === 'undefined') return;

      const width = window.innerWidth;
      setScreenWidth(width);

      // SIMPLE BREAKPOINT-BASED DETECTION
      // Mobile: < 768px
      // Desktop: >= 768px
      const isMobileDevice = width < 768;
      const isDesktopDevice = width >= 768;

      setIsMobile(isMobileDevice);
      setIsDesktop(isDesktopDevice);

      // Motion preference detection
      let motionReduced = false;
      try {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        motionReduced = mediaQuery.matches;

        const handleMotionChange = (e: MediaQueryListEvent) => {
          setIsReducedMotion(e.matches);
        };

        mediaQuery.addEventListener('change', handleMotionChange);
        return () => mediaQuery.removeEventListener('change', handleMotionChange);
      } catch (error) {
        console.warn('Media query for reduced motion failed:', error);
        motionReduced = false;
      }

      setIsReducedMotion(motionReduced);
    };

    const cleanup = detectDevice();

    // Debounced resize handler
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(detectDevice, 150);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
      if (cleanup) cleanup();
    };
  }, []);

  // CLEAR LOGIC: Only based on screen size
  const shouldReduceEffects = isMobile; // Reduce effects for mobile (< 768px)
  const shouldEnableFullEffects = isDesktop && !isReducedMotion; // Full effects for desktop (>= 768px) unless user prefers reduced motion

  // Debug logging
  if (process.env.NODE_ENV === 'development' && hasMounted) {
    console.log('Mobile Optimization Debug:', {
      screenWidth,
      isMobile: `${isMobile} (< 768px)`,
      isDesktop: `${isDesktop} (>= 768px)`,
      isReducedMotion,
      shouldReduceEffects,
      shouldEnableFullEffects,
      deviceType: isMobile ? 'mobile' : 'desktop'
    });
  }

  return {
    isMobile,
    isDesktop,
    isReducedMotion,
    shouldReduceEffects,
    shouldEnableFullEffects,
    hasMounted,
    deviceType: isMobile ? 'mobile' : 'desktop',
    screenWidth, // Added for debugging
  };
};
