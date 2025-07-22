"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  // Skills organized by category - Clean and Professional
  const skillCategories = [
    {
      title: "AI & Machine Learning",
      gradient: "from-purple-500 to-pink-500",
      skills: [
        { name: "Python", emoji: "🐍" },
        { name: "TensorFlow", emoji: "🧠" },
        { name: "OpenAI", emoji: "🤖" },
        { name: "Groq API", emoji: "⚡" },
      ],
    },
    {
      title: "Frontend Development",
      gradient: "from-cyan-500 to-blue-500",
      skills: [
        { name: "React", emoji: "⚛️" },
        { name: "Next.js", emoji: "▲" },
        { name: "TypeScript", emoji: "📘" },
        { name: "Tailwind CSS", emoji: "🎨" },
      ],
    },
    {
      title: "Backend Development",
      gradient: "from-green-500 to-teal-500",
      skills: [
        { name: "Laravel", emoji: "🏗️" },
        { name: "Node.js", emoji: "🟢" },
        { name: "Express.js", emoji: "🚀" },
        { name: "PHP", emoji: "🐘" },
      ],
    },
    {
      title: "Database & Cloud",
      gradient: "from-orange-500 to-red-500",
      skills: [
        { name: "MySQL", emoji: "🗄️" },
        { name: "PostgreSQL", emoji: "🐘" },
        { name: "MongoDB", emoji: "🍃" },
        { name: "Redis", emoji: "🔴" },
      ],
    },
    {
      title: "Blockchain & Web3",
      gradient: "from-indigo-500 to-purple-500",
      skills: [
        { name: "Solidity", emoji: "⛓️" },
        { name: "Web3.js", emoji: "🌐" },
        { name: "Ethereum", emoji: "💎" },
        { name: "Smart Contracts", emoji: "📝" },
      ],
    },
    {
      title: "DevOps & Tools",
      gradient: "from-gray-500 to-slate-500",
      skills: [
        { name: "Git", emoji: "🔧" },
        { name: "Docker", emoji: "🐳" },
        { name: "Linux", emoji: "🐧" },
        { name: "VS Code", emoji: "💻" },
      ],
    },
  ];

  const softSkills = [
    "Problem Solving", "Team Leadership", "Database Optimization",
    "Mentoring", "Critical Thinking", "Communication",
    "Project Management", "Innovation"
  ];

  return (
    <section id="skills" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-purple-400 mb-2">WHAT I LEARNED SO FAR</p>
          <h2 className="text-4xl md:text-5xl font-bold">
            My Skills<span className="gradient-text">.</span>
          </h2>
        </motion.div>

        <div className="space-y-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
            >
              <div className="glass-effect rounded-2xl p-8 hover-glow">
                <div className="flex items-center mb-6">
                  <div className={`w-2 h-8 bg-gradient-to-b ${category.gradient} rounded-full mr-4`}></div>
                  <h3 className="text-2xl font-bold">{category.title}</h3>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skillIndex}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.5, delay: categoryIndex * 0.1 + skillIndex * 0.1 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="flex flex-col items-center p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 cursor-pointer group border border-white/10 hover:border-white/20"
                    >
                      <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                        {skill.emoji}
                      </div>
                      <span className="text-sm font-medium text-center group-hover:text-white transition-colors">
                        {skill.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Soft Skills */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold mb-6 text-center">Soft Skills</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {softSkills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 rounded-full text-sm font-medium hover:border-purple-400/50 transition-all duration-300 cursor-pointer"
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
