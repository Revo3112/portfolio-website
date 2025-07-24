"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useMemo } from "react";
import { Calendar, MapPin, Briefcase, ExternalLink, Building } from "lucide-react";
import { useInView as useInViewObserver } from "react-intersection-observer";

const WorkExperience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const experiences = useMemo(() => [
    {
      id: "01",
      title: "Fullstack Developer",
      company: "Maxy Academy",
      location: "Jakarta, Indonesia",
      period: "Sep 2024 - Jan 2025",
      status: "Current",
      description: [
        "Integrating AI-based Sustainable Development Goals recommendations, increasing the accuracy of impact indicator selection by 90% for startups, and enhancing data-driven decision-making.",
        "Optimizing database performance, increasing query speed by 25% for faster and more efficient data access.",
        "Achieving innovative financial insight features that enable quarterly reporting, empowering investors to make informed decisions and improving overall investment strategies by 20%.",
        "Developing a benchmarking system that allows startups to compare performance metrics with industry standards, enhancing strategic decision-making by 20%.",
      ],
      skills: ["React", "Node.js", "AI/ML", "PostgreSQL", "Full-Stack Development", "Database Optimization"],
      gradient: "from-purple-600 to-purple-800",
      accentColor: "text-purple-400",
      borderColor: "border-purple-500/30",
    },
    {
      id: "02",
      title: "Web Developer at P2M Team",
      company: "Universitas Pembangunan Jaya",
      location: "Tangerang, Indonesia",
      period: "May 2024 - Sep 2024",
      status: "Completed",
      description: [
        "Developed and launched a website for PAUD Khairani, integrating 4+ facilities, improving online accessibility, and enhancing communication for 200+ parents and staff.",
        "Integrated WhatsApp API, streamlining communication and enhancing response efficiency for 200+ parents and staff.",
        "Created a family-friendly website by applying the 8 Golden Rules of UI Design, ensuring an intuitive and accessible experience.",
      ],
      skills: ["Next.js", "WhatsApp API", "UI/UX", "Responsive Design", "Frontend Development"],
      gradient: "from-cyan-600 to-cyan-800",
      accentColor: "text-cyan-400",
      borderColor: "border-cyan-500/30",
    },
    {
      id: "03",
      title: "Assistant Lecturer - Embedded Systems",
      company: "Universitas Pembangunan Jaya",
      location: "Tangerang, Indonesia",
      period: "Sep 2024 - Dec 2024",
      status: "Completed",
      description: [
        "Taught Embedded Systems concepts, guiding 40+ students in hardware-software integration using Arduino, Raspberry Pi, and microcontrollers.",
        "Assisted students in developing IoT-based projects, optimizing sensor integration and real-time data processing.",
        "Evaluated 10+ student projects, ensuring proper implementation of embedded computing principles and real-world applications.",
      ],
      skills: ["Arduino", "Raspberry Pi", "IoT", "Teaching", "Embedded Systems", "Microcontrollers"],
      gradient: "from-emerald-600 to-emerald-800",
      accentColor: "text-emerald-400",
      borderColor: "border-emerald-500/30",
    },
    {
      id: "04",
      title: "Assistant Lecturer - Database Course",
      company: "Universitas Pembangunan Jaya",
      location: "Tangerang, Indonesia",
      period: "Feb 2024 - Jun 2024",
      status: "Completed",
      description: [
        "Taught 40+ students per week in database design, normalization, and SQL query optimization, improving their practical application skills.",
        "Delivered practical guidance during lab sessions, assisting students with SQL queries, ERD design, and database setup to strengthen analytical and technical troubleshooting abilities.",
        "Executed 5+ unit and integration tests on student database projects, enhancing data integrity, optimizing indexing efficiency, and improving query performance by 30%.",
      ],
      skills: ["SQL", "Database Design", "PostgreSQL", "Teaching", "ERD Design", "Database Testing"],
      gradient: "from-orange-600 to-orange-800",
      accentColor: "text-orange-400",
      borderColor: "border-orange-500/30",
    },
  ], []);

  return (
    <section id="work" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        {/* Header Section */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-purple-400 mb-4 uppercase tracking-wider text-sm font-medium"
          >
            WHAT I HAVE DONE SO FAR
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Work Experience<span className="gradient-text">.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed"
          >
            Following projects showcases my professional journey through various roles, showcasing growth and impact across different domains in technology and education.
          </motion.p>
        </motion.div>

        {/* Timeline Container - CLEAN POSITIONING */}
        <div className="relative max-w-none mx-auto">
          {/* Vertical Timeline Line - EXACT CENTER */}
          <div
            className="absolute w-0.5 h-full bg-gradient-to-b from-purple-500/50 via-cyan-500/50 to-orange-500/50 hidden md:block"
            style={{
              left: '50%',
              transform: 'translateX(-1px)', // Matching the exact positioning
              zIndex: 1
            }}
          ></div>

          {/* Experience Cards */}
          {experiences.map((exp, index) => {
            const [cardRef, cardInView] = useInViewObserver({
              threshold: 0.2,
              triggerOnce: true,
            });

            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={exp.id}
                ref={cardRef}
                initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
                animate={cardInView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: index * 0.2,
                  ease: "easeOut"
                }}
                className={`relative flex items-start mb-20 ${
                  isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                } flex-col`}
              >
                {/* Timeline Node - PERFECTLY ALIGNED WITH VERTICAL LINE */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={cardInView ? { scale: 1 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.2 + 0.3,
                    type: "spring",
                    stiffness: 200
                  }}
                  className={`bg-gradient-to-r ${exp.gradient} rounded-full border-4 border-background shadow-lg hidden md:block gpu-optimized`}
                  style={{
                    position: 'absolute',
                    width: '40px',
                    height: '40px',
                    left: 'calc(50% - 21px)', // More explicit calculation: 50% - 1px (line offset) - 20px (half circle)
                    top: '140px',
                    transform: 'none', // Remove transform to avoid conflicts
                    zIndex: 10,
                    margin: '0',
                    padding: '0',
                    boxShadow: `0 0 20px ${exp.gradient.includes('purple') ? 'rgba(139, 92, 246, 0.4)' :
                                         exp.gradient.includes('cyan') ? 'rgba(6, 182, 212, 0.4)' :
                                         exp.gradient.includes('emerald') ? 'rgba(16, 185, 129, 0.4)' :
                                         'rgba(251, 146, 60, 0.4)'}`
                  }}
                />

                {/* Card Content - NO INTERFERENCE */}
                <div className={`w-full md:w-5/12 ${isLeft ? 'md:pr-8' : 'md:pl-8'}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={cardInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.4 }}
                    className="group relative"
                  >
                    {/* Card - ENHANCED DESIGN WITH BALANCED SIZE */}
                    <div className={`relative glass-effect rounded-3xl border ${exp.borderColor} p-8 transition-all duration-500 hover:bg-white/10 hover:border-opacity-80 hover:shadow-2xl min-h-[550px] group-hover:scale-[1.02] gpu-optimized perspective-1000`}
                         style={{
                           background: 'rgba(255, 255, 255, 0.03)',
                           backdropFilter: 'blur(20px)',
                           WebkitBackdropFilter: 'blur(20px)',
                           boxShadow: `0 8px 32px ${exp.gradient.includes('purple') ? 'rgba(139, 92, 246, 0.1)' :
                                               exp.gradient.includes('cyan') ? 'rgba(6, 182, 212, 0.1)' :
                                               exp.gradient.includes('emerald') ? 'rgba(16, 185, 129, 0.1)' :
                                               'rgba(251, 146, 60, 0.1)'}`
                         }}>
                      {/* Header - BALANCED STYLING */}
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-3">
                            <h3 className="text-2xl lg:text-3xl font-bold text-white leading-tight">
                              {exp.title}
                            </h3>
                          </div>

                          <div className="flex items-center gap-3 mb-4">
                            <div className={`p-2 rounded-xl bg-gradient-to-r ${exp.gradient} bg-opacity-20`}>
                              <Building className="w-5 h-5 text-white" />
                            </div>
                            <p className={`font-semibold text-lg ${exp.accentColor}`}>
                              {exp.company}
                            </p>
                          </div>

                          {/* Meta Information - BALANCED */}
                          <div className="flex flex-wrap gap-6 text-gray-300 text-sm mb-6">
                            <span className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-purple-400" />
                              <span className="font-medium">{exp.period}</span>
                            </span>
                            <span className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-cyan-400" />
                              <span className="font-medium">{exp.location}</span>
                            </span>
                          </div>
                        </div>

                        {/* Number Badge - BALANCED SIZE */}
                        <div className={`w-14 h-14 bg-gradient-to-r ${exp.gradient} rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-2xl transform hover:scale-110 transition-all duration-300 gpu-optimized`}
                             style={{
                               boxShadow: `0 8px 25px ${exp.gradient.includes('purple') ? 'rgba(139, 92, 246, 0.4)' :
                                                   exp.gradient.includes('cyan') ? 'rgba(6, 182, 212, 0.4)' :
                                                   exp.gradient.includes('emerald') ? 'rgba(16, 185, 129, 0.4)' :
                                                   'rgba(251, 146, 60, 0.4)'}`
                             }}>
                          {exp.id}
                        </div>
                      </div>

                      {/* Description - BALANCED LAYOUT */}
                      <div className="mb-6">
                        <h4 className="text-white font-bold mb-4 text-lg flex items-center gap-3">
                          <div className={`w-6 h-6 rounded-lg bg-gradient-to-r ${exp.gradient} bg-opacity-20 flex items-center justify-center`}>
                            <ExternalLink className="w-3 h-3 text-white" />
                          </div>
                          Key Achievements:
                        </h4>
                        <ul className="space-y-4">
                          {exp.description.map((item, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -20 }}
                              animate={cardInView ? { opacity: 1, x: 0 } : {}}
                              transition={{ delay: 0.1 * i + 0.5 }}
                              className="text-gray-200 flex items-start gap-3 text-base md:text-lg lg:text-xl leading-relaxed hover:text-white transition-colors duration-300"
                            >
                              <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${exp.gradient} bg-opacity-30 flex items-center justify-center mt-1 flex-shrink-0`}>
                                <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                              </div>
                              <span className="leading-relaxed font-medium">
                                {item}
                              </span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      {/* Skills - BALANCED DESIGN */}
                      <div>
                        <h4 className="text-white font-bold mb-3 text-sm flex items-center gap-2">
                          <div className={`w-6 h-6 rounded-lg bg-gradient-to-r ${exp.gradient} bg-opacity-20 flex items-center justify-center`}>
                            <Briefcase className="w-3 h-3 text-white" />
                          </div>
                          Technologies & Skills:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {exp.skills.map((skill, i) => (
                            <motion.span
                              key={i}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={cardInView ? { opacity: 1, scale: 1 } : {}}
                              transition={{ delay: 0.1 * i + 0.7 }}
                              className={`px-3 py-2 text-xs font-semibold bg-gradient-to-r ${exp.gradient} bg-opacity-15 ${exp.accentColor} rounded-lg border ${exp.borderColor} backdrop-blur-sm transition-all duration-300 hover:bg-opacity-25 hover:scale-105 cursor-default gpu-optimized`}
                              style={{
                                boxShadow: `0 4px 15px ${exp.gradient.includes('purple') ? 'rgba(139, 92, 246, 0.1)' :
                                                    exp.gradient.includes('cyan') ? 'rgba(6, 182, 212, 0.1)' :
                                                    exp.gradient.includes('emerald') ? 'rgba(16, 185, 129, 0.1)' :
                                                    'rgba(251, 146, 60, 0.1)'}`
                              }}
                            >
                              {skill}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Arrow pointing to timeline - PERFECT ALIGNMENT */}
                    <div className={`absolute w-0 h-0 hidden md:block transition-all duration-300 ${
                      isLeft
                        ? 'right-0 border-l-12 border-l-white/15 border-y-12 border-y-transparent hover:border-l-white/25'
                        : 'left-0 border-r-12 border-r-white/15 border-y-12 border-y-transparent hover:border-r-white/25'
                    }`} style={{
                      top: '140px',
                      transform: `translateY(-50%) ${isLeft ? 'translateX(100%)' : 'translateX(-100%)'}`,
                      filter: `drop-shadow(0 0 8px ${exp.gradient.includes('purple') ? 'rgba(139, 92, 246, 0.3)' :
                                                 exp.gradient.includes('cyan') ? 'rgba(6, 182, 212, 0.3)' :
                                                 exp.gradient.includes('emerald') ? 'rgba(16, 185, 129, 0.3)' :
                                                 'rgba(251, 146, 60, 0.3)'})`
                    }} />
                  </motion.div>
                </div>

                {/* Empty space for the other side - CLEAN */}
                <div className="hidden md:block w-5/12" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WorkExperience;
