'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Type definitions for particle systems
interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

interface Orb {
  id: number;
  size: number;
  x: number;
  y: number;
  duration: number;
  delay: number;
}

const ProfessionalLoadingScreen = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('Initializing...');
  const [particles, setParticles] = useState<Particle[]>([]);
  const [orbs, setOrbs] = useState<Orb[]>([]);

  const loadingSteps = [
    'Initializing components...',
    'Loading assets...',
    'Connecting to server...',
    'Processing data...',
    'Finalizing setup...',
    'Ready to launch!'
  ];

  useEffect(() => {
    // Initialize floating orbs
    const orbData = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      size: Math.random() * 60 + 20,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 2,
    }));
    setOrbs(orbData);

    // Initialize particles
    const particleData = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 3,
    }));
    setParticles(particleData);

    // Simulate realistic loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = Math.min(prev + Math.random() * 8 + 2, 100);

        // Update loading step based on progress
        const stepIndex = Math.floor((newProgress / 100) * loadingSteps.length);
        setCurrentStep(loadingSteps[Math.min(stepIndex, loadingSteps.length - 1)]);

        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 1000);
        }

        return newProgress;
      });
    }, 120);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] overflow-hidden"
          style={{
            background: `
              radial-gradient(ellipse at top left, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
              radial-gradient(ellipse at bottom right, rgba(6, 182, 212, 0.15) 0%, transparent 50%),
              radial-gradient(ellipse at center, rgba(26, 26, 46, 0.8) 0%, #0a0a0a 100%)
            `
          }}
        >
          {/* Animated Background Orbs */}
          <div className="absolute inset-0">
            {orbs.map((orb) => (
              <motion.div
                key={orb.id}
                className="absolute rounded-full opacity-10"
                style={{
                  width: orb.size,
                  height: orb.size,
                  left: `${orb.x}%`,
                  top: `${orb.y}%`,
                  background: `linear-gradient(135deg, rgba(139, 92, 246, 0.6), rgba(6, 182, 212, 0.6))`
                }}
                animate={{
                  x: [0, 30, -20, 0],
                  y: [0, -40, 20, 0],
                  scale: [1, 1.2, 0.8, 1],
                }}
                transition={{
                  duration: orb.duration,
                  repeat: Infinity,
                  delay: orb.delay,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>

          {/* Floating Particles */}
          <div className="absolute inset-0">
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute rounded-full bg-white"
                style={{
                  width: particle.size,
                  height: particle.size,
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                }}
                animate={{
                  y: [-20, -80, -20],
                  x: [0, 10, -10, 0],
                  opacity: [0, 0.6, 0],
                }}
                transition={{
                  duration: particle.duration,
                  repeat: Infinity,
                  delay: particle.delay,
                  ease: "easeOut"
                }}
              />
            ))}
          </div>

          {/* Main Content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center max-w-md mx-auto px-6">

              {/* Logo Container */}
              <motion.div
                initial={{ scale: 0, rotate: -180, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                className="mb-8"
              >
                <div className="relative mx-auto w-24 h-24">
                  {/* Outer rotating ring */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `conic-gradient(from 0deg, rgba(139, 92, 246, 0.8), rgba(6, 182, 212, 0.8), rgba(139, 92, 246, 0.8))`,
                      padding: '3px'
                    }}
                  >
                    <div className="w-full h-full rounded-full bg-[#0a0a0a]" />
                  </motion.div>

                  {/* Inner pulsing core */}
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.8, 1, 0.8]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute inset-4 rounded-full flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, rgba(139, 92, 246, 0.9), rgba(6, 182, 212, 0.9))`,
                      boxShadow: `
                        0 0 30px rgba(139, 92, 246, 0.6),
                        inset 0 0 20px rgba(255, 255, 255, 0.2)
                      `
                    }}
                  >
                    <span className="text-white font-bold text-xl">R</span>
                  </motion.div>
                </div>
              </motion.div>

              {/* Brand Name */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
                className="mb-2"
              >
                <h1
                  className="text-5xl font-bold mb-2"
                  style={{
                    background: `linear-gradient(135deg, rgba(139, 92, 246, 1), rgba(6, 182, 212, 1))`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Revo Rahmat
                </h1>

                <motion.p
                  className="text-slate-400 text-lg font-medium"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Full-Stack Developer & BASIC Founder
                </motion.p>
              </motion.div>

              {/* Progress Section */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="mt-8 space-y-4"
              >
                {/* Progress Bar Container */}
                <div
                  className="relative w-full h-2 rounded-full overflow-hidden"
                  style={{
                    background: `rgba(255, 255, 255, 0.05)`,
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                >
                  {/* Progress Fill */}
                  <motion.div
                    className="h-full rounded-full relative"
                    style={{
                      width: `${progress}%`,
                      background: `linear-gradient(90deg, rgba(139, 92, 246, 0.9), rgba(6, 182, 212, 0.9))`,
                      boxShadow: `0 0 20px rgba(139, 92, 246, 0.6)`
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    {/* Shimmer effect */}
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: `linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)`,
                        backgroundSize: '100px 100%'
                      }}
                      animate={{ x: [-100, 300] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </motion.div>
                </div>

                {/* Progress Info */}
                <div className="flex justify-between items-center text-sm">
                  <motion.span
                    className="text-slate-300"
                    key={currentStep}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {currentStep}
                  </motion.span>
                  <span className="text-slate-400 font-mono">
                    {Math.round(progress)}%
                  </span>
                </div>
              </motion.div>

              {/* Loading Dots */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="flex justify-center space-x-2 mt-6"
              >
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full"
                    style={{
                      background: `rgba(139, 92, 246, 0.8)`
                    }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </motion.div>
            </div>
          </div>

          {/* Decorative Elements */}
          <motion.div
            className="absolute top-10 left-10"
            animate={{ rotate: 360, scale: [1, 1.1, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
          >
            <div
              className="w-4 h-4 rounded-full"
              style={{
                background: `rgba(139, 92, 246, 0.6)`,
                boxShadow: `0 0 20px rgba(139, 92, 246, 0.4)`
              }}
            />
          </motion.div>

          <motion.div
            className="absolute bottom-10 right-10"
            animate={{ rotate: -360, scale: [1, 0.9, 1] }}
            transition={{ duration: 6, repeat: Infinity }}
          >
            <div
              className="w-6 h-6 rounded-full"
              style={{
                background: `rgba(6, 182, 212, 0.6)`,
                boxShadow: `0 0 20px rgba(6, 182, 212, 0.4)`
              }}
            />
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProfessionalLoadingScreen;
