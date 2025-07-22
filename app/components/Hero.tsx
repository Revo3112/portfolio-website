"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { ChevronDown } from "lucide-react";

const Hero = () => {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative pt-20 gpu-optimized">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center md:text-left"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-4 text-shadow">
              Hi, I'm{" "}
              <span className="gradient-text">Revo Rahmat</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <TypeAnimation
              sequence={[
                "Full-Stack Developer",
                2000,
                "AI & Machine Learning Engineer",
                2000,
                "Blockchain Developer",
                2000,
                "Database Optimization Expert",
                2000,
                "Embedded Systems Developer",
                2000,
                "BASIC Community Founder",
                2000,
                "PKM-KC VISTA Creator",
                2000,
              ]}
              wrapper="p"
              speed={50}
              className="text-xl md:text-2xl text-gray-300"
              repeat={Infinity}
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-gray-400 mb-8 max-w-lg mx-auto md:mx-0"
          >
            Full-Stack Developer skilled in React, Laravel, Python, SQL, and JavaScript.
            Improved database performance by 25% and impact analysis accuracy by 90% using LLMs.
            Mentored 40+ students, with 80% securing tech roles. Founded BASIC, organizing blockchain hackathons.
            Secured PKM-KC funding for VISTA, an AI-driven object-tracking system with 95% precision.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap gap-4 justify-center md:justify-start"
          >
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-full font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-shadow duration-300 cursor-interactive"
            >
              Get In Touch
            </motion.a>
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border border-purple-500 text-purple-400 rounded-full font-medium hover:bg-purple-500/10 transition-colors duration-300 cursor-interactive"
            >
              View Projects
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Image/Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="relative w-80 h-80 mx-auto">
            {/* Animated background circles */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1.2, 1, 1.2],
                rotate: [360, 180, 0],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-2xl"
            />

            {/* Profile Image */}
            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-purple-500/30 bg-gradient-to-br from-purple-900/20 to-cyan-900/20 backdrop-blur-sm">
              <Image
                src="/images/profile.jpg"
                alt="Revo Rahmat"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Professional Tech Stack Icons */}
            <motion.div
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg border border-blue-400/30"
            >
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.36-.034-.47 0-.92.014-1.36.034.44-.572.895-1.096 1.36-1.564zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.866.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.36.034.47 0 .92-.014 1.36-.034-.44.572-.895 1.095-1.36 1.56-.455-.467-.91-.991-1.36-1.56z"/>
              </svg>
            </motion.div>

            <motion.div
              animate={{
                y: [0, 8, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -bottom-3 -left-3 w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center shadow-lg border border-green-400/30"
            >
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.017,2.011A10.009,10.009,0,0,0,2.011,12.017,9.885,9.885,0,0,0,12.017,21.989,10.009,10.009,0,0,0,22.023,12.017,9.885,9.885,0,0,0,12.017,2.011ZM19.26,9.972a7.984,7.984,0,0,1,.549,2.832,14.314,14.314,0,0,0-3.7-.557c-.119-2.075-.548-3.968-1.22-5.357A8.02,8.02,0,0,1,19.26,9.972ZM12.017,4.011a7.99,7.99,0,0,1,2.1.284c.575,1.212.937,2.818,1.041,4.593a11.5,11.5,0,0,0-3.141-.43,11.5,11.5,0,0,0-3.141.43c.1-1.775.466-3.381,1.041-4.593A7.99,7.99,0,0,1,12.017,4.011Zm-5.388,2.89c-.672,1.389-1.1,3.282-1.22,5.357a14.314,14.314,0,0,0-3.7.557,7.984,7.984,0,0,1,.549-2.832A8.02,8.02,0,0,1,6.629,6.9ZM4.763,14.2a12.266,12.266,0,0,1,3.193-.481,19.5,19.5,0,0,0,.764,4.651A8.015,8.015,0,0,1,4.763,14.2Zm7.254,6.789a8.012,8.012,0,0,1-1.574-.158,17.51,17.51,0,0,1-.7-4.246,11.5,11.5,0,0,1,2.274-.43,11.5,11.5,0,0,1,2.274.43,17.51,17.51,0,0,1-.7,4.246A8.012,8.012,0,0,1,12.017,20.989Zm7.256-6.789a8.015,8.015,0,0,1-3.957,4.167,19.5,19.5,0,0,0,.764-4.651A12.266,12.266,0,0,1,19.273,14.2Z"/>
              </svg>
            </motion.div>

            <motion.div
              animate={{
                x: [-4, 4, -4],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-1/2 -left-4 w-9 h-9 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center shadow-lg border border-yellow-400/30"
            >
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M0 0v24h24V0H0zm19.54 6.833c.14.433.194.957.194 1.593 0 .456-.097.973-.194 1.543-.291 1.708-1.165 2.872-2.621 3.493-1.553.66-3.738.66-6.559.66H6.835v3.689H3.301V4.22h7.534c2.621 0 4.613.317 5.971.951 1.358.635 2.234 1.553 2.234 2.662zm-3.689.972c0-.78-.438-1.165-1.31-1.165H6.835v2.574h7.457c1.02 0 1.553-.417 1.553-1.409h.005z"/>
              </svg>
            </motion.div>

            <motion.div
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-8 -right-8 w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg border border-purple-400/30"
            >
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0l1.09 3.36L16 3.36l-2.32 2.32.8 3.29L12 6.54l-2.48 2.43.8-3.29L8 3.36l2.91 0L12 0zM16 19h8v2h-8v-2zm-4-4h12v2H12v-2zm-4-4h16v2H8v-2z"/>
              </svg>
            </motion.div>

            <motion.div
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute bottom-8 -right-8 w-8 h-8 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-lg flex items-center justify-center shadow-lg border border-teal-400/30"
            >
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C7.666,17.818,9.027,19.2,12.001,19.2c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"/>
              </svg>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-8 h-8 text-gray-400" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
