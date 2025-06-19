import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import useInViewport from "../hooks/useInViewport";
import { CoursesModel, ChallengesModel, CertificationModel } from "./3DModels";

const SectionCard = ({ section, index }) => {
  const navigate = useNavigate();
  const [titleRef, isTitleInViewport] = useInViewport();
  const sectionRef = useRef(null);

  // Generate section ID for navigation
  const sectionId = `${section.id}-section`;

  // Track scroll progress for this specific section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Check if this is the last section (certification)
  const isLastSection = section.id === 'certification';

  // Slower scroll-triggered animations with extended ranges
  // Button slides in from bottom with slower timing
  const buttonY = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    isLastSection ? [200, 0, 0, 0] : [200, 0, 0, -200]
  );
  const buttonOpacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.75, 1],
    isLastSection ? [0, 1, 1, 1] : [0, 1, 1, 0]
  );
  const buttonScale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    isLastSection ? [0.3, 1, 1, 1] : [0.3, 1, 1, 0.3]
  );
  const buttonRotate = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    isLastSection ? [45, 0, 0, 0] : [45, 0, 0, -45]
  );

  // Visual container slides in from the side with slower timing
  const visualDirection = index % 2 === 0 ? 1 : -1; // Even indexes from right, odd from left
  const containerX = useTransform(
    scrollYProgress,
    [0, 0.4, 0.6, 1],
    isLastSection ? [300 * visualDirection, 0, 0, 0] : [300 * visualDirection, 0, 0, -300 * visualDirection]
  );
  const containerScale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    isLastSection ? [0.4, 1, 1, 1] : [0.4, 1, 1, 0.4]
  );
  const containerRotate = useTransform(
    scrollYProgress,
    [0, 0.4, 0.6, 1],
    isLastSection ? [20 * visualDirection, 0, 0, 0] : [20 * visualDirection, 0, 0, -20 * visualDirection]
  );
  const containerOpacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.75, 1],
    isLastSection ? [0, 1, 1, 1] : [0, 1, 1, 0]
  );

  // Overall section blur effect with slower timing
  const sectionBlur = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    isLastSection ? [10, 0, 0, 0] : [10, 0, 0, 10]
  );
  const sectionOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    isLastSection ? [0.3, 1, 1, 1] : [0.3, 1, 1, 0.3]
  );
  
  const sectionVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: index * 0.3
      }
    }
  };

  const handleNavigation = () => {
    switch(section.id) {
      case 'courses':
        navigate('/learn/courses');
        break;
      case 'exercises':
        navigate('/learn/exercises');
        break;
      case 'certification':
        navigate('/learn/certification');
        break;
      default:
        break;
    }
  };

  return (
    <motion.section
      id={sectionId}
      ref={sectionRef}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="relative w-full min-h-screen flex items-center py-20"
      style={{
        opacity: sectionOpacity,
        filter: `blur(${sectionBlur}px)`
      }}
    >
      {/* Content container */}
      <div className="container mx-auto max-w-7xl px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content Side - Always on left */}
          <div className="relative z-10 space-y-8">
            {/* Marquee-style titles */}
            <div className="space-y-4">
              <h2
                ref={titleRef}
                className={`Marquee-title ${isTitleInViewport ? 'in-viewport' : ''}`}
              >
                {section.title}
              </h2>
              <h3 className="font-sans text-2xl lg:text-3xl font-bold text-gray-600 dark:text-gray-400">
                {section.subtitle}
              </h3>
            </div>

            {/* Static description */}
            <div className="space-y-6">
              <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-xl">
                {section.description}
              </p>

              {/* Static features list */}
              <ul className="space-y-3">
                {section.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-4 text-lg text-gray-600 dark:text-gray-400"
                  >
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Button with slower scroll-triggered animation */}
            <motion.div
              style={{
                y: buttonY,
                opacity: buttonOpacity,
                scale: buttonScale,
                rotateZ: buttonRotate
              }}
              className="transform-gpu"
            >
              <motion.div
                whileHover={{ scale: 1.1, y: -8 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                <button
                  onClick={handleNavigation}
                  className="h-12 sm:h-14 lg:h-16 px-6 sm:px-8 lg:px-10 font-bold text-base sm:text-lg text-white bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 hover:shadow-2xl transition-all duration-700 rounded-2xl sm:rounded-3xl group relative overflow-hidden backdrop-blur-sm border border-emerald-500/20"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
                    initial={{ x: "-120%" }}
                    whileHover={{
                      x: "120%",
                      transition: { duration: 1.2 }
                    }}
                  />

                  <span className="flex items-center gap-4 relative z-10">
                    {section.cta}
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-500" />
                  </span>
                </button>
              </motion.div>
            </motion.div>
          </div>

          {/* Visual Side - Always on right */}
          <motion.div
            className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] transform-gpu perspective-1000"
            style={{
              x: containerX,
              scale: containerScale,
              rotateZ: containerRotate,
              opacity: containerOpacity
            }}
          >
            <div className="w-full h-full flex items-center justify-center relative">
              {/* 3D Model Container */}
              <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 transform-style-preserve-3d">
                {section.id === 'courses' && <CoursesModel />}
                {section.id === 'exercises' && <ChallengesModel />}
                {section.id === 'certification' && <CertificationModel />}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default SectionCard;
