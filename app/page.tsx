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
import LoadingScreen from "./components/LoadingScreen";
import PerformanceOptimizer from "./components/PerformanceOptimizer";
import SmoothScroll from "./components/SmoothScroll";

export default function Home() {
  return (
    <SmoothScroll>
      <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-br from-background via-background-secondary/20 to-background">
        {/* Loading Screen */}
        <LoadingScreen />

        <PerformanceOptimizer>
          {/* Scroll Progress Bar */}
          <ScrollProgress />

          {/* Cursor Blob Effect - Simplified */}
          <CursorBlob />

          {/* Lightweight Background Elements */}
          <div className="fixed inset-0 pointer-events-none z-0">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-cyan-900/10 animate-pulse"
                 style={{ animationDuration: '8s' }} />

            {/* Static geometric patterns for visual interest */}
            <div className="absolute top-20 left-10 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-purple-500/3 to-transparent rounded-full" />
          </div>

          {/* Navigation */}
          <Navigation />

          {/* Main Content */}
          <main className="relative z-10">
            <Hero />
            <Overview />
            <WorkExperience />
            <Skills />
            <Projects />
            <Contact />
          </main>
        </PerformanceOptimizer>
      </div>
    </SmoothScroll>
  );
}
