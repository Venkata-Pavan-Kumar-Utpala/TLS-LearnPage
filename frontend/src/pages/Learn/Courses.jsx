import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Clock, Calendar, MessageCircle, Dot, ArrowRight } from "lucide-react";
import ScrollProgress from "../../components/ScrollProgress";
import CourseCard from "../../components/CourseCard";
import useInViewport from "../../hooks/useInViewport";
import { courseAPI, dataAdapters, apiStatus } from "../../services/api";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components/ui/carousel";

const Courses = () => {
  const navigate = useNavigate();
  const [coursesHeadingRef, isCoursesHeadingInViewport] = useInViewport();
  const [liveBatchesHeadingRef, isLiveBatchesHeadingInViewport] = useInViewport();

  // State for courses data
  const [coursesData, setCoursesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch courses from backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);

        console.log('🚀 Fetching courses directly...');
        const backendCourses = await courseAPI.getAllCourses();
        console.log('✅ Backend courses received:', backendCourses);

        // Adapt backend data to frontend format and show only first 4 courses
        const adaptedCourses = backendCourses.map(course => dataAdapters.adaptCourse(course));
        setCoursesData(adaptedCourses.slice(0, 4));
        setError(null);
      } catch (error) {
        console.error('❌ Error fetching courses:', error);
        setError(error.message);
        // Fallback to mock data if backend fails
        setCoursesData(mockCoursesData);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Fallback mock data (in case backend is not available)
  const mockCoursesData = [
    {
      id: "java",
      title: "Java Programming",
      description: "Master Java programming and object-oriented concepts",
      gradient: "from-orange-400 via-red-400 to-pink-400",
      icon: "☕",
      image: "/java.png"
    },
    {
      id: "python",
      title: "Python Programming",
      description: "Learn Python programming from basics to advanced concepts",
      gradient: "from-blue-400 via-green-400 to-yellow-400",
      icon: "🐍",
      image: "/python.png"
    },
    {
      id: "dsa",
      title: "Data Structures & Algorithms",
      description: "Master DSA concepts for coding interviews and problem solving",
      gradient: "from-purple-400 via-pink-400 to-red-400",
      icon: "🧠",
      image: "/dsa.png"
    },
    {
      id: "mysql",
      title: "MySQL Database",
      description: "Learn database design, queries, and management with MySQL",
      gradient: "from-blue-500 via-cyan-400 to-teal-400",
      icon: "🗄️",
      image: "/mysql.png"
    }
  ];

  // Live Batches data
  const liveBatches = [
    {
      id: "beginner-python",
      title: "Beginner Python",
      instructor: "Michael Chen",
      duration: "6 weeks",
      schedule: "Tue, Thu",
      time: "8:00 PM - 10:00 PM IST",
      startDate: "20/01/2024",
      price: "₹5000",
      description: "Kickstart your coding journey with Python. No prior experience needed—join live interactive classes.",
      level: "Beginner"
    },
    {
      id: "data-science-essentials",
      title: "Data Science Essentials",
      instructor: "Sarah Johnson",
      duration: "8 weeks",
      schedule: "Mon, Wed",
      time: "7:00 PM - 9:00 PM IST",
      startDate: "25/01/2024",
      price: "₹7000",
      description: "Master essential data skills: analysis, visualization, machine learning. Practical, project-led, and live.",
      level: "Intermediate"
    },
    {
      id: "machine-learning-bootcamp",
      title: "Machine Learning Bootcamp",
      instructor: "Dr. Alex Rodriguez",
      duration: "10 weeks",
      schedule: "Sat, Sun",
      time: "10:00 AM - 12:00 PM IST",
      startDate: "27/01/2024",
      price: "₹9500",
      description: "Deep dive into ML algorithms, neural networks, and AI. Build real-world projects with industry datasets.",
      level: "Advanced"
    },
    {
      id: "web-development-starter",
      title: "Web Development Starter",
      instructor: "Lisa Park",
      duration: "5 weeks",
      schedule: "Tue, Thu",
      time: "6:00 PM - 8:00 PM IST",
      startDate: "22/01/2024",
      price: "₹4000",
      description: "Learn HTML, CSS, JavaScript from scratch. Build responsive websites and modern web applications.",
      level: "Beginner"
    },
    {
      id: "react-mastery",
      title: "React Mastery",
      instructor: "David Kim",
      duration: "7 weeks",
      schedule: "Mon, Wed, Fri",
      time: "8:30 PM - 10:00 PM IST",
      startDate: "29/01/2024",
      price: "₹6500",
      description: "Master React.js, hooks, state management, and modern frontend development patterns.",
      level: "Intermediate"
    },
    {
      id: "nodejs-backend",
      title: "Node.js Backend Development",
      instructor: "Emily Watson",
      duration: "9 weeks",
      schedule: "Tue, Thu",
      time: "9:00 PM - 11:00 PM IST",
      startDate: "01/02/2024",
      price: "₹8000",
      description: "Build scalable backend APIs with Node.js, Express, MongoDB, and modern deployment strategies.",
      level: "Advanced"
    },
    {
      id: "fullstack-mern",
      title: "Full Stack MERN",
      instructor: "Michael Chen",
      duration: "12 weeks",
      schedule: "Sat, Sun",
      time: "2:00 PM - 5:00 PM IST",
      startDate: "03/02/2024",
      price: "₹12000",
      description: "Complete MERN stack development: MongoDB, Express, React, Node.js. Build production-ready applications.",
      level: "Advanced"
    },
    {
      id: "devops-essentials",
      title: "DevOps Essentials",
      instructor: "James Wilson",
      duration: "6 weeks",
      schedule: "Wed, Fri",
      time: "7:30 PM - 9:30 PM IST",
      startDate: "05/02/2024",
      price: "₹7500",
      description: "Learn Docker, Kubernetes, CI/CD pipelines, and cloud deployment for modern development workflows.",
      level: "Intermediate"
    }
  ];

  const handleCourseClick = (courseId) => {
    navigate(`/learn/courses/${courseId}`);
  };

  const handleWhatsAppClick = (courseTitle) => {
    const message = `Hi! I'm interested in the ${courseTitle} course. Can you provide more details?`;
    const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };



  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#daf0fa] via-[#bceaff] to-[#bceaff] dark:from-[#020b23] dark:via-[#001233] dark:to-[#0a1128]">
      <ScrollProgress />

      {/* Header Section */}
      <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
      <div className="relative z-10 pt-24 pb-12">
        <div className="container px-6 mx-auto max-w-7xl">
          {/* Courses Heading - Match Live Batches structure */}
          <div className="flex items-center gap-3 mb-8">
            <h2
              ref={coursesHeadingRef}
              className={`font-poppins text-5xl font-medium brand-heading-primary ${isCoursesHeadingInViewport ? 'in-viewport' : ''} uppercase tracking-wider`}
            >
              Courses
            </h2>
          </div>
          <p className="text-lg text-blue-600 dark:text-blue-400 font-medium mb-8">
            Discover our comprehensive learning programs
          </p>

          {/* Course Cards Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16"
          >
            {/* Loading State */}
            {loading && (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-white/90 dark:bg-gray-800/90 rounded-2xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-600/50 animate-pulse">
                    <div className="h-48 bg-gray-300 dark:bg-gray-600 rounded-xl mb-4"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-4"></div>
                    <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
                    <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                  </div>
                ))}
              </div>
            )}

            {/* Error State */}
            {error && !loading && (
              <div className="text-center py-8">
                <p className="text-red-600 dark:text-red-400 mb-4">
                  Failed to load courses: {error}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  Showing fallback data instead.
                </p>
              </div>
            )}

            {/* Courses Grid */}
            {!loading && (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {coursesData.map((course, index) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    index={index}
                    onClick={() => handleCourseClick(course.id)}
                  />
                ))}
              </div>
            )}

            {/* View All Courses Button */}
            <div className="flex justify-center mt-12">
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                whileHover={{
                  x: 2,
                  transition: { duration: 0.2, ease: "easeOut" }
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/learn/courses/all')}
                className="bg-emerald-600 hover:bg-emerald-500 text-white border-none px-4 py-2 text-base rounded-lg cursor-pointer inline-flex items-center gap-2 transition-all duration-300 font-sans"
              >
                <span>View All Courses</span>
                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </motion.button>
            </div>
          </motion.div>



          {/* Live Batches Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <h2
                ref={liveBatchesHeadingRef}
                className={`font-poppins text-3xl font-medium brand-heading-primary ${isLiveBatchesHeadingInViewport ? 'in-viewport' : ''} uppercase tracking-wider`}
              >
                LIVE BATCHES
              </h2>
              <span className="relative">
                <Dot
                  className="w-7 h-7 text-red-500"
                  style={{ filter: "drop-shadow(0 0 6px #f00)" }}
                />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-3 w-3 bg-red-500 rounded-full opacity-80 animate-pulse"></span>
              </span>
            </div>

            {/* Netflix-style carousel for cards */}
            <div className="relative px-1">
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                  dragFree: true,
                  slidesToScroll: 1
                }}
                className="w-full max-w-full"
              >
                <CarouselContent className="py-2">
                  {liveBatches.map((batch, index) => (
                    <CarouselItem
                      key={batch.id}
                      className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 px-2"
                    >
                      <LiveBatchCard
                        batch={batch}
                        index={index}
                        onWhatsAppClick={() => handleWhatsAppClick(batch.title)}
                        onGetStarted={() => {
                          window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                          setTimeout(() => navigate(`/learn/batches/${batch.id}`), 100);
                        }}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="z-20 -left-5 bg-white/90 dark:bg-gray-800/90 backdrop-blur border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-all duration-300" />
                <CarouselNext className="z-20 -right-5 bg-white/90 dark:bg-gray-800/90 backdrop-blur border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-all duration-300" />
              </Carousel>
            </div>
          </motion.div>
        </div>
      </div>
      </motion.div>
    </div>
  );
};



// Live Batch Card Component
const LiveBatchCard = ({ batch, index, onWhatsAppClick, onGetStarted }) => {
  const getLevelColor = (level) => {
    switch (level.toLowerCase()) {
      case "beginner": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "intermediate": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "advanced": return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      className="bg-white/80 dark:bg-gray-800/80 rounded-2xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-600/50 cursor-pointer h-full flex flex-col"
    >
      {/* Header - Fixed height section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${getLevelColor(batch.level)}`}>
            {batch.level}
          </span>
        </div>
        <div className="h-14 flex items-start">
          <h3 className="font-poppins font-medium text-lg text-gray-900 dark:text-white transition-colors duration-300 line-clamp-2">
            {batch.title}
          </h3>
        </div>
      </div>

      {/* Instructor - Fixed height section */}
      <div className="h-6 mb-6 flex items-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          with <span className="text-blue-600 dark:text-blue-400 font-medium">{batch.instructor}</span>
        </p>
      </div>

      {/* Schedule Info - Fixed height section */}
      <div className="h-24 mb-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Clock className="w-4 h-4 flex-shrink-0" />
            <span>{batch.duration}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Calendar className="w-4 h-4 flex-shrink-0" />
            <span>Schedule: {batch.schedule}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Clock className="w-4 h-4 flex-shrink-0" />
            <span>Time: {batch.time}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Calendar className="w-4 h-4 flex-shrink-0" />
            <span>Starts: {batch.startDate}</span>
          </div>
        </div>
      </div>

      {/* Description - Flexible section */}
      <div className="flex-grow mb-6">
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3">
          {batch.description}
        </p>
      </div>

      {/* Price and Actions - Fixed height section */}
      <div className="h-12 flex items-center justify-between mb-4">
        <div className="text-2xl font-bold text-gray-900 dark:text-white">
          {batch.price}
        </div>
        <button
          onClick={onWhatsAppClick}
          className="flex items-center gap-2 text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-300"
        >
          <MessageCircle className="w-4 h-4" />
          <span className="text-sm">WhatsApp</span>
        </button>
      </div>

      {/* Get Started Button - Fixed height */}
      <button
        onClick={onGetStarted}
        className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all duration-300 hover:shadow-lg"
      >
        Get Started
      </button>
    </motion.div>
  );
};

export default Courses;
