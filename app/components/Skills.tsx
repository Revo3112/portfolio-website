"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
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

// Individual Skill Card Component
function SkillCard({ skill, index }: { skill: typeof skillsData[0], index: number }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    window.open(skill.url, '_blank', 'noopener,noreferrer');
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    setMousePosition({ x: mouseX, y: mouseY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
  };

  // Calculate 3D rotation based on mouse position with enhanced sensitivity
  const rotateX = isHovered ? (mousePosition.y / 8) * -1 : 0;
  const rotateY = isHovered ? (mousePosition.x / 8) : 0;
  const translateZ = isHovered ? 60 : 0;
  const scale = isHovered ? 1.05 : 1;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        type: "spring",
        stiffness: 120
      }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative group cursor-pointer"
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d"
      }}
    >
      <motion.div
        className="relative w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28"
        animate={{
          rotateX,
          rotateY,
          z: translateZ,
          scale
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
          mass: 0.5
        }}
        style={{
          transformStyle: "preserve-3d",
          transformOrigin: "center center"
        }}
      >
        {/* Enhanced 3D glow effect */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 blur-xl scale-110"
          style={{
            backgroundColor: skill.color,
            boxShadow: `
              0 0 60px ${skill.color}40,
              0 20px 40px ${skill.color}30,
              0 0 120px ${skill.color}20
            `
          }}
        />

        {/* 3D Shadow effect */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-60 transition-all duration-500 blur-sm"
          style={{
            background: `linear-gradient(135deg, transparent 30%, ${skill.color}20 70%)`,
            transform: 'translateZ(-10px) translateY(4px)',
            filter: 'blur(8px)'
          }}
        />

        {/* Professional glass card with 3D depth */}
        <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-md border border-white/30 overflow-hidden transform-gpu transition-all duration-700 group-hover:border-white/60 group-hover:shadow-2xl group-hover:from-white/25 group-hover:to-white/10"
          style={{
            boxShadow: `
              inset 0 1px 0 rgba(255,255,255,0.2),
              inset 0 -1px 0 rgba(255,255,255,0.1),
              0 10px 30px rgba(0,0,0,0.3),
              0 0 0 1px rgba(255,255,255,0.1)
            `
          }}
        >
          {/* 3D Depth layers */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-tl from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          {/* Enhanced background gradient with depth */}
          <div
            className="absolute inset-0 opacity-15 group-hover:opacity-35 transition-all duration-700"
            style={{
              background: `
                radial-gradient(circle at 30% 30%, ${skill.color}60, transparent 50%),
                radial-gradient(circle at 70% 70%, ${skill.color}40, transparent 50%),
                linear-gradient(135deg, ${skill.color}20, transparent 70%)
              `
            }}
          />

          {/* Icon with professional 3D effects */}
          <div className="absolute inset-0 flex items-center justify-center">
            <skill.Icon
              className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 transform transition-all duration-700 group-hover:scale-110 group-hover:rotate-6 filter group-hover:drop-shadow-lg group-hover:brightness-110"
              style={{
                color: skill.color,
                filter: `drop-shadow(0 4px 8px ${skill.color}40)`
              }}
            />

            {/* Icon glow layer */}
            <skill.Icon
              className="absolute w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 opacity-0 group-hover:opacity-50 transition-all duration-700 group-hover:scale-125 blur-sm"
              style={{
                color: skill.color,
                filter: 'brightness(150%)'
              }}
            />
          </div>

          {/* Professional shine effect with multiple layers */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1200 ease-out" />
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          {/* Enhanced tooltip with 3D effect */}
          <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none z-50">
            <div className="relative">
              <div
                className="bg-black/90 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap backdrop-blur-sm border border-white/20 shadow-xl"
                style={{
                  boxShadow: `
                    0 10px 25px rgba(0,0,0,0.3),
                    0 0 0 1px rgba(255,255,255,0.1),
                    inset 0 1px 0 rgba(255,255,255,0.2)
                  `
                }}
              >
                {skill.name}
                {/* Tooltip arrow */}
                <div
                  className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black/90 border-l border-t border-white/20 rotate-45"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
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
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">
            Technical Arsenal
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed mb-8">
            Explore my technical skills organized by expertise areas. Click any icon to learn more about the technology.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
        </motion.div>

        {/* Skills Grid - Center Layout with Consistent Spacing */}
        <motion.div
          className="max-w-6xl mx-auto relative z-10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Responsive Flexbox Layout with Consistent Spacing */}
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 lg:gap-10">
            {skillsData.map((skill, index) => (
              <SkillCard key={skill.name} skill={skill} index={index} />
            ))}
          </div>
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
