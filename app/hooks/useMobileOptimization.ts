// hooks/useMobileOptimization.ts - SIMPLIFIED VERSION
import { useState, useEffect } from 'react';

export const useMobileOptimization = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);

    const detectDevice = () => {
      if (typeof window === 'undefined') return;

      const width = window.innerWidth;
      const userAgent = navigator.userAgent.toLowerCase();

      // Simplified detection: Mobile vs Desktop ONLY
      const isMobileDevice = width < 768 ||
        /android|webos|iphone|ipod|blackberry|iemobile|opera mini/i.test(userAgent);

      setIsMobile(isMobileDevice);
      setIsDesktop(!isMobileDevice);

      // Motion preference check
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setIsReducedMotion(mediaQuery.matches);
    };

    detectDevice();

    // Handle resize
    const handleResize = () => {
      detectDevice();
    };

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Simplified effects logic
  const shouldReduceEffects = hasMounted && isReducedMotion;
  const shouldEnableFullEffects = hasMounted && !isReducedMotion;

  return {
    isMobile,
    isDesktop,
    isReducedMotion,
    shouldReduceEffects,
    shouldEnableFullEffects,
    hasMounted,
    deviceType: isMobile ? 'mobile' : 'desktop'
  };
};
