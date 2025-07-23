"use client";

import dynamic from "next/dynamic";
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

// Dynamically import ThreeBackground to avoid SSR issues
const ThreeBackground = dynamic(() => import("./components/ThreeBackground"), {
  ssr: false,
});

export default function Home() {
  return (
    <SmoothScroll>
      <div className="relative min-h-screen overflow-x-hidden">
        {/* Loading Screen */}
        <LoadingScreen />

        <PerformanceOptimizer>
          {/* Scroll Progress Bar */}
          <ScrollProgress />

          {/* Cursor Blob Effect */}
          <CursorBlob />

          {/* Minimalist 3D Background */}
          <ThreeBackground />

          {/* Subtle gradient overlay */}
          <div className="fixed inset-0 bg-gradient-to-br from-background/80 via-transparent to-background-secondary/60 pointer-events-none z-0" />

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
