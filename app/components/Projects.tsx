"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { ExternalLink, Github, Star } from "lucide-react";

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const projects = [
    {
      title: "EduVerse",
      description: "Web3 educational platform with blockchain integration, smart contracts, and comprehensive development environment",
      image: "/images/Eduverse_logo.png",
      tags: ["Blockchain", "React Native", "Next.js", "Solidity", "Web3"],
      github: "https://github.com/Revo3112/EduVerse",
      featured: true,
      type: "Blockchain Education Platform"
    },
    {
      title: "EchoScribeAI",
      description: "Smart voice note creator with AI transcription and enhancement capabilities using Groq API",
      image: "/images/EchoScribeAI.png",
      tags: ["Python", "AI/ML", "Voice Recognition", "Groq API", "CustomTkinter"],
      github: "https://github.com/Revo3112/EchoScribeAI-SmartVoiceNoteCreator",
      featured: true,
      type: "AI Voice Processing"
    },
    {
      title: "Celengan",
      description: "Smart financial management desktop application for expense tracking and financial education",
      image: "/images/Github_Celengan_Banner.png",
      tags: ["Java", "Desktop App", "Financial Management", "UI/UX"],
      github: "https://github.com/Revo3112/Celengan",
      featured: true,
      type: "Financial Technology"
    },
    {
      title: "PetCare Assistant",
      description: "AI-powered pet breed identification with comprehensive care recommendations using ML models",
      image: "/images/PetRead.png",
      tags: ["Python", "TensorFlow", "Flask", "Computer Vision", "AI"],
      github: "https://github.com/Revo3112/pet-reader",
      type: "AI & Machine Learning"
    },
    {
      title: "Cloud HorizonOS",
      description: "Mobile AR operating system inspired by Apple Vision Pro, built with Unity and C#",
      image: "/images/Horizon OS.png",
      tags: ["C#", "Unity", "AR/VR", "Mobile Development"],
      github: "https://github.com/Revo3112/Cloud-HorizonOS",
      type: "AR/VR Development"
    },
    {
      title: "PetaSampah App",
      description: "Environmental sustainability app for waste tracking and community engagement",
      image: "/images/PetaSampah_logo.png",
      tags: ["Flutter", "Environmental Tech", "Mobile App", "Sustainability"],
      github: "https://github.com/Revo3112/PetaSampah-App",
      type: "Environmental Technology"
    },
    {
      title: "DuaHasa",
      description: "Interactive Japanese language learning application with multiplayer features",
      image: "/images/Duahasa.png",
      tags: ["Python", "Education", "Language Learning", "Interactive UI"],
      github: "https://github.com/Revo3112/DuaHasa",
      type: "Educational Technology"
    },
  ];

  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-purple-400 mb-2">MY WORK</p>
          <h2 className="text-4xl md:text-5xl font-bold">
            Projects<span className="gradient-text">.</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Following projects showcase my skills and experience through real-world examples
            of my work. Each project is briefly described with links to code repositories.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="glass-effect rounded-2xl overflow-hidden hover-glow group"
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {project.featured && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    Featured
                  </div>
                )}
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                <p className="text-gray-400 mb-4">{project.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="text-xs px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4">
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 rounded-lg text-gray-300 hover:text-white hover:border-purple-400/50 transition-all duration-300 cursor-interactive"
                  >
                    <Github className="w-4 h-4" />
                    View Code
                  </motion.a>
                  <div className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-medium text-purple-400">
                    {project.type}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-12"
        >
          <motion.a
            href="https://github.com/Revo3112"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-full font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-shadow duration-300"
          >
            <Github className="w-5 h-5" />
            View All Projects on GitHub
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
