// hooks/useMobileOptimization.ts - FIXED VERSION
import { useState, useEffect } from 'react';

export const useMobileOptimization = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  useEffect(() => {
    setHasMounted(true);

    const detectDevice = () => {
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
      const width = window.innerWidth;
      const height = window.innerHeight;
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

      // Enhanced device detection
      const isMobileUA = /android|webos|iphone|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
      const isTabletUA = /ipad|android(?!.*mobile)|kindle|silk/i.test(userAgent.toLowerCase());

      // Screen size classification
      const isPhoneSize = width < 768;
      const isTabletSize = width >= 768 && width < 1200;
      const isDesktopSize = width >= 1200;

      // Device type determination - More precise logic
      let mobile = false;
      let tablet = false;
      let desktop = false;

      if (isMobileUA && isPhoneSize) {
        // Definitely a mobile phone
        mobile = true;
        setDeviceType('mobile');
      } else if (isTabletUA || (hasTouch && isTabletSize)) {
        // Tablet device
        tablet = true;
        setDeviceType('tablet');
      } else if (isDesktopSize || (!hasTouch && width >= 768)) {
        // Desktop/laptop
        desktop = true;
        setDeviceType('desktop');
      } else if (hasTouch && isPhoneSize) {
        // Touch device with phone size - likely mobile
        mobile = true;
        setDeviceType('mobile');
      } else {
        // Default to desktop for unknown cases
        desktop = true;
        setDeviceType('desktop');
      }

      setIsMobile(mobile);
      setIsTablet(tablet);
      setIsDesktop(desktop);

      // Debug logging (remove in production)
      console.log('Device Detection:', {
        width,
        height,
        hasTouch,
        userAgent: userAgent.substring(0, 50) + '...',
        detected: mobile ? 'mobile' : tablet ? 'tablet' : 'desktop'
      });
    };

    // Motion preference detection
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    // Initial detection
    detectDevice();

    // Resize handler with debouncing
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(detectDevice, 200);
    };

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };

    // Event listeners
    window.addEventListener('resize', handleResize, { passive: true });
    mediaQuery.addEventListener('change', handleMotionChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      mediaQuery.removeEventListener('change', handleMotionChange);
      clearTimeout(resizeTimeout);
    };
  }, []);

  // Effect reduction logic - ONLY for true mobile phones or user preference
  const shouldReduceEffects = hasMounted && (
    isReducedMotion || // Always respect accessibility preference
    (isMobile && window.innerWidth < 640) // Only phones under 640px
  );

  // Enable full effects for desktop and tablets
  const shouldEnableFullEffects = hasMounted && (isDesktop || isTablet) && !isReducedMotion;

  return {
    isMobile,
    isTablet,
    isDesktop,
    isReducedMotion,
    shouldReduceEffects,
    shouldEnableFullEffects,
    hasMounted,
    deviceType
  };
};
