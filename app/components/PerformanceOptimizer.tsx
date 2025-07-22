'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const PerformanceOptimizer = ({ children }: { children: React.ReactNode }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Preload critical resources
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

      imagePaths.forEach(path => {
        const img = new Image();
        img.src = path;
      });
    };

    // Delay visibility to allow loading screen
    const timer = setTimeout(() => {
      setIsVisible(true);
      preloadImages();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

export default PerformanceOptimizer;
