// page.tsx - UPDATED WITH FIXED COMPONENTS
"use client";

import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import Overview from "./components/Overview";
import WorkExperience from "./components/WorkExperience";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import CursorBlob from "./components/CursorBlob";
import ScrollProgress from "./components/ScrollProgress";
import EpicLoadingScreen from "./components/LoadingScreen"; // Updated import
import PerformanceOptimizer from "./components/PerformanceOptimizer";
import SmoothScroll from "./components/SmoothScroll";
import AnimatedBackground from "./components/AnimatedBackground";
import { useMobileOptimization } from "./hooks/useMobileOptimization";

export default function Home() {
  const { isMobile, isDesktop, shouldReduceEffects, shouldEnableFullEffects, deviceType } = useMobileOptimization();

  // Debug logging to help track device detection
  if (typeof window !== 'undefined') {
    console.log('Device Detection Debug:', {
      deviceType,
      isMobile,
      isDesktop,
      shouldReduceEffects,
      shouldEnableFullEffects,
      screenWidth: window.innerWidth,
      userAgent: navigator.userAgent.substring(0, 100) + '...'
    });
  }

  return (
    <SmoothScroll>
      <div className="relative min-h-screen overflow-x-hidden">
        {/* Epic Loading Screen - Now properly differentiated by device */}
        <EpicLoadingScreen />

        <PerformanceOptimizer>
          {/* Enhanced Animated Background - Now with proper 3D-like effects */}
          <AnimatedBackground />

          {/* Scroll Progress Bar - Always show but adapt style */}
          <ScrollProgress />

          {/* Cursor Blob - Desktop only */}
          {isDesktop && <CursorBlob />}

          {/* Navigation */}
          <Navigation />

          {/* Main Content with proper optimization classes */}
          <main
            className={`relative z-10 ${
              isMobile ? 'mobile-optimized' :
              shouldEnableFullEffects ? 'performance-optimized gpu-accelerated' :
              ''
            }`}
          >
            <Hero />
            <Overview />
            <WorkExperience />
            <Skills />
            <Projects />
            <Contact />
          </main>

          {/* Device-specific optimizations indicator (remove in production) */}
          {process.env.NODE_ENV === 'development' && (
            <div className="fixed bottom-4 left-4 z-50 p-2 bg-black/80 text-white text-xs rounded font-mono">
              <div>Device: {deviceType}</div>
              <div>Screen: {typeof window !== 'undefined' ? window.innerWidth : 'N/A'}px</div>
              <div>Effects: {shouldEnableFullEffects ? 'Full' : shouldReduceEffects ? 'Reduced' : 'Standard'}</div>
            </div>
          )}
        </PerformanceOptimizer>
      </div>
    </SmoothScroll>
  );
}
