'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const PerformanceOptimizer = ({ children }: { children: React.ReactNode }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Sync dengan ScrollReveal timing untuk smooth coordination
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100); // Further reduced untuk better sync

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{
        duration: 0.2, // Faster transition untuk immediate responsiveness
        ease: "easeOut"
      }}
    >
      {children}
    </motion.div>
  );
};

export default PerformanceOptimizer;
