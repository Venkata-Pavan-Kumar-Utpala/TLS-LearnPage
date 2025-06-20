import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useInViewport from "../hooks/useInViewport";

const HeroSection = () => {
  const navigate = useNavigate();
  const [titleRef, isTitleInViewport] = useInViewport();
  const [subtitleRef, isSubtitleInViewport] = useInViewport();

  return (
    <div className="relative z-10 bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border-b border-white/20 dark:border-gray-700/20 overflow-hidden pt-20">
      <div className="container px-4 py-16 mx-auto max-w-6xl relative">
        <div className="flex items-center justify-center min-h-[600px]">
          {/* Centered Content */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 text-center max-w-4xl"
          >
            {/* Main headline with Poppins font */}
            <motion.h1
              className="font-poppins text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight mb-8 leading-[1.1]"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
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

            {/* 3D Image Carousel Placeholder */}
            <motion.div 
              className="w-full h-64 bg-gradient-to-r from-blue-100 to-emerald-100 dark:from-blue-900/30 dark:to-emerald-900/30 rounded-2xl border-2 border-dashed border-blue-300 dark:border-blue-600 flex items-center justify-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="text-center">
                <div className="text-4xl mb-2">🎠</div>
                <p className="text-blue-700 dark:text-blue-300 font-semibold">
                  3D Image Carousel Placeholder
                </p>
                <p className="text-blue-600 dark:text-blue-400 text-sm">
                  Future interactive 3D carousel will be placed here
                </p>
              </div>
            </motion.div>

            {/* CTA Button - Green theme */}
            <motion.div 
              className="flex justify-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button 
                  className="h-14 px-8 font-bold text-white bg-gradient-to-r from-emerald-600 to-emerald-700 hover:shadow-2xl transition-all duration-300 rounded-2xl group relative overflow-hidden"
                  onClick={() => navigate("/learn/courses")}
                >
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.5 }}
                  />
                  <span className="flex items-center gap-3 relative z-10">
                    View All Courses
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                  </span>
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
