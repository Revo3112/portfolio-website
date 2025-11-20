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
          transition={{ duration: 0.6 }} // Kurangi dari 0.8 ke 0.6
          className="flex-1 text-center md:text-left"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }} // Kurangi dari 0.2 ke 0.1
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
            transition={{ delay: 0.2 }} // Kurangi dari 0.4 ke 0.2
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
            transition={{ delay: 0.3 }} // Kurangi dari 0.6 ke 0.3
            className="text-gray-400 mb-8 max-w-2xl md:max-w-3xl mx-auto md:mx-0 text-lg md:text-xl leading-relaxed"
            style={{ wordBreak: "break-word" }}
          >
            Passionate Full-Stack Developer with expertise spanning AI/ML, Blockchain, and Database Optimization. I've successfully enhanced database performance by 25% and improved impact analysis accuracy by 90% using Large Language Models. As a dedicated mentor, I've guided 40+ students with an impressive 80% success rate in securing tech roles. Currently pursuing Computer Science at Universitas Pembangunan Jaya while actively contributing to the tech ecosystem as Founder of BASIC - a thriving blockchain community that has forged partnerships with industry leaders like Manta, Xellar, Lisk, Educhain, and Mancer.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }} // Kurangi dari 0.8 ke 0.4
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
          transition={{ duration: 0.6 }} // Kurangi dari 0.8 ke 0.6
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

            {/* Tech Stack Icons - Sesuai dengan expertise Revo */}

            {/* React/JavaScript - Frontend Development */}
            <motion.div
              animate={{ y: [0, -8, 0], rotate: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center shadow-xl border border-blue-400/40"
            >
              {/* React Icon */}
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="2"/>
                <path d="M12 1a11 11 0 0 1 0 22 11 11 0 0 1 0-22zm0 2a9 9 0 0 0 0 18 9 9 0 0 0 0-18z"/>
                <path d="M12 8.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <path d="M12 1C7.5 1 4 4.5 4 9s8 4 8 4 8-.5 8-4-4.5-8-8-8z" opacity="0.3"/>
              </svg>
            </motion.div>

            {/* Database/SQL - Database Optimization Expert */}
            <motion.div
              animate={{ y: [0, 8, 0], x: [0, -4, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-3 -left-3 w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-xl border border-green-400/40"
            >
              {/* Database Icon */}
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <ellipse cx="12" cy="5" rx="9" ry="3"/>
                <path d="M3 5v14c0 1.657 4.03 3 9 3s9-1.343 9-3V5"/>
                <path d="M3 12c0 1.657 4.03 3 9 3s9-1.343 9-3"/>
              </svg>
            </motion.div>

            {/* AI/ML - Machine Learning & VISTA Project */}
            <motion.div
              animate={{ x: [-4, 4, -4], rotate: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 -left-4 w-11 h-11 bg-gradient-to-r from-purple-500 to-violet-600 rounded-xl flex items-center justify-center shadow-xl border border-purple-400/40"
            >
              {/* AI/Brain Icon */}
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.07 2.07 0 0 1-2.44-2.44 2.07 2.07 0 0 1-2.44-2.44 2.07 2.07 0 0 1-2.44-2.44A2.5 2.5 0 0 1 2.5 9.5z"/>
                <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.07 2.07 0 0 0 2.44-2.44 2.07 2.07 0 0 0 2.44-2.44 2.07 2.07 0 0 0 2.44-2.44A2.5 2.5 0 0 0 21.5 9.5z"/>
                <circle cx="12" cy="12" r="1"/>
                <path d="M8 12h8"/>
                <path d="M12 8v8"/>
              </svg>
            </motion.div>

            {/* Blockchain - BASIC Community Founder */}
            <motion.div
              animate={{ scale: [1, 1.15, 1], rotate: [0, 15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-8 -right-8 w-10 h-10 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl flex items-center justify-center shadow-xl border border-orange-400/40"
            >
              {/* Blockchain/Link Icon */}
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <rect x="3" y="3" width="6" height="6" rx="1"/>
                <rect x="15" y="3" width="6" height="6" rx="1"/>
                <rect x="3" y="15" width="6" height="6" rx="1"/>
                <rect x="15" y="15" width="6" height="6" rx="1"/>
                <path d="M9 6h6"/>
                <path d="M9 18h6"/>
                <path d="M6 9v6"/>
                <path d="M18 9v6"/>
              </svg>
            </motion.div>

            {/* Laravel/PHP - Backend Development */}
            <motion.div
              animate={{ y: [0, -6, 0], x: [0, 3, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-12 -right-6 w-10 h-10 bg-gradient-to-r from-red-500 to-rose-600 rounded-xl flex items-center justify-center shadow-xl border border-red-400/40"
            >
              {/* Laravel/Code Icon */}
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="16 18 22 12 16 6"/>
                <polyline points="8 6 2 12 8 18"/>
                <line x1="12" y1="2" x2="12" y2="22"/>
              </svg>
            </motion.div>

            {/* Embedded Systems/IoT - Arduino & Hardware */}
            <motion.div
              animate={{ rotate: [0, 20, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-16 -left-6 w-9 h-9 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-lg flex items-center justify-center shadow-xl border border-teal-400/40"
            >
              {/* Chip/Microcontroller Icon */}
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="4" y="4" width="16" height="16" rx="2"/>
                <rect x="8" y="8" width="8" height="8" rx="1"/>
                <path d="M2 8h2"/>
                <path d="M2 12h2"/>
                <path d="M2 16h2"/>
                <path d="M20 8h2"/>
                <path d="M20 12h2"/>
                <path d="M20 16h2"/>
                <path d="M8 2v2"/>
                <path d="M12 2v2"/>
                <path d="M16 2v2"/>
                <path d="M8 20v2"/>
                <path d="M12 20v2"/>
                <path d="M16 20v2"/>
              </svg>
            </motion.div>

            {/* Teaching/Mentoring - Academic Achievement */}
            <motion.div
              animate={{ y: [0, 5, 0], rotate: [0, -8, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-8 left-8 w-9 h-9 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-lg flex items-center justify-center shadow-xl border border-indigo-400/40"
            >
              {/* Graduation/Academic Icon */}
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                <path d="M6 12v5c3 3 9 3 12 0v-5"/>
              </svg>
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
