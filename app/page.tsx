// page.tsx - LCP OPTIMIZED VERSION
"use client";

import { Suspense, lazy } from "react";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import Overview from "./components/Overview";
import WorkExperience from "./components/WorkExperience";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import ContactModern from "./components/ContactModern"; // Updated to modern contact
import PerformanceOptimizer from "./components/PerformanceOptimizer";
import SmoothScroll from "./components/SmoothScroll";
import { useMobileOptimization } from "./hooks/useMobileOptimization";// Lazy load non-critical components untuk better LCP
const CursorBlob = lazy(() => import("./components/CursorBlob"));
const ScrollProgress = lazy(() => import("./components/ScrollProgress"));
const AnimatedBackground = lazy(() => import("./components/AnimatedBackground"));

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
        {/* Critical above-the-fold content - Render immediately */}
        {hasMounted && <Navigation />}

        <PerformanceOptimizer>
          {/* Hero section - Priority untuk LCP */}
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
              <ContactModern />
            </main>
          )}

          {/* Non-critical background components - Lazy loaded */}
          {hasMounted && (
            <Suspense fallback={null}>
              <AnimatedBackground />
              <ScrollProgress />
              {isDesktop && <CursorBlob />}
            </Suspense>
          )}
        </PerformanceOptimizer>
      </div>
    </SmoothScroll>
  );
}
