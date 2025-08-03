// page.tsx - COMPLETE HYDRATION-SAFE VERSION
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
import PerformanceOptimizer from "./components/PerformanceOptimizer";
import SmoothScroll from "./components/SmoothScroll";
import AnimatedBackground from "./components/AnimatedBackground";
import { useMobileOptimization } from "./hooks/useMobileOptimization";

export default function Home() {
  const {
    isMobile,
    isDesktop,
    shouldReduceEffects,
    shouldEnableFullEffects,
    deviceType,
    hasMounted
  } = useMobileOptimization();

  return (
    <SmoothScroll>
      <div className="relative min-h-screen overflow-x-hidden">
        <PerformanceOptimizer>
          {/* Enhanced Animated Background - Only render when ready */}
          {hasMounted && <AnimatedBackground />}

          {/* Scroll Progress Bar */}
          {hasMounted && <ScrollProgress />}

          {/* Cursor Blob - Desktop only */}
          {hasMounted && isDesktop && <CursorBlob />}

          {/* Navigation */}
          {hasMounted && <Navigation />}

          {/* Main Content */}
          {hasMounted && (
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
          )}

          {/* Debug indicator - only in development */}
          {process.env.NODE_ENV === 'development' && hasMounted && (
            <div className="fixed bottom-4 left-4 z-50 p-2 bg-black/80 text-white text-xs rounded font-mono">
              <div>Device: {deviceType}</div>
              <div>Screen: {window.innerWidth}px</div>
              <div>Effects: {shouldEnableFullEffects ? 'Full' : shouldReduceEffects ? 'Reduced' : 'Standard'}</div>
            </div>
          )}
        </PerformanceOptimizer>
      </div>
    </SmoothScroll>
  );
}
