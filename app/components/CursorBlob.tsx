// components/CursorBlob.tsx - FIXED VERSION
"use client";

import { useEffect, useRef, useState } from 'react';
import { useMobileOptimization } from '../hooks/useMobileOptimization';

const CursorBlob = () => {
  const { isDesktop } = useMobileOptimization();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    // Early return inside useEffect is fine
    if (!isDesktop) return;

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const animate = () => {
      currentX += (mouseX - currentX) * 0.1;
      currentY += (mouseY - currentY) * 0.1;

      setPosition({ x: currentX, y: currentY });
      animationRef.current = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isDesktop]); // Add isDesktop as dependency

  // Conditional rendering AFTER all hooks
  if (!isDesktop) {
    return null;
  }

  return (
    <div
      className={`fixed top-0 left-0 w-8 h-8 pointer-events-none z-50 transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        transform: `translate(${position.x - 16}px, ${position.y - 16}px)`,
        background:
          'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, rgba(6, 182, 212, 0.2) 100%)',
        borderRadius: '50%',
        filter: 'blur(8px)',
        mixBlendMode: 'screen',
      }}
    />
  );
};

export default CursorBlob;
