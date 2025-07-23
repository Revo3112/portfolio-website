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
        "Integrated AI-based Sustainable Development Goals recommendations, increasing impact indicator selection accuracy by 90%",
        "Optimized database performance, increasing query speed by 25% for faster data access",
        "Developed innovative financial insight features enabling quarterly reporting, improving investment strategies by 20%",
        "Built benchmarking system for startups to compare performance metrics with industry standards",
      ],
      skills: ["React", "Node.js", "AI/ML", "PostgreSQL"],
      gradient: "from-purple-600 via-purple-700 to-indigo-800",
      accentColor: "text-purple-400",
      borderColor: "border-purple-500/20 hover:border-purple-400/40",
    },
    {
      id: "02",
      title: "Web Developer",
      company: "Universitas Pembangunan Jaya - P2M Team",
      location: "Tangerang, Indonesia",
      period: "May 2024 - Sep 2024",
      status: "Completed",
      description: [
        "Developed and launched website for PAUD Khairani, improving online accessibility for 200+ parents and staff",
        "Integrated WhatsApp API, streamlining communication and enhancing response efficiency",
        "Created family-friendly website applying the 8 Golden Rules of UI Design",
      ],
      skills: ["Next.js", "WhatsApp API", "UI/UX", "Responsive Design"],
      gradient: "from-cyan-600 via-blue-700 to-indigo-800",
      accentColor: "text-cyan-400",
      borderColor: "border-cyan-500/20 hover:border-cyan-400/40",
    },
    {
      id: "03",
      title: "Assistant Lecturer - Embedded Systems",
      company: "Universitas Pembangunan Jaya",
      location: "Tangerang, Indonesia",
      period: "Sep 2024 - Dec 2024",
      status: "Completed",
      description: [
        "Taught Embedded Systems concepts to 40+ students using Arduino, Raspberry Pi, and microcontrollers",
        "Assisted students in developing IoT-based projects with sensor integration",
        "Evaluated 10+ student projects ensuring proper implementation of embedded computing principles",
      ],
      skills: ["Arduino", "Raspberry Pi", "IoT", "Teaching"],
      gradient: "from-emerald-600 via-green-700 to-teal-800",
      accentColor: "text-emerald-400",
      borderColor: "border-emerald-500/20 hover:border-emerald-400/40",
    },
    {
      id: "04",
      title: "Assistant Lecturer - Database Course",
      company: "Universitas Pembangunan Jaya",
      location: "Tangerang, Indonesia",
      period: "Feb 2024 - Jun 2024",
      status: "Completed",
      description: [
        "Taught 40+ students per week in database design, normalization, and SQL query optimization",
        "Delivered practical guidance during lab sessions on SQL queries, ERD design, and database setup",
        "Executed 5+ unit and integration tests, improving query performance by 30%",
      ],
      skills: ["SQL", "Database Design", "PostgreSQL", "Teaching"],
      gradient: "from-orange-600 via-red-700 to-pink-800",
      accentColor: "text-orange-400",
      borderColor: "border-orange-500/20 hover:border-orange-400/40",
    },
  ], []);

  return (
    <section id="work" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent" />
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" />

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
            My professional journey through various roles, showcasing growth and impact across different domains in technology and education.
          </motion.p>
        </motion.div>

        {/* Experience Cards */}
        <div className="space-y-8 max-w-5xl mx-auto">
          {experiences.map((exp, index) => {
            const [cardRef, cardInView] = useInViewObserver({
              threshold: 0.2,
              triggerOnce: true,
            });

            return (
              <motion.div
                key={exp.id}
                ref={cardRef}
                initial={{ opacity: 0, y: 60 }}
                animate={cardInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                  ease: "easeOut"
                }}
                className="group relative performance-optimized"
              >
                {/* Main Card */}
                <div className={`relative bg-white/5 backdrop-blur-xl rounded-2xl border ${exp.borderColor} transition-all duration-500 hover:bg-white/10 hover:transform hover:scale-[1.02]`}>
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${exp.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-all duration-500`} />

                  {/* Content Container */}
                  <div className="relative z-10 p-8">
                    {/* Header with Status Badge */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <motion.h3
                            initial={{ opacity: 0 }}
                            animate={cardInView ? { opacity: 1 } : {}}
                            transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                            className="text-2xl md:text-3xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 transition-all duration-300"
                          >
                            {exp.title}
                          </motion.h3>
                          <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                            exp.status === 'Current'
                              ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                              : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                          }`}>
                            {exp.status}
                          </span>
                        </div>

                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={cardInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                          className="flex items-center gap-2 mb-1"
                        >
                          <Building className="w-5 h-5 text-purple-400" />
                          <p className={`text-lg font-medium ${exp.accentColor}`}>
                            {exp.company}
                          </p>
                        </motion.div>

                        {/* Meta Information */}
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={cardInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
                          className="flex flex-wrap gap-6 text-gray-400 text-sm"
                        >
                          <span className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {exp.period}
                          </span>
                          <span className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            {exp.location}
                          </span>
                          <span className="flex items-center gap-2">
                            <Briefcase className="w-4 h-4" />
                            Full-time
                          </span>
                        </motion.div>
                      </div>

                      {/* Number Badge */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={cardInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{
                          duration: 0.5,
                          delay: index * 0.1 + 0.5,
                          type: "spring",
                          stiffness: 200
                        }}
                        className={`w-16 h-16 bg-gradient-to-br ${exp.gradient} rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
                      >
                        {exp.id}
                      </motion.div>
                    </div>

                    {/* Description */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={cardInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.6 }}
                      className="mb-6"
                    >
                      <ul className="space-y-3">
                        {exp.description.map((item, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={cardInView ? { opacity: 1, x: 0 } : {}}
                            transition={{
                              duration: 0.4,
                              delay: index * 0.1 + 0.7 + i * 0.1
                            }}
                            className="text-gray-300 flex items-start gap-3 group/item"
                          >
                            <ExternalLink className="w-4 h-4 mt-0.5 text-purple-400 group-hover/item:text-purple-300 transition-colors flex-shrink-0" />
                            <span className="group-hover/item:text-white transition-colors leading-relaxed">
                              {item}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>

                    {/* Skills */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={cardInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.8 }}
                      className="flex flex-wrap gap-2"
                    >
                      {exp.skills.map((skill, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={cardInView ? { opacity: 1, scale: 1 } : {}}
                          transition={{
                            duration: 0.3,
                            delay: index * 0.1 + 0.9 + i * 0.05,
                            type: "spring",
                            stiffness: 300
                          }}
                          className={`px-4 py-2 text-sm font-medium bg-gradient-to-r ${exp.gradient} bg-opacity-10 ${exp.accentColor} rounded-full border ${exp.borderColor.split(' ')[0]} backdrop-blur-sm hover:bg-opacity-20 transition-all duration-300 cursor-default`}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </motion.div>
                  </div>

                  {/* Decorative Glow Effects */}
                  <div className="absolute -top-1 -left-1 w-4 h-4 bg-purple-500 rounded-full blur-sm opacity-30" />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-cyan-500 rounded-full blur-sm opacity-30" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Decorative Timeline */}
        <div className="absolute left-1/2 top-32 bottom-20 w-px bg-gradient-to-b from-purple-500/30 via-cyan-500/30 to-purple-500/30 -translate-x-1/2 hidden lg:block" />
      </div>
    </section>
  );
};

export default WorkExperience;
