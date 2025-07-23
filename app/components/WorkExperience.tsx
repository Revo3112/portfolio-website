"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar, MapPin, Briefcase, ArrowRight } from "lucide-react";
import { useInView as useInViewObserver } from "react-intersection-observer";

const WorkExperience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const experiences = [
    {
      id: "01",
      title: "Fullstack Developer",
      company: "Maxy Academy",
      location: "Jakarta, Indonesia",
      period: "Sep 2024 - Jan 2025",
      description: [
        "Integrated AI-based Sustainable Development Goals recommendations, increasing impact indicator selection accuracy by 90%",
        "Optimized database performance, increasing query speed by 25% for faster data access",
        "Developed innovative financial insight features enabling quarterly reporting, improving investment strategies by 20%",
        "Built benchmarking system for startups to compare performance metrics with industry standards",
      ],
      color: "from-purple-600 to-pink-600",
      bgGradient: "from-purple-500/10 to-pink-500/10",
      borderColor: "border-purple-500/20",
      skills: ["React", "Node.js", "AI/ML", "PostgreSQL"],
    },
    {
      id: "02",
      title: "Web Developer",
      company: "Universitas Pembangunan Jaya - P2M Team",
      location: "Tangerang, Indonesia",
      period: "May 2024 - Sep 2024",
      description: [
        "Developed and launched website for PAUD Khairani, improving online accessibility for 200+ parents and staff",
        "Integrated WhatsApp API, streamlining communication and enhancing response efficiency",
        "Created family-friendly website applying the 8 Golden Rules of UI Design",
      ],
      color: "from-cyan-600 to-blue-600",
      bgGradient: "from-cyan-500/10 to-blue-500/10",
      borderColor: "border-cyan-500/20",
      skills: ["Next.js", "WhatsApp API", "UI/UX", "Responsive Design"],
    },
    {
      id: "03",
      title: "Assistant Lecturer - Embedded Systems",
      company: "Universitas Pembangunan Jaya",
      location: "Tangerang, Indonesia",
      period: "Sep 2024 - Dec 2024",
      description: [
        "Taught Embedded Systems concepts to 40+ students using Arduino, Raspberry Pi, and microcontrollers",
        "Assisted students in developing IoT-based projects with sensor integration",
        "Evaluated 10+ student projects ensuring proper implementation of embedded computing principles",
      ],
      color: "from-green-600 to-teal-600",
      bgGradient: "from-green-500/10 to-teal-500/10",
      borderColor: "border-green-500/20",
      skills: ["Arduino", "Raspberry Pi", "IoT", "Teaching"],
    },
    {
      id: "04",
      title: "Assistant Lecturer - Database Course",
      company: "Universitas Pembangunan Jaya",
      location: "Tangerang, Indonesia",
      period: "Feb 2024 - Jun 2024",
      description: [
        "Taught 40+ students per week in database design, normalization, and SQL query optimization",
        "Delivered practical guidance during lab sessions on SQL queries, ERD design, and database setup",
        "Executed 5+ unit and integration tests, improving query performance by 30%",
      ],
      color: "from-orange-600 to-red-600",
      bgGradient: "from-orange-500/10 to-red-500/10",
      borderColor: "border-orange-500/20",
      skills: ["SQL", "Database Design", "PostgreSQL", "Teaching"],
    },
  ];

  return (
    <section id="work" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-purple-400 mb-2 uppercase tracking-wider text-sm">Career Journey</p>
          <h2 className="text-4xl md:text-5xl font-bold">
            Work Experience<span className="gradient-text">.</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            My professional journey through various roles, showcasing growth and impact across different domains
          </p>
        </motion.div>

        <div className="grid gap-8 max-w-6xl mx-auto">
          {experiences.map((exp, index) => {
            const [cardRef, cardInView] = useInViewObserver({
              threshold: 0.1,
              triggerOnce: true,
            });

            return (
              <motion.div
                key={index}
                ref={cardRef}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={cardInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                {/* Card Container */}
                <div className={`relative bg-gradient-to-br ${exp.bgGradient} backdrop-blur-xl rounded-2xl border ${exp.borderColor} p-8 hover:border-opacity-50 transition-all duration-300`}>
                  {/* Hover Gradient Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${exp.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`} />

                  {/* Number Badge */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={cardInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                    className={`absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br ${exp.color} rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg`}
                  >
                    {exp.id}
                  </motion.div>

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Header */}
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
                        {exp.title}
                      </h3>
                      <p className="text-lg text-purple-400 font-medium mb-3">{exp.company}</p>

                      {/* Meta Info */}
                      <div className="flex flex-wrap items-center gap-4 text-gray-400 text-sm">
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
                      </div>
                    </div>

                    {/* Description */}
                    <ul className="space-y-3 mb-6">
                      {exp.description.map((item, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={cardInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ duration: 0.5, delay: index * 0.1 + i * 0.1 }}
                          className="text-gray-400 flex items-start group/item"
                        >
                          <ArrowRight className="w-4 h-4 mr-3 mt-0.5 text-purple-400 group-hover/item:text-purple-300 transition-colors" />
                          <span className="group-hover/item:text-gray-300 transition-colors">{item}</span>
                        </motion.li>
                      ))}
                    </ul>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={cardInView ? { opacity: 1, scale: 1 } : {}}
                          transition={{ duration: 0.3, delay: index * 0.1 + i * 0.05 }}
                          className={`px-3 py-1 text-xs font-medium bg-gradient-to-r ${exp.color} bg-opacity-10 text-purple-300 rounded-full border ${exp.borderColor} backdrop-blur-sm`}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-3xl" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-cyan-500/10 to-transparent rounded-full blur-2xl" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Timeline Connector */}
        <div className="absolute left-1/2 top-32 bottom-32 w-0.5 bg-gradient-to-b from-purple-500/20 via-cyan-500/20 to-purple-500/20 -translate-x-1/2 hidden lg:block" />
      </div>
    </section>
  );
};

export default WorkExperience;
