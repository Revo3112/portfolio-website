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
import AnimatedBackground from "./components/AnimatedBackground";

export default function Home() {
  return (
    <SmoothScroll>
      <div className="relative min-h-screen overflow-x-hidden">
        {/* Loading Screen */}
        <LoadingScreen />

        <PerformanceOptimizer>
          {/* Animated Background */}
          <AnimatedBackground />

          {/* Scroll Progress Bar */}
          <ScrollProgress />

          {/* Cursor Blob Effect - Simplified */}
          <CursorBlob />

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
