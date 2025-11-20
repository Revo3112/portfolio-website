// components/LoadingScreen.tsx - COMPLETE HYDRATION-SAFE VERSION
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMobileOptimization } from '../hooks/useMobileOptimization';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

interface FloatingElement {
  id: number;
  size: number;
  x: number;
  y: number;
  duration: number;
  delay: number;
  opacity: number;
}

const EpicLoadingScreen = () => {
  const { shouldReduceEffects, isDesktop, isMobile, shouldEnableFullEffects, hasMounted } = useMobileOptimization();
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('Initializing...');
  const [particles, setParticles] = useState<Particle[]>([]);
  const [floatingElements, setFloatingElements] = useState<FloatingElement[]>([]);
  const [showWelcome, setShowWelcome] = useState(false);

  const loadingSteps = [
    { text: 'Initializing quantum systems...', emoji: '⚡' },
    { text: 'Loading neural networks...', emoji: '🧠' },
    { text: 'Connecting to multiverse...', emoji: '🌌' },
    { text: 'Calibrating algorithms...', emoji: '🔧' },
    { text: 'Synchronizing data streams...', emoji: '📡' },
    { text: 'Finalizing experience...', emoji: '✨' },
    { text: 'Welcome to the future!', emoji: '🚀' }
  ];

  useEffect(() => {
    // Only run client-side detection
    if (!hasMounted) return;

    // Generate particles and floating elements based on device capability
    if (shouldEnableFullEffects) {
      const particleData = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 4 + 3,
        delay: Math.random() * 2,
        color: i % 3 === 0 ? 'purple' : i % 3 === 1 ? 'cyan' : 'pink'
      }));
      setParticles(particleData);

      const floatingData = Array.from({ length: 15 }, (_, i) => ({
        id: i,
        size: Math.random() * 100 + 50,
        x: Math.random() * 90 + 5,
        y: Math.random() * 90 + 5,
        duration: Math.random() * 10 + 8,
        delay: Math.random() * 3,
        opacity: Math.random() * 0.3 + 0.1
      }));
      setFloatingElements(floatingData);
    } else if (!shouldReduceEffects && !isMobile) {
      const particleData = Array.from({ length: 25 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 1.5,
        color: i % 2 === 0 ? 'purple' : 'cyan'
      }));
      setParticles(particleData);

      const floatingData = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        size: Math.random() * 80 + 40,
        x: Math.random() * 85 + 7.5,
        y: Math.random() * 85 + 7.5,
        duration: Math.random() * 8 + 6,
        delay: Math.random() * 2,
        opacity: Math.random() * 0.2 + 0.05
      }));
      setFloatingElements(floatingData);
    }

    // Progress simulation with realistic timing
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const increment = Math.random() * 12 + 3;
        const newProgress = Math.min(prev + increment, 100);

        const stepIndex = Math.floor((newProgress / 100) * loadingSteps.length);
        const currentStepData = loadingSteps[Math.min(stepIndex, loadingSteps.length - 1)];
        setCurrentStep(currentStepData.text);

        if (newProgress >= 95) {
          setShowWelcome(true);
        }

        if (newProgress >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => setLoading(false), shouldReduceEffects ? 800 : 2000);
        }

        return newProgress;
      });
    }, shouldReduceEffects ? 100 : 180);

    return () => clearInterval(progressInterval);
  }, [shouldEnableFullEffects, shouldReduceEffects, isMobile, hasMounted]);

  // Prevent rendering until client detection is complete
  if (!hasMounted) {
    return null;
  }

  // Mobile version - Clean and fast
  if (shouldReduceEffects) {
    return (
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[9999] bg-gradient-to-br from-gray-900 via-purple-900/20 to-black flex items-center justify-center"
          >
            <div className="text-center space-y-6">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-16 h-16 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6"
              >
                <span className="text-white font-bold text-2xl">R</span>
              </motion.div>

              <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto" />

              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-white text-lg font-medium"
              >
                {currentStep}
              </motion.div>

              <div className="text-purple-400 text-sm font-mono">
                {Math.round(progress)}%
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.1,
            rotateX: -15,
            filter: "blur(20px)"
          }}
          transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[9999] overflow-hidden"
          style={{
            background: `
              radial-gradient(ellipse at top left, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
              radial-gradient(ellipse at top right, rgba(236, 72, 153, 0.2) 0%, transparent 50%),
              radial-gradient(ellipse at bottom left, rgba(6, 182, 212, 0.25) 0%, transparent 50%),
              radial-gradient(ellipse at bottom right, rgba(168, 85, 247, 0.2) 0%, transparent 50%),
              radial-gradient(ellipse at center, rgba(15, 23, 42, 0.9) 0%, #000000 100%)
            `
          }}
        >
          {/* Animated mesh gradient background */}
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                "radial-gradient(600px circle at 20% 30%, rgba(139, 92, 246, 0.4) 0%, transparent 50%)",
                "radial-gradient(600px circle at 80% 70%, rgba(6, 182, 212, 0.4) 0%, transparent 50%)",
                "radial-gradient(600px circle at 40% 90%, rgba(236, 72, 153, 0.4) 0%, transparent 50%)",
                "radial-gradient(600px circle at 20% 30%, rgba(139, 92, 246, 0.4) 0%, transparent 50%)"
              ]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Floating geometric elements */}
          {shouldEnableFullEffects && (
            <div className="absolute inset-0">
              {floatingElements.map((element) => (
                <motion.div
                  key={element.id}
                  className="absolute rounded-full border border-white/10"
                  style={{
                    width: element.size,
                    height: element.size,
                    left: `${element.x}%`,
                    top: `${element.y}%`,
                    background: `radial-gradient(circle, rgba(139, 92, 246, ${element.opacity}), rgba(6, 182, 212, ${element.opacity / 2}))`
                  }}
                  animate={{
                    x: [0, 50, -30, 0],
                    y: [0, -30, 40, 0],
                    scale: [1, 1.2, 0.8, 1],
                    rotate: [0, 180, 360],
                    opacity: [element.opacity, element.opacity * 1.5, element.opacity * 0.5, element.opacity]
                  }}
                  transition={{
                    duration: element.duration,
                    repeat: Infinity,
                    delay: element.delay,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
          )}

          {/* Particle system */}
          <div className="absolute inset-0">
            {particles.map((particle) => {
              const colors = {
                purple: "rgba(139, 92, 246, 0.8)",
                cyan: "rgba(6, 182, 212, 0.8)",
                pink: "rgba(236, 72, 153, 0.8)"
              };

              return (
                <motion.div
                  key={particle.id}
                  className="absolute rounded-full"
                  style={{
                    width: particle.size,
                    height: particle.size,
                    left: `${particle.x}%`,
                    top: `${particle.y}%`,
                    background: colors[particle.color as keyof typeof colors] || colors.purple,
                    boxShadow: `0 0 ${particle.size * 2}px ${colors[particle.color as keyof typeof colors] || colors.purple}`
                  }}
                  animate={{
                    y: [-20, -100, -20],
                    x: [0, Math.sin(particle.id) * 20, 0],
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0]
                  }}
                  transition={{
                    duration: particle.duration,
                    repeat: Infinity,
                    delay: particle.delay,
                    ease: "easeOut"
                  }}
                />
              );
            })}
          </div>

          {/* Main content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center max-w-lg mx-auto px-6">
              <motion.div
                initial={{ scale: 0, rotate: -180, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                transition={{
                  duration: 1.5,
                  ease: [0.175, 0.885, 0.32, 1.275],
                  delay: 0.3
                }}
                className="mb-12 relative"
              >
                <div className="relative mx-auto w-32 h-32 group">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full p-1"
                    style={{
                      background: `conic-gradient(from 0deg,
                        rgba(139, 92, 246, 1),
                        rgba(236, 72, 153, 1),
                        rgba(6, 182, 212, 1),
                        rgba(168, 85, 247, 1),
                        rgba(139, 92, 246, 1))`
                    }}
                  >
                    <div className="w-full h-full rounded-full bg-black" />
                  </motion.div>

                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-2 rounded-full border-2 border-cyan-400/50"
                  />

                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.8, 1, 0.8],
                      boxShadow: [
                        "0 0 30px rgba(139, 92, 246, 0.6)",
                        "0 0 60px rgba(139, 92, 246, 0.8)",
                        "0 0 30px rgba(139, 92, 246, 0.6)"
                      ]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute inset-6 rounded-full flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg,
                        rgba(139, 92, 246, 0.9),
                        rgba(6, 182, 212, 0.9))`
                    }}
                  >
                    <motion.span
                      animate={{
                        textShadow: [
                          "0 0 10px rgba(255, 255, 255, 0.8)",
                          "0 0 20px rgba(255, 255, 255, 1)",
                          "0 0 10px rgba(255, 255, 255, 0.8)"
                        ]
                      }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="text-white font-bold text-3xl"
                    >
                      R
                    </motion.span>
                  </motion.div>

                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute inset-0 rounded-full border border-purple-400/30"
                      animate={{
                        scale: [1, 2, 1],
                        opacity: [0.5, 0, 0.5]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 1,
                        ease: "easeOut"
                      }}
                    />
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
                className="mb-4"
              >
                <motion.h1
                  className="text-6xl md:text-7xl font-bold mb-4"
                  style={{
                    background: `linear-gradient(135deg,
                      rgba(139, 92, 246, 1),
                      rgba(236, 72, 153, 1),
                      rgba(6, 182, 212, 1))`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    textShadow: '0 0 40px rgba(139, 92, 246, 0.5)'
                  }}
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  Revo Rahmat
                </motion.h1>

                <motion.p
                  className="text-slate-300 text-xl md:text-2xl font-medium"
                  animate={{
                    opacity: [0.7, 1, 0.7],
                    y: [0, -2, 0]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  Full-Stack Developer & AI Engineer
                </motion.p>
              </motion.div>

              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="mt-12 space-y-6"
              >
                <div className="relative">
                  <div
                    className="relative w-full h-3 rounded-full overflow-hidden border border-white/20"
                    style={{
                      background: `rgba(0, 0, 0, 0.4)`,
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    <motion.div
                      className="h-full rounded-full relative"
                      style={{
                        width: `${progress}%`,
                        background: `linear-gradient(90deg,
                          rgba(139, 92, 246, 0.9),
                          rgba(236, 72, 153, 0.9),
                          rgba(6, 182, 212, 0.9))`,
                        boxShadow: `0 0 20px rgba(139, 92, 246, 0.6)`
                      }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{
                          background: `linear-gradient(90deg,
                            transparent,
                            rgba(255, 255, 255, 0.6),
                            transparent)`,
                          backgroundSize: '100px 100%'
                        }}
                        animate={{ x: [-100, 400] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                          repeatDelay: 1
                        }}
                      />
                    </motion.div>
                  </div>

                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `linear-gradient(90deg,
                        rgba(139, 92, 246, 0.3),
                        rgba(6, 182, 212, 0.3))`,
                      filter: 'blur(10px)',
                      width: `${progress}%`
                    }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>

                <div className="flex justify-between items-center">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center gap-3"
                  >
                    <motion.span
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-2xl"
                    >
                      {loadingSteps[Math.floor((progress / 100) * loadingSteps.length)]?.emoji || '⚡'}
                    </motion.span>
                    <span className="text-slate-200 text-lg font-medium">
                      {currentStep}
                    </span>
                  </motion.div>

                  <motion.div
                    className="text-right"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <div className="text-2xl font-bold text-purple-400 font-mono">
                      {Math.round(progress)}%
                    </div>
                    <div className="text-xs text-slate-400">
                      Loading
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="flex justify-center space-x-3 mt-8"
              >
                {[0, 1, 2, 3, 4].map((i) => (
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
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </motion.div>

              <AnimatePresence>
                {showWelcome && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="mt-8 text-center"
                  >
                    <motion.div
                      className="text-xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 font-semibold"
                      animate={{
                        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      🚀 Launching incredible experience...
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {shouldEnableFullEffects && (
            <>
              <motion.div
                className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-purple-400/30"
                animate={{
                  borderColor: ['rgba(139, 92, 246, 0.3)', 'rgba(6, 182, 212, 0.5)', 'rgba(139, 92, 246, 0.3)']
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />

              <motion.div
                className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-cyan-400/30"
                animate={{
                  borderColor: ['rgba(6, 182, 212, 0.3)', 'rgba(236, 72, 153, 0.5)', 'rgba(6, 182, 212, 0.3)']
                }}
                transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
              />
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EpicLoadingScreen;
