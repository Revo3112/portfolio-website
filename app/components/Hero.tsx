"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { ChevronDown } from "lucide-react";

const Hero = () => {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative pt-20 gpu-optimized">
      <div className="container mx-auto px-6 flex flex-col md:flex-row gap-8 md:gap-12 items-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 text-center md:text-left"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-4 text-shadow">
              Hi, I'm{" "}
              <span className="gradient-text">Revo Rahmat</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <TypeAnimation
              sequence={[
                "Full-Stack Developer",
                2000,
                "AI & Machine Learning Engineer",
                2000,
                "Blockchain Developer",
                2000,
                "Database Optimization Expert",
                2000,
                "Embedded Systems Developer",
                2000,
                "BASIC Community Founder",
                2000,
                "PKM-KC VISTA Creator",
                2000,
              ]}
              wrapper="p"
              speed={50}
              className="text-xl md:text-2xl text-gray-300"
              repeat={Infinity}
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-gray-400 mb-8 max-w-2xl md:max-w-3xl mx-auto md:mx-0 text-lg md:text-xl leading-relaxed"
            style={{ wordBreak: "break-word" }}
          >
            Full-Stack Developer skilled in React, Next.js, AI/ML, Blockchain, and Database Optimization.<br />
            Improved database performance by 25% and impact analysis accuracy by 90% using LLMs.<br />
            Mentored 40+ students, with 80% securing tech roles. Founded BASIC, organizing blockchain hackathons.<br />
            Secured PKM-KC funding for VISTA, an AI-driven object-tracking system with 95% precision.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap gap-4 justify-center md:justify-start"
          >
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-full font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-shadow duration-300 cursor-interactive"
            >
              Get In Touch
            </motion.a>
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border border-purple-500 text-purple-400 rounded-full font-medium hover:bg-purple-500/10 transition-colors duration-300 cursor-interactive"
            >
              View Projects
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Image/Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex-1 flex items-center justify-center relative"
        >
          <div className="relative w-72 h-72 md:w-80 md:h-80 mx-auto">
            {/* Animated background circles */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1.2, 1, 1.2],
                rotate: [360, 180, 0],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-2xl"
            />

            {/* Profile Image */}
            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-purple-500/30 bg-gradient-to-br from-purple-900/20 to-cyan-900/20 backdrop-blur-sm">
              <Image
                src="/images/profile.jpg"
                alt="Revo Rahmat"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 320px, 320px"
                quality={85}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyg6bad2n7nWnl1kCHGe8QHqQX8/rWmOq2NeqAZxjVSdaT/2Q=="
              />
            </div>

            {/* Tech Stack Icons (AI, Next.js, Blockchain, Database, etc) */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg border border-blue-400/30"
            >
              {/* Next.js Icon */}
              <svg className="w-5 h-5 text-white" viewBox="0 0 32 32" fill="none"><path d="M16 0C7.163 0 0 7.163 0 16c0 8.837 7.163 16 16 16s16-7.163 16-16c0-8.837-7.163-16-16-16zm0 29.333C8.636 29.333 2.667 23.364 2.667 16S8.636 2.667 16 2.667 29.333 8.636 29.333 16 23.364 29.333 16 29.333z" fill="currentColor"/><path d="M21.333 10.667l-7.333 10.666h2.667l7.333-10.666h-2.667z" fill="currentColor"/></svg>
            </motion.div>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-3 -left-3 w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center shadow-lg border border-green-400/30"
            >
              {/* AI Icon */}
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/><path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            </motion.div>
            <motion.div
              animate={{ x: [-4, 4, -4] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 -left-4 w-9 h-9 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center shadow-lg border border-yellow-400/30"
            >
              {/* Blockchain Icon */}
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="2"/><rect x="14" y="3" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="2"/><rect x="14" y="14" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="2"/><rect x="3" y="14" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="2"/><path d="M7 7l10 10M17 7L7 17" stroke="currentColor" strokeWidth="2"/></svg>
            </motion.div>
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-8 -right-8 w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg border border-purple-400/30"
            >
              {/* Database Icon */}
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none"><ellipse cx="12" cy="5" rx="9" ry="3" stroke="currentColor" strokeWidth="2"/><path d="M3 5v14c0 1.657 4.03 3 9 3s9-1.343 9-3V5" stroke="currentColor" strokeWidth="2"/><path d="M3 12c0 1.657 4.03 3 9 3s9-1.343 9-3" stroke="currentColor" strokeWidth="2"/></svg>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-8 h-8 text-gray-400" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
