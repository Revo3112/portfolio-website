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
      gradient: "from-purple-600 to-purple-800",
      accentColor: "text-purple-400",
      borderColor: "border-purple-500/30",
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
        "Taught Embedded Systems concepts to 40+ students using Arduino, Raspberry Pi, and microcontrollers",
        "Assisted students in developing IoT-based projects with sensor integration",
        "Evaluated 10+ student projects ensuring proper implementation of embedded computing principles",
      ],
      skills: ["Arduino", "Raspberry Pi", "IoT", "Teaching"],
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
        "Taught 40+ students per week in database design, normalization, and SQL query optimization",
        "Delivered practical guidance during lab sessions on SQL queries, ERD design, and database setup",
        "Executed 5+ unit and integration tests, improving query performance by 30%",
      ],
      skills: ["SQL", "Database Design", "PostgreSQL", "Teaching"],
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

        {/* Timeline Container */}
        <div className="relative max-w-6xl mx-auto">
          {/* Vertical Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-purple-500/50 via-cyan-500/50 to-orange-500/50 hidden md:block"></div>

          {/* Experience Cards */}
          {experiences.map((exp, index) => {
            const [cardRef, cardInView] = useInViewObserver({
              threshold: 0.3,
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
                className={`relative flex items-center mb-16 ${
                  isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                } flex-col`}
              >
                {/* Timeline Node */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={cardInView ? { scale: 1 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.2 + 0.3,
                    type: "spring",
                    stiffness: 200
                  }}
                  className={`absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r ${exp.gradient} rounded-full border-4 border-background z-10 hidden md:block`}
                />

                {/* Card Content */}
                <div className={`w-full md:w-5/12 ${isLeft ? 'md:pr-16' : 'md:pl-16'}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={cardInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.4 }}
                    className="group relative"
                  >
                    {/* Card */}
                    <div className={`relative bg-white/5 backdrop-blur-sm rounded-2xl border ${exp.borderColor} p-6 transition-all duration-300 hover:bg-white/10 hover:border-opacity-60`}>
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className={`text-xl font-bold text-white`}>
                              {exp.title}
                            </h3>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              exp.status === 'Current'
                                ? 'bg-green-500/20 text-green-400'
                                : 'bg-gray-500/20 text-gray-400'
                            }`}>
                              {exp.status}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 mb-3">
                            <Building className="w-4 h-4 text-purple-400" />
                            <p className={`font-medium ${exp.accentColor}`}>
                              {exp.company}
                            </p>
                          </div>

                          {/* Meta Information */}
                          <div className="flex flex-wrap gap-4 text-gray-400 text-sm mb-4">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {exp.period}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {exp.location}
                            </span>
                          </div>
                        </div>

                        {/* Number Badge */}
                        <div className={`w-12 h-12 bg-gradient-to-r ${exp.gradient} rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                          {exp.id}
                        </div>
                      </div>

                      {/* Description */}
                      <ul className="space-y-2 mb-4">
                        {exp.description.slice(0, 2).map((item, i) => (
                          <li
                            key={i}
                            className="text-gray-300 flex items-start gap-2 text-sm"
                          >
                            <ExternalLink className="w-3 h-3 mt-0.5 text-purple-400 flex-shrink-0" />
                            <span className="leading-relaxed">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill, i) => (
                          <span
                            key={i}
                            className={`px-3 py-1 text-xs font-medium bg-gradient-to-r ${exp.gradient} bg-opacity-10 ${exp.accentColor} rounded-full border ${exp.borderColor} backdrop-blur-sm`}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Arrow pointing to timeline (desktop only) */}
                    <div className={`absolute top-1/2 transform -translate-y-1/2 w-0 h-0 hidden md:block ${
                      isLeft
                        ? 'right-0 translate-x-full border-l-8 border-l-white/10 border-y-8 border-y-transparent'
                        : 'left-0 -translate-x-full border-r-8 border-r-white/10 border-y-8 border-y-transparent'
                    }`} />
                  </motion.div>
                </div>

                {/* Empty space for the other side (desktop only) */}
                <div className="hidden md:block w-5/12" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};export default WorkExperience;
