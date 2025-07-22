"use client";

import dynamic from "next/dynamic";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import Overview from "./components/Overview";
import WorkExperience from "./components/WorkExperience";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

// Dynamically import ThreeBackground to avoid SSR issues
const ThreeBackground = dynamic(() => import("./components/ThreeBackground"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <ThreeBackground />
      <Navigation />
      <main className="relative z-10">
        <Hero />
        <Overview />
        <WorkExperience />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </>
  );
}
