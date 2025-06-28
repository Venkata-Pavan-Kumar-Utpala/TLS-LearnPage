import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useInViewport from "../hooks/useInViewport";

const HeroSection = () => {
  const navigate = useNavigate();
  const [titleRef, isTitleInViewport] = useInViewport();
  const [subtitleRef, isSubtitleInViewport] = useInViewport();
  const [descriptionRef, isDescriptionInViewport] = useInViewport();

  return (
    <motion.div
      className="relative z-10 bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border-b border-white/20 dark:border-gray-700/20 overflow-hidden pt-20"
      initial={{ filter: "blur(10px)" }}
      animate={{ filter: "blur(0px)" }}
      transition={{ duration: 1.2, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <motion.div
        className="container px-4 py-16 mx-auto max-w-6xl relative"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.0, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="flex items-center justify-center min-h-[600px]">
          {/* Centered Content */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.0, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative z-10 text-center max-w-4xl"
          >
            {/* Main headline with Poppins font */}
            <motion.h1
              className="font-poppins text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight mb-8 leading-[1.1]"
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <span
                ref={titleRef}
                className={`brand-heading-primary hover-gradient-text ${isTitleInViewport ? 'in-viewport' : ''}`}
              >
                Still struggling to code?
              </span>
              <br />
              <span
                ref={subtitleRef}
                className={`brand-heading-secondary hover-gradient-text ${isSubtitleInViewport ? 'in-viewport' : ''}`}
              >
                Don't worry we got you
              </span>
            </motion.h1>

            {/* Descriptive Text Content */}
            <motion.div
              className="mb-12"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <motion.p
                ref={descriptionRef}
                className={`font-poppins text-lg md:text-xl lg:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed mb-6 max-w-3xl mx-auto ${isDescriptionInViewport ? 'in-viewport' : ''}`}
                initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                Master programming with our comprehensive learning platform featuring
                <span className="font-semibold hover-gradient-text"> interactive courses</span>,
                <span className="font-semibold hover-gradient-text"> hands-on exercises</span>, and
                <span className="font-semibold hover-gradient-text"> industry-recognized certifications</span>.
              </motion.p>

              <motion.div
                className="flex flex-wrap justify-center gap-6 text-sm md:text-base lg:text-lg text-gray-600 dark:text-gray-400"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <motion.div
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <motion.div
                    className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.9, ease: "easeOut" }}
                  ></motion.div>
                  <span className="font-medium">Expert-Led Courses</span>
                </motion.div>
                <motion.div
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <motion.div
                    className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.4, delay: 1.0, ease: "easeOut" }}
                  ></motion.div>
                  <span className="font-medium">Live Coding Practice</span>
                </motion.div>
                <motion.div
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <motion.div
                    className="w-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.4, delay: 1.1, ease: "easeOut" }}
                  ></motion.div>
                  <span className="font-medium">Career Certification</span>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* CTA Button - Green theme */}
            <motion.div
              className="flex justify-center mb-8"
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94],
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
            >
              <motion.div
                whileHover={{
                  x: 2,
                  transition: { duration: 0.2, ease: "easeOut" }
                }}
                whileTap={{
                  scale: 0.98,
                  transition: { duration: 0.1 }
                }}
              >
                <button
                  className="bg-emerald-600 hover:bg-emerald-500 text-white border-none px-4 py-2 text-base rounded-lg cursor-pointer inline-flex items-center gap-2 transition-all duration-300 font-sans h-14"
                  onClick={() => navigate("/learn/courses")}
                >
                  <span className="flex items-center gap-2 font-poppins">
                    View All Courses
                    <motion.div
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  </span>
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HeroSection;
