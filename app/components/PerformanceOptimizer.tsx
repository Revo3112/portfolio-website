'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const PerformanceOptimizer = ({ children }: { children: React.ReactNode }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Simple visibility delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    // Basic performance optimization
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      document.documentElement.style.setProperty('--animation-duration', '0.01ms');
    }

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{
        duration: 0.5,
        ease: "easeOut"
      }}
    >
      {children}
    </motion.div>
  );
};

export default PerformanceOptimizer;
