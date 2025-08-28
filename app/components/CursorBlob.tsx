// components/CursorBlob.tsx - OPTIMIZED WITHOUT CUSTOM RAF
"use client";

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useMobileOptimization } from '../hooks/useMobileOptimization';

const CursorBlob = () => {
  const { isDesktop, hasMounted } = useMobileOptimization();
  const [isVisible, setIsVisible] = useState(false);

  // Use Framer Motion's optimized animation system instead of custom RAF
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animations (integrated with Framer Motion's RAF)
  const springX = useSpring(mouseX, { damping: 25, stiffness: 200 });
  const springY = useSpring(mouseY, { damping: 25, stiffness: 200 });

  useEffect(() => {
    // Early return if not mounted or not desktop
    if (!hasMounted || !isDesktop) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isDesktop, hasMounted, mouseX, mouseY]);

  // Return null until client detection is complete
  if (!hasMounted || !isDesktop) {
    return null;
  }

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-50"
      style={{
        x: springX,
        y: springY,
        translateX: '-50%',
        translateY: '-50%',
      }}
      animate={{
        opacity: isVisible ? 1 : 0,
      }}
      transition={{
        opacity: { duration: 0.3 }
      }}
    >
      <div
        className="w-full h-full"
        style={{
          background:
            'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, rgba(6, 182, 212, 0.2) 100%)',
          borderRadius: '50%',
          filter: 'blur(8px)',
          mixBlendMode: 'screen',
        }}
      />
    </motion.div>
  );
};

export default CursorBlob;
