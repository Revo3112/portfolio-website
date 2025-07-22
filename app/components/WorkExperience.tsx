"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar, MapPin, Briefcase } from "lucide-react";

const WorkExperience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const experiences = [
    {
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
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Web Developer",
      company: "Universitas Pembangunan Jaya - P2M Team",
      location: "Tangerang, Indonesia",
      period: "May 2024 - Sep 2024",
      description: [
        "Developed and launched website for PAUD Khairani, improving online accessibility for 200+ parents and staff",
        "Integrated WhatsApp API, streamlining communication and enhancing response efficiency",
        "Created family-friendly website applying the 8 Golden Rules of UI Design",
      ],
      color: "from-cyan-500 to-blue-500",
    },
    {
      title: "Assistant Lecturer - Embedded Systems",
      company: "Universitas Pembangunan Jaya",
      location: "Tangerang, Indonesia",
      period: "Sep 2024 - Dec 2024",
      description: [
        "Taught Embedded Systems concepts to 40+ students using Arduino, Raspberry Pi, and microcontrollers",
        "Assisted students in developing IoT-based projects with sensor integration",
        "Evaluated 10+ student projects ensuring proper implementation of embedded computing principles",
      ],
      color: "from-green-500 to-teal-500",
    },
    {
      title: "Assistant Lecturer - Database Course",
      company: "Universitas Pembangunan Jaya",
      location: "Tangerang, Indonesia",
      period: "Feb 2024 - Jun 2024",
      description: [
        "Taught 40+ students per week in database design, normalization, and SQL query optimization",
        "Delivered practical guidance during lab sessions on SQL queries, ERD design, and database setup",
        "Executed 5+ unit and integration tests, improving query performance by 30%",
      ],
      color: "from-orange-500 to-red-500",
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
          <p className="text-purple-400 mb-2">WHAT I HAVE DONE SO FAR</p>
          <h2 className="text-4xl md:text-5xl font-bold">
            Work Experience<span className="gradient-text">.</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-500 to-cyan-500"></div>

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`relative flex items-center mb-12 ${
                index % 2 === 0 ? "md:justify-start" : "md:justify-end"
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-white rounded-full border-4 border-purple-500 z-10"></div>

              {/* Content card */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className={`glass-effect rounded-2xl p-6 ml-16 md:ml-0 ${
                  index % 2 === 0 ? "md:mr-auto md:ml-8" : "md:ml-auto md:mr-8"
                } max-w-xl hover-glow`}
              >
                <div className={`h-1 w-20 bg-gradient-to-r ${exp.color} mb-4 rounded-full`}></div>

                <h3 className="text-2xl font-bold mb-2">{exp.title}</h3>
                <p className="text-purple-400 font-medium mb-2">{exp.company}</p>

                <div className="flex items-center gap-4 text-gray-400 text-sm mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {exp.period}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {exp.location}
                  </span>
                </div>

                <ul className="space-y-2">
                  {exp.description.map((item, i) => (
                    <li key={i} className="text-gray-400 text-sm flex items-start">
                      <span className="text-purple-400 mr-2">▸</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkExperience;
