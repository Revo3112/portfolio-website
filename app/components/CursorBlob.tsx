"use client";

import { useEffect, useRef } from 'react';

const CursorBlob = () => {
  const blobRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const blob = blobRef.current;
    if (!blob) return;

    let isHovering = false;
    let currentColor = 'rgba(139, 92, 246, 0.15)'; // default purple

    // Handle mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };

      // Change color based on section
      const target = e.target as HTMLElement;
      const section = target.closest('section');

      if (section) {
        const sectionId = section.id;
        switch (sectionId) {
          case 'hero':
            currentColor = 'rgba(139, 92, 246, 0.15)'; // purple
            break;
          case 'about':
            currentColor = 'rgba(6, 182, 212, 0.15)'; // cyan
            break;
          case 'work':
            currentColor = 'rgba(34, 197, 94, 0.15)'; // green
            break;
          case 'skills':
            currentColor = 'rgba(249, 115, 22, 0.15)'; // orange
            break;
          case 'projects':
            currentColor = 'rgba(236, 72, 153, 0.15)'; // pink
            break;
          case 'contact':
            currentColor = 'rgba(239, 68, 68, 0.15)'; // red
            break;
          default:
            currentColor = 'rgba(139, 92, 246, 0.15)'; // purple
        }

        if (!isHovering) {
          blob.style.background = `radial-gradient(circle, ${currentColor} 0%, ${currentColor.replace('0.15', '0.05')} 40%, transparent 70%)`;
        }
      }
    };

    // Handle mouse enter for interactive elements
    const handleMouseEnter = (e: Event) => {
      isHovering = true;
      const target = e.target as HTMLElement;

      // Different hover colors based on element type
      let hoverColor = 'rgba(139, 92, 246, 0.3)'; // default purple

      if (target.classList.contains('bg-gradient-to-r')) {
        hoverColor = 'rgba(139, 92, 246, 0.4)'; // strong purple for buttons
      } else if (target.closest('#skills')) {
        hoverColor = 'rgba(249, 115, 22, 0.3)'; // orange for skills
      } else if (target.closest('#projects')) {
        hoverColor = 'rgba(236, 72, 153, 0.3)'; // pink for projects
      }

      blob.style.transform = `translate(${positionRef.current.x - 30}px, ${positionRef.current.y - 30}px) scale(1.8)`;
      blob.style.background = `radial-gradient(circle, ${hoverColor} 0%, ${hoverColor.replace(/[\d.]+\)$/, '0.1)')} 40%, transparent 70%)`;
      blob.style.filter = 'blur(12px)';
    };

    // Handle mouse leave for interactive elements
    const handleMouseLeave = () => {
      isHovering = false;
      blob.style.transform = `translate(${positionRef.current.x - 25}px, ${positionRef.current.y - 25}px) scale(1)`;
      blob.style.background = `radial-gradient(circle, ${currentColor} 0%, ${currentColor.replace('0.15', '0.05')} 40%, transparent 70%)`;
      blob.style.filter = 'blur(8px)';
    };

    // Animation loop
    const animate = () => {
      // Smooth lerp animation
      positionRef.current.x += (targetRef.current.x - positionRef.current.x) * 0.15;
      positionRef.current.y += (targetRef.current.y - positionRef.current.y) * 0.15;

      if (!isHovering) {
        blob.style.transform = `translate(${positionRef.current.x - 25}px, ${positionRef.current.y - 25}px) scale(1)`;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);

    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .cursor-interactive');
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
    });

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      interactiveElements.forEach(element => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      });
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={blobRef}
      className="fixed w-12 h-12 pointer-events-none z-50 opacity-80"
      style={{
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, rgba(139, 92, 246, 0.05) 40%, transparent 70%)',
        borderRadius: '50%',
        transition: 'background 0.3s ease, filter 0.3s ease',
        filter: 'blur(8px)',
        mixBlendMode: 'screen',
      }}
    />
  );
};

export default CursorBlob;
