"use client";

import { Canvas } from "@react-three/fiber";
import { Float, PresentationControls, Environment, ContactShadows } from "@react-three/drei";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, Suspense } from "react";
import * as THREE from "three";
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiPhp,
  SiLaravel,
  SiPython,
  SiMysql,
  SiMongodb,
  SiGit,
  SiDocker,
  SiFigma,
  SiWordpress,
  SiSolidity,
  SiTensorflow,
  SiFlutter,
  SiDart,
  SiOracle
} from "react-icons/si";

// Skill data with official links - Based on CV HTML data
const skillsData = [
  // Frontend & Core Languages
  { name: "HTML", Icon: SiHtml5, color: "#E34F26", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
  { name: "CSS", Icon: SiCss3, color: "#1572B6", url: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
  { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
  { name: "TypeScript", Icon: SiTypescript, color: "#3178C6", url: "https://www.typescriptlang.org/" },

  // Frameworks & Libraries
  { name: "React", Icon: SiReact, color: "#61DAFB", url: "https://react.dev/" },
  { name: "Next.js", Icon: SiNextdotjs, color: "#000000", url: "https://nextjs.org/" },
  { name: "Node.js", Icon: SiNodedotjs, color: "#339933", url: "https://nodejs.org/" },

  // Backend
  { name: "PHP", Icon: SiPhp, color: "#777BB4", url: "https://www.php.net/" },
  { name: "Laravel", Icon: SiLaravel, color: "#FF2D20", url: "https://laravel.com/" },
  { name: "Python", Icon: SiPython, color: "#3776AB", url: "https://www.python.org/" },
  { name: "Java", Icon: SiOracle, color: "#007396", url: "https://www.oracle.com/java/" },

  // Databases
  { name: "MySQL", Icon: SiMysql, color: "#4479A1", url: "https://www.mysql.com/" },
  { name: "MongoDB", Icon: SiMongodb, color: "#47A248", url: "https://www.mongodb.com/" },

  // Mobile & Cross-platform
  { name: "Flutter", Icon: SiFlutter, color: "#02569B", url: "https://flutter.dev/" },
  { name: "Dart", Icon: SiDart, color: "#0175C2", url: "https://dart.dev/" },

  // Tools & Technologies
  { name: "Git", Icon: SiGit, color: "#F05032", url: "https://git-scm.com/" },
  { name: "Figma", Icon: SiFigma, color: "#F24E1E", url: "https://www.figma.com/" },
  { name: "WordPress", Icon: SiWordpress, color: "#21759B", url: "https://wordpress.org/" },

  // Emerging Tech
  { name: "Blockchain", Icon: SiSolidity, color: "#363636", url: "https://ethereum.org/" },
  { name: "AI/ML", Icon: SiTensorflow, color: "#FF6F00", url: "https://www.tensorflow.org/" }
];

// 3D Floating Icon Component
function FloatingIcon({ position, Icon, color, scale = 1 }: any) {
  return (
    <Float
      speed={1.5}
      rotationIntensity={0.5}
      floatIntensity={0.5}
      floatingRange={[-0.1, 0.1]}
    >
      <mesh position={position} scale={scale}>
        <boxGeometry args={[1.5, 1.5, 0.3]} />
        <meshStandardMaterial
          color={color}
          metalness={0.8}
          roughness={0.2}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
  );
}

// Individual Skill Card Component
function SkillCard({ skill, index }: { skill: typeof skillsData[0], index: number }) {
  const handleClick = () => {
    window.open(skill.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.05,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{
        scale: 1.05,
        rotateY: 5,
        z: 50
      }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className="relative group cursor-pointer"
      style={{ perspective: "1000px" }}
    >
      <div className="relative w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32">
        {/* Glow effect */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
          style={{ backgroundColor: skill.color }}
        />

        {/* Glass card */}
        <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 overflow-hidden transform-gpu transition-all duration-300 group-hover:border-white/40 group-hover:shadow-2xl">
          {/* Background gradient */}
          <div
            className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at center, ${skill.color}40, transparent 70%)`
            }}
          />

          {/* Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <skill.Icon
              size={48}
              style={{ color: skill.color }}
              className="transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12"
            />
          </div>

          {/* Shine effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="skills"
      ref={ref}
      className="py-20 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary/5 to-accent/5 rounded-full blur-3xl animate-spin-slow" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">
            Technical Arsenal
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Click any icon to explore the technology
          </p>
        </motion.div>

        {/* 3D Canvas Background */}
        <div className="absolute inset-0 pointer-events-none">
          <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={0.5} />
            <Suspense fallback={null}>
              <Environment preset="city" />
              {/* Floating particles */}
              {[...Array(20)].map((_, i) => (
                <Float
                  key={i}
                  speed={1 + Math.random() * 2}
                  rotationIntensity={Math.random()}
                  floatIntensity={Math.random()}
                >
                  <mesh position={[
                    (Math.random() - 0.5) * 20,
                    (Math.random() - 0.5) * 10,
                    (Math.random() - 0.5) * 10
                  ]}>
                    <sphereGeometry args={[0.05 + Math.random() * 0.1, 16, 16]} />
                    <meshStandardMaterial
                      color={`hsl(${Math.random() * 360}, 70%, 50%)`}
                      emissive={`hsl(${Math.random() * 360}, 70%, 50%)`}
                      emissiveIntensity={0.5}
                    />
                  </mesh>
                </Float>
              ))}
            </Suspense>
          </Canvas>
        </div>

        {/* Skills Grid */}
        <motion.div
          className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-4 md:gap-6 max-w-6xl mx-auto relative z-10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {skillsData.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} />
          ))}
        </motion.div>
      </div>

      {/* Custom styles */}
      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        .animate-spin-slow {
          animation: spin 20s linear infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        @keyframes spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
      `}</style>
    </section>
  );
};

export default Skills;
