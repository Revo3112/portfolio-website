'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

const PerformanceOptimizer = ({ children }: { children: React.ReactNode }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  // Debounced scroll handler for better performance
  const handleScroll = useCallback(() => {
    if (!isScrolling) {
      setIsScrolling(true);
      document.body.classList.add('is-scrolling');
    }

    // Use requestAnimationFrame for better performance
    requestAnimationFrame(() => {
      setTimeout(() => {
        setIsScrolling(false);
        document.body.classList.remove('is-scrolling');
      }, 150);
    });
  }, [isScrolling]);

  useEffect(() => {
    // Preload critical resources with intersection observer
    const preloadImages = () => {
      const imagePaths = [
        '/images/profile.jpg',
        '/images/Duahasa.png',
        '/images/EchoScribeAI.png',
        '/images/Eduverse_logo.png',
        '/images/PetaSampah_logo.png',
        '/images/PetRead.png',
        '/images/Horizon OS.png',
      ];

      // Use intersection observer for lazy loading
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              imageObserver.unobserve(img);
            }
          }
        });
      });

      imagePaths.forEach(path => {
        const img = new Image();
        img.loading = 'lazy';
        img.src = path;
      });
    };

    // Performance optimizations
    const optimizePerformance = () => {
      // Reduce motion for users who prefer it
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        document.documentElement.style.setProperty('--animation-duration', '0.01ms');
      }

      // Optimize for high refresh rate displays
      try {
        const displayRefreshRate = (screen as any)?.refreshRate || 60;
        if (displayRefreshRate > 60) {
          document.documentElement.style.setProperty('--smooth-factor', '0.8');
        }
      } catch (error) {
        // Fallback for browsers that don't support refreshRate
        console.debug('Screen refresh rate not available:', error);
      }
    };

    // Add passive scroll listener for better performance
    const addScrollListener = () => {
      let scrollTimeout: NodeJS.Timeout;

      const optimizedScrollHandler = () => {
        if (!isScrolling) {
          setIsScrolling(true);
          document.body.classList.add('is-scrolling');
        }

        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          setIsScrolling(false);
          document.body.classList.remove('is-scrolling');
        }, 150);
      };

      window.addEventListener('scroll', optimizedScrollHandler, { passive: true });

      return () => {
        window.removeEventListener('scroll', optimizedScrollHandler);
        clearTimeout(scrollTimeout);
      };
    };

    // Delay visibility to allow loading screen
    const timer = setTimeout(() => {
      setIsVisible(true);
      preloadImages();
      optimizePerformance();

      // Add scroll listener after component is visible
      const cleanup = addScrollListener();

      return cleanup;
    }, 1500); // Reduced from 2000ms for faster perceived load

    return () => {
      clearTimeout(timer);
    };
  }, [isScrolling]);

  // Memory cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.classList.remove('is-scrolling');
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{
        duration: 0.3, // Reduced duration for faster rendering
        ease: "easeOut"
      }}
      className="performance-optimized"
    >
      {children}
    </motion.div>
  );
};

export default PerformanceOptimizer;
