import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Clock, Star, BookOpen, ArrowRight, Filter } from "lucide-react";
import { useState } from "react";
import ScrollProgress from "../../components/ScrollProgress";
import useInViewport from "../../hooks/useInViewport";
import CourseCard from "../../components/CourseCard";

const AllCourses = () => {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [headingRef, isHeadingInViewport] = useInViewport();

  // Course data matching the CourseCard component format
  const courses = [
    {
      id: "python",
      title: "Python",
      description: "Learn Python programming from basics to advanced concepts",
      gradient: "from-yellow-400 via-orange-400 to-blue-500",
      icon: "🐍",
      difficulty: "Beginner",
      duration: "8 weeks",
      lessons: 24,
      rating: 4.8,
      price: "Free",
      instructor: "Sarah Johnson"
    },
    {
      id: "data-science",
      title: "Data Science",
      description: "Master data analysis, visualization, and machine learning",
      gradient: "from-purple-500 via-pink-500 to-purple-600",
      icon: "📊",
      difficulty: "Intermediate",
      duration: "10 weeks",
      lessons: 32,
      rating: 4.9,
      price: "₹2,999",
      instructor: "Mike Chen"
    },
    {
      id: "machine-learning",
      title: "Machine Learning",
      description: "Build intelligent systems with ML algorithms",
      gradient: "from-green-400 via-teal-500 to-green-600",
      icon: "🤖",
      difficulty: "Advanced",
      duration: "12 weeks",
      lessons: 40,
      rating: 4.7,
      price: "₹4,999",
      instructor: "Alex Rodriguez"
    },
    {
      id: "web-development",
      title: "Web Development",
      description: "Create modern web applications with latest technologies",
      gradient: "from-blue-500 via-blue-600 to-blue-700",
      icon: "🌐",
      difficulty: "Beginner",
      duration: "6 weeks",
      lessons: 18,
      rating: 4.6,
      price: "Free",
      instructor: "Dr. Emily Watson"
    },
    {
      id: "react-mastery",
      title: "React Mastery",
      description: "Build dynamic user interfaces with React.js, hooks, and modern development patterns",
      gradient: "from-cyan-400 via-blue-500 to-purple-600",
      icon: "⚛️",
      difficulty: "Intermediate",
      duration: "10 weeks",
      lessons: 32,
      rating: 4.9,
      price: "₹3,999",
      instructor: "David Kim"
    },
    {
      id: "nodejs-backend",
      title: "Node.js Backend",
      description: "Create scalable server-side applications with Node.js, Express, and MongoDB",
      gradient: "from-green-500 via-emerald-500 to-teal-600",
      icon: "🟢",
      difficulty: "Advanced",
      duration: "12 weeks",
      lessons: 40,
      rating: 4.8,
      price: "₹5,999",
      instructor: "Emily Watson"
    },
    {
      id: "fullstack-mern",
      title: "Full Stack MERN",
      description: "Complete web development with MongoDB, Express, React, and Node.js stack",
      gradient: "from-indigo-500 via-purple-500 to-pink-500",
      icon: "🚀",
      difficulty: "Advanced",
      duration: "16 weeks",
      lessons: 48,
      rating: 4.9,
      price: "₹7,999",
      instructor: "Michael Chen"
    },
    {
      id: "css-animations",
      title: "CSS & Animations",
      description: "Create stunning visual effects and animations with modern CSS techniques",
      gradient: "from-pink-400 via-red-500 to-yellow-500",
      icon: "🎨",
      difficulty: "Intermediate",
      duration: "4 weeks",
      lessons: 16,
      rating: 4.5,
      price: "₹1,999",
      instructor: "Lisa Park"
    },
    {
      id: "devops-essentials",
      title: "DevOps Essentials",
      description: "Learn Docker, Kubernetes, CI/CD pipelines, and cloud deployment workflows",
      gradient: "from-gray-500 via-slate-600 to-zinc-700",
      icon: "⚙️",
      difficulty: "Advanced",
      duration: "8 weeks",
      lessons: 28,
      rating: 4.7,
      price: "₹4,499",
      instructor: "James Wilson"
    }
  ];

  const filters = [
    { id: "all", label: "All Courses" },
    { id: "beginner", label: "Beginner" },
    { id: "intermediate", label: "Intermediate" },
    { id: "advanced", label: "Advanced" },
    { id: "free", label: "Free" }
  ];

  const filteredCourses = courses.filter(course => {
    if (selectedFilter === "all") return true;
    if (selectedFilter === "free") return course.price === "Free";
    return course.difficulty.toLowerCase() === selectedFilter;
  });



  const handleCourseClick = (courseId) => {
    navigate(`/learn/courses/${courseId}`);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#daf0fa] via-[#bceaff] to-[#bceaff] dark:from-[#020b23] dark:via-[#001233] dark:to-[#0a1128]">
      <ScrollProgress />
      
      {/* Header Section */}
      <div className="relative z-10 pt-24 pb-12">
        <div className="container px-6 mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1
              ref={headingRef}
              className={`Marquee-title-no-border ${isHeadingInViewport ? 'in-viewport' : ''}`}
            >
              All Courses
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Master in-demand skills with our comprehensive programming courses designed by industry experts.
            </p>
          </motion.div>

          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                  selectedFilter === filter.id
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                    : "bg-white/60 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300 hover:bg-white/80 dark:hover:bg-gray-800/80"
                }`}
              >
                <Filter className="w-4 h-4" />
                {filter.label}
              </button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="container px-6 pb-16 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredCourses.map((course, index) => (
            <CourseCard
              key={course.id}
              course={course}
              index={index}
              onClick={() => handleCourseClick(course.id)}
            />
          ))}
        </motion.div>

        {filteredCourses.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-xl text-gray-500 dark:text-gray-400">
              No courses found for the selected filter.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};



export default AllCourses;
