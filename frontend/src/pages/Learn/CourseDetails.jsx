import { motion } from "framer-motion";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Clock, Users, Star, BookOpen, ArrowRight, Play, 
  CheckCircle, Lock, Award, Calendar 
} from "lucide-react";
import ScrollProgress from "../../components/ScrollProgress";
import useInViewport from "../../hooks/useInViewport";

const CourseDetails = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [titleRef, isTitleInViewport] = useInViewport();
  const [whatYouLearnRef, isWhatYouLearnInViewport] = useInViewport();
  const [prerequisitesRef, isPrerequisitesInViewport] = useInViewport();
  const [instructorRef, isInstructorInViewport] = useInViewport();

  // Course data for all available courses
  const courseData = {
    "python": {
      id: "python",
      title: "Python Programming",
      description: "Learn Python programming from basics to advanced concepts",
      longDescription: "Master Python programming with this comprehensive course covering everything from basic syntax to advanced concepts like object-oriented programming, data structures, and web development frameworks.",
      difficulty: "Beginner",
      duration: "8 weeks",
      lessons: 24,
      students: 1250,
      rating: 4.8,
      price: "Free",
      instructor: {
        name: "Sarah Johnson",
        bio: "Senior Python Developer with 8+ years experience in data science and web development",
        avatar: "/api/placeholder/100/100"
      },
      curriculum: [
        {
          id: 1,
          title: "Introduction to JavaScript",
          lessons: 4,
          duration: "2 hours",
          topics: ["What is JavaScript?", "Setting up Environment", "First Program", "Variables and Data Types"],
          completed: false,
          locked: false
        },
        {
          id: 2,
          title: "Control Structures",
          lessons: 3,
          duration: "1.5 hours",
          topics: ["Conditional Statements", "Loops", "Switch Cases"],
          completed: false,
          locked: false
        },
        {
          id: 3,
          title: "Functions and Scope",
          lessons: 4,
          duration: "2.5 hours",
          topics: ["Function Declaration", "Arrow Functions", "Scope", "Closures"],
          completed: false,
          locked: true
        },
        {
          id: 4,
          title: "Objects and Arrays",
          lessons: 5,
          duration: "3 hours",
          topics: ["Object Literals", "Array Methods", "Destructuring", "Spread Operator"],
          completed: false,
          locked: true
        },
        {
          id: 5,
          title: "DOM Manipulation",
          lessons: 4,
          duration: "2 hours",
          topics: ["Selecting Elements", "Event Handling", "Dynamic Content", "Form Validation"],
          completed: false,
          locked: true
        },
        {
          id: 6,
          title: "Asynchronous JavaScript",
          lessons: 4,
          duration: "2.5 hours",
          topics: ["Callbacks", "Promises", "Async/Await", "Fetch API"],
          completed: false,
          locked: true
        }
      ],
      prerequisites: ["Basic computer skills", "Text editor knowledge", "Web browser"],
      learningOutcomes: [
        "Write clean, efficient JavaScript code",
        "Understand modern ES6+ features",
        "Manipulate the DOM effectively",
        "Handle asynchronous operations",
        "Build interactive web applications",
        "Debug JavaScript applications"
      ],
      tags: ["Python", "Programming", "Data Science"]
    },
    "data-science": {
      id: "data-science",
      title: "Data Science",
      description: "Master data analysis, visualization, and machine learning",
      longDescription: "Comprehensive data science course covering statistics, data analysis, visualization with Python libraries like Pandas, NumPy, Matplotlib, and machine learning fundamentals.",
      difficulty: "Intermediate",
      duration: "10 weeks",
      lessons: 32,
      students: 890,
      rating: 4.9,
      price: "₹2,999",
      instructor: {
        name: "Mike Chen",
        bio: "Data Scientist with PhD in Statistics and 6+ years industry experience",
        avatar: "/api/placeholder/100/100"
      },
      curriculum: [
        {
          id: 1,
          title: "Introduction to Data Science",
          lessons: 4,
          duration: "2.5 hours",
          topics: ["What is Data Science?", "Python for Data Science", "Jupyter Notebooks", "Data Types"],
          completed: false,
          locked: false
        },
        {
          id: 2,
          title: "Data Analysis with Pandas",
          lessons: 6,
          duration: "4 hours",
          topics: ["DataFrames", "Data Cleaning", "Data Manipulation", "Grouping and Aggregation"],
          completed: false,
          locked: false
        }
      ],
      prerequisites: ["Basic Python knowledge", "High school mathematics", "Statistics basics"],
      learningOutcomes: [
        "Analyze complex datasets",
        "Create compelling data visualizations",
        "Apply statistical methods",
        "Build predictive models",
        "Use Python data science libraries"
      ],
      tags: ["Data Science", "Python", "Machine Learning"]
    },
    "machine-learning": {
      id: "machine-learning",
      title: "Machine Learning",
      description: "Build intelligent systems with ML algorithms",
      longDescription: "Deep dive into machine learning algorithms, neural networks, and AI. Learn to build and deploy ML models for real-world applications using Python and popular frameworks.",
      difficulty: "Advanced",
      duration: "12 weeks",
      lessons: 40,
      students: 650,
      rating: 4.7,
      price: "₹4,999",
      instructor: {
        name: "Alex Rodriguez",
        bio: "ML Engineer with PhD in Computer Science and 10+ years in AI research",
        avatar: "/api/placeholder/100/100"
      },
      curriculum: [
        {
          id: 1,
          title: "ML Fundamentals",
          lessons: 5,
          duration: "3 hours",
          topics: ["Types of ML", "Supervised Learning", "Unsupervised Learning", "Model Evaluation"],
          completed: false,
          locked: false
        }
      ],
      prerequisites: ["Python programming", "Statistics", "Linear algebra", "Calculus basics"],
      learningOutcomes: [
        "Implement ML algorithms from scratch",
        "Use scikit-learn and TensorFlow",
        "Build neural networks",
        "Deploy ML models",
        "Evaluate model performance"
      ],
      tags: ["Machine Learning", "AI", "Python"]
    },
    "web-development": {
      id: "web-development",
      title: "Web Development",
      description: "Create modern web applications with latest technologies",
      longDescription: "Complete web development course covering HTML, CSS, JavaScript, React, Node.js, and modern deployment strategies. Build full-stack applications from scratch.",
      difficulty: "Beginner",
      duration: "6 weeks",
      lessons: 18,
      students: 1500,
      rating: 4.6,
      price: "Free",
      instructor: {
        name: "Dr. Emily Watson",
        bio: "Full-stack developer and computer science professor with 12+ years experience",
        avatar: "/api/placeholder/100/100"
      },
      curriculum: [
        {
          id: 1,
          title: "HTML & CSS Basics",
          lessons: 4,
          duration: "2 hours",
          topics: ["HTML Structure", "CSS Styling", "Responsive Design", "Flexbox & Grid"],
          completed: false,
          locked: false
        }
      ],
      prerequisites: ["Basic computer skills", "Text editor knowledge"],
      learningOutcomes: [
        "Build responsive websites",
        "Master modern CSS techniques",
        "Create interactive web apps",
        "Understand web development workflow",
        "Deploy websites online"
      ],
      tags: ["Web Development", "HTML", "CSS", "JavaScript"]
    },
    "react-mastery": {
      id: "react-mastery",
      title: "React Mastery",
      description: "Build dynamic user interfaces with React.js, hooks, and modern development patterns",
      longDescription: "Master React.js with this comprehensive course covering components, hooks, state management, routing, and modern development patterns. Build real-world applications.",
      difficulty: "Intermediate",
      duration: "10 weeks",
      lessons: 32,
      students: 1100,
      rating: 4.9,
      price: "₹3,999",
      instructor: {
        name: "David Kim",
        bio: "Senior React Developer and tech lead with 7+ years experience",
        avatar: "/api/placeholder/100/100"
      },
      curriculum: [
        {
          id: 1,
          title: "React Fundamentals",
          lessons: 5,
          duration: "3 hours",
          topics: ["Components", "JSX", "Props", "State"],
          completed: false,
          locked: false
        }
      ],
      prerequisites: ["JavaScript ES6+", "HTML/CSS", "Basic programming concepts"],
      learningOutcomes: [
        "Build complex React applications",
        "Master React hooks",
        "Implement state management",
        "Create reusable components",
        "Deploy React apps"
      ],
      tags: ["React", "Frontend", "JavaScript"]
    },
    "nodejs-backend": {
      id: "nodejs-backend",
      title: "Node.js Backend Development",
      description: "Create scalable server-side applications with Node.js, Express, and MongoDB",
      longDescription: "Learn backend development with Node.js, Express framework, MongoDB database, and modern deployment strategies. Build RESTful APIs and full-stack applications.",
      difficulty: "Advanced",
      duration: "12 weeks",
      lessons: 40,
      students: 750,
      rating: 4.8,
      price: "₹5,999",
      instructor: {
        name: "Emily Watson",
        bio: "Backend architect with 10+ years experience in scalable systems",
        avatar: "/api/placeholder/100/100"
      },
      curriculum: [
        {
          id: 1,
          title: "Node.js Basics",
          lessons: 4,
          duration: "2.5 hours",
          topics: ["Node.js Runtime", "NPM", "Modules", "File System"],
          completed: false,
          locked: false
        }
      ],
      prerequisites: ["JavaScript proficiency", "Basic web development", "Command line basics"],
      learningOutcomes: [
        "Build RESTful APIs",
        "Work with databases",
        "Implement authentication",
        "Deploy Node.js applications",
        "Handle real-time communication"
      ],
      tags: ["Node.js", "Backend", "API"]
    },
    "fullstack-mern": {
      id: "fullstack-mern",
      title: "Full Stack MERN Development",
      description: "Complete web development with MongoDB, Express, React, and Node.js stack",
      longDescription: "Master full-stack development with the MERN stack. Build complete web applications from database design to frontend deployment.",
      difficulty: "Advanced",
      duration: "16 weeks",
      lessons: 48,
      students: 500,
      rating: 4.9,
      price: "₹7,999",
      instructor: {
        name: "Michael Chen",
        bio: "Full-stack architect and startup CTO with 12+ years experience",
        avatar: "/api/placeholder/100/100"
      },
      curriculum: [
        {
          id: 1,
          title: "MERN Stack Overview",
          lessons: 3,
          duration: "2 hours",
          topics: ["Stack Architecture", "Development Environment", "Project Setup"],
          completed: false,
          locked: false
        }
      ],
      prerequisites: ["React knowledge", "Node.js basics", "Database concepts", "Git/GitHub"],
      learningOutcomes: [
        "Build full-stack applications",
        "Integrate frontend and backend",
        "Implement user authentication",
        "Deploy to production",
        "Manage application state"
      ],
      tags: ["MERN", "Full Stack", "MongoDB"]
    }
  };

  const course = courseData[courseId];

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Course Not Found</h1>
          <button 
            onClick={() => navigate('/learn/courses')}
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "curriculum", label: "Curriculum" },
    { id: "instructor", label: "Instructor" }
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case "beginner": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "intermediate": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "advanced": return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  const handleStartCourse = () => {
    // Navigate to course topics page
    navigate(`/learn/courses/${courseId}/topics`);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#daf0fa] via-[#bceaff] to-[#bceaff] dark:from-[#020b23] dark:via-[#001233] dark:to-[#0a1128]">
      <ScrollProgress />
      
      {/* Hero Section */}
      <div className="relative z-10 bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border-b border-white/20 dark:border-gray-700/20 pt-20">
        <div className="container px-6 py-16 mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            {/* Course Info */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(course.difficulty)}`}>
                    {course.difficulty}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {course.rating} ({course.students} students)
                    </span>
                  </div>
                </div>

                <h1
                  ref={titleRef}
                  className={`Marquee-title-no-border ${isTitleInViewport ? 'in-viewport' : ''} mb-6`}
                >
                  {course.title}
                </h1>
                
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                  {course.longDescription}
                </p>

                {/* Course Stats */}
                <div className="flex flex-wrap gap-6 text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    <span>{course.lessons} lessons</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    <span>{course.students} students</span>
                  </div>

                </div>
              </motion.div>
            </div>

            {/* Enrollment Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl p-8 shadow-lg border border-white/20 dark:border-gray-700/20 sticky top-24"
            >
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {course.price}
                </div>
                {course.price === "Free" && (
                  <p className="text-green-600 dark:text-green-400 font-medium">
                    Limited time offer
                  </p>
                )}
              </div>

              <button
                onClick={handleStartCourse}
                className="w-full h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-xl transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-3 group mb-6"
              >
                <Play className="w-5 h-5" />
                <span>Start Learning</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>

              <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Lifetime access</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Certificate of completion</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Mobile and desktop access</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Community support</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="container px-6 py-16 mx-auto max-w-7xl">
        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex gap-4 mb-12 border-b border-gray-200 dark:border-gray-700"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-medium transition-all duration-300 border-b-2 ${
                activeTab === tab.id
                  ? "border-blue-600 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {activeTab === "overview" && (
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3
                  ref={whatYouLearnRef}
                  className={`font-poppins text-2xl font-medium mb-6 hover-gradient-text ${isWhatYouLearnInViewport ? 'in-viewport' : ''}`}
                >
                  What you'll learn
                </h3>
                <ul className="space-y-3">
                  {course.learningOutcomes.map((outcome, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3
                  ref={prerequisitesRef}
                  className={`font-poppins text-2xl font-medium mb-6 hover-gradient-text ${isPrerequisitesInViewport ? 'in-viewport' : ''}`}
                >
                  Prerequisites
                </h3>
                <ul className="space-y-3">
                  {course.prerequisites.map((prereq, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{prereq}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === "curriculum" && (
            <div className="space-y-4">
              {course.curriculum.map((module, index) => (
                <div
                  key={module.id}
                  className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-xl p-6 border border-white/20 dark:border-gray-700/20"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-poppins font-medium text-gray-900 dark:text-white">
                          {module.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {module.lessons} lessons • {module.duration}
                        </p>
                      </div>
                    </div>
                    {module.locked ? (
                      <Lock className="w-5 h-5 text-gray-400" />
                    ) : (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                  
                  <ul className="space-y-2 ml-12">
                    {module.topics.map((topic, topicIndex) => (
                      <li key={topicIndex} className="text-gray-600 dark:text-gray-400 text-sm">
                        • {topic}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {activeTab === "instructor" && (
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-xl p-8 border border-white/20 dark:border-gray-700/20">
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {course.instructor.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3
                    ref={instructorRef}
                    className={`font-poppins text-2xl font-medium mb-2 hover-gradient-text ${isInstructorInViewport ? 'in-viewport' : ''}`}
                  >
                    {course.instructor.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {course.instructor.bio}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{course.students} students</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      <span>{course.rating} rating</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default CourseDetails;
