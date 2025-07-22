"use client";

import { motion, Variants } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { ReactNode, useRef } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale';
  delay?: number;
  threshold?: number;
  className?: string;
  stagger?: boolean;
}

const ScrollReveal = ({
  children,
  direction = 'up',
  delay = 0,
  threshold = 0.1,
  className = '',
  stagger = false
}: ScrollRevealProps) => {
  const motionRef = useRef<HTMLDivElement>(null);
  const { ref, isVisible } = useScrollReveal({
    threshold,
    delay,
    triggerOnce: true
  });

  // Combine refs
  const setRefs = (element: HTMLDivElement | null) => {
    motionRef.current = element;
    if (ref.current !== element) {
      (ref as any).current = element;
    }
  };

  const getVariants = (): Variants => {
    if (stagger) {
      return {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2,
          },
        },
      };
    }

    switch (direction) {
      case 'left':
        return {
          hidden: { opacity: 0, x: -100, scale: 0.95 },
          visible: {
            opacity: 1,
            x: 0,
            scale: 1,
            transition: { duration: 0.8, ease: [0.25, 0.25, 0, 1] },
          },
        };
      case 'right':
        return {
          hidden: { opacity: 0, x: 100, scale: 0.95 },
          visible: {
            opacity: 1,
            x: 0,
            scale: 1,
            transition: { duration: 0.8, ease: [0.25, 0.25, 0, 1] },
          },
        };
      case 'scale':
        return {
          hidden: { opacity: 0, scale: 0.8, rotateY: 15 },
          visible: {
            opacity: 1,
            scale: 1,
            rotateY: 0,
            transition: { duration: 0.8, ease: [0.25, 0.25, 0, 1] },
          },
        };
      default:
        return {
          hidden: { opacity: 0, y: 50, scale: 0.95 },
          visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.6, ease: [0.25, 0.25, 0, 1] },
          },
        };
    }
  };

  return (
    <motion.div
      ref={setRefs}
      className={className}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={getVariants()}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
