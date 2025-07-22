"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Palette, Rocket } from "lucide-react";

const Overview = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const cards = [
    {
      icon: <Code2 className="w-8 h-8" />,
      title: "Full Stack Developer",
      description: "Expert in React, Laravel, Python, and modern web technologies",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "UI/UX Enthusiast",
      description: "Creating intuitive and beautiful user experiences",
      gradient: "from-cyan-500 to-blue-500",
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Blockchain Developer",
      description: "Building decentralized applications and smart contracts",
      gradient: "from-orange-500 to-red-500",
    },
  ];

  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Overview<span className="gradient-text">.</span>
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto">
            A passionate Full Stack Developer with over 2 years of hands-on experience in
            designing, developing, and deploying scalable applications. Proficient in modern
            web technologies, AI/ML integration, and blockchain development. Strong background
            in database optimization, mentoring, and creating innovative solutions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="glass-effect rounded-2xl p-8 hover-glow cursor-pointer"
            >
              <div
                className={`w-16 h-16 rounded-xl bg-gradient-to-r ${card.gradient} flex items-center justify-center text-white mb-6`}
              >
                {card.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{card.title}</h3>
              <p className="text-gray-400">{card.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16"
        >
          <div className="text-center">
            <h3 className="text-4xl font-bold gradient-text">40+</h3>
            <p className="text-gray-400 mt-2">Students Mentored</p>
          </div>
          <div className="text-center">
            <h3 className="text-4xl font-bold gradient-text">25%</h3>
            <p className="text-gray-400 mt-2">Database Performance Improved</p>
          </div>
          <div className="text-center">
            <h3 className="text-4xl font-bold gradient-text">90%</h3>
            <p className="text-gray-400 mt-2">Impact Analysis Accuracy</p>
          </div>
          <div className="text-center">
            <h3 className="text-4xl font-bold gradient-text">95%</h3>
            <p className="text-gray-400 mt-2">VISTA Precision Rate</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Overview;
