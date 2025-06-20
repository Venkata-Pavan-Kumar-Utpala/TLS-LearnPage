import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import useInViewport from "../hooks/useInViewport";

const CourseCard = ({ course, index, onClick }) => {
  const [titleRef, isTitleInViewport] = useInViewport();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{ 
        y: -8,
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <Card className="h-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 hover:shadow-2xl hover:border-purple-300/50 dark:hover:border-purple-500/50 transition-all duration-300 overflow-hidden">
        <CardContent className="p-0">
          {/* Course Icon/Header */}
          <div className={`h-48 bg-gradient-to-br ${course.gradient} flex items-center justify-center relative overflow-hidden`}>
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-20">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-white rounded-full"
                  animate={{
                    x: [0, 20, 0],
                    y: [0, -20, 0],
                    opacity: [0.3, 0.8, 0.3],
                  }}
                  transition={{
                    duration: 3 + i * 0.2,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                  style={{
                    left: `${(i % 4) * 25}%`,
                    top: `${Math.floor(i / 4) * 33}%`,
                  }}
                />
              ))}
            </div>
            
            <motion.div
              className="text-6xl relative z-10"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              whileHover={{ 
                scale: 1.2,
                rotate: 10,
                transition: { duration: 0.2 }
              }}
            >
              {course.icon}
            </motion.div>

            {/* Hover overlay */}
            <motion.div
              className="absolute inset-0 bg-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              whileHover={{ opacity: 0.1 }}
            />
          </div>

          {/* Course Info */}
          <div className="p-6">
            <h3
              ref={titleRef}
              className={`font-poppins text-xl font-medium text-blue-900 dark:text-white mb-2 hover-gradient-text ${isTitleInViewport ? 'in-viewport' : ''}`}
            >
              {course.title}
            </h3>
            <p className="text-blue-700 dark:text-gray-200 text-sm leading-relaxed">
              {course.description}
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CourseCard;
