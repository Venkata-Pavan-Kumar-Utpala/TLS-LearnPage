import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  BookOpen, Code2, Trophy, PanelLeft, Play, CheckCircle,
  Clock, ArrowRight, FileText, Lightbulb, ChevronLeft, ChevronRight,
  Menu, X
} from "lucide-react";
import ScrollProgress from "../../components/ScrollProgress";
import useInViewport from "../../hooks/useInViewport";
import Navbar from "../../components/Navbar";

const CourseTopics = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [selectedTopic, setSelectedTopic] = useState("variables");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [titleRef, isTitleInViewport] = useInViewport();

  // Course topics data
  const courseTopicsData = {
    "python": {
      title: "Python Programming",
      description: "Master Python fundamentals with hands-on coding exercises",
      topics: [
        {
          id: "variables",
          title: "Variables & Data Types",
          description: "Learn about Python variables, data types, and basic operations",
          exercises: 5,
          maxXP: 50,
          completed: false,
          content: {
            theory: "Variables are containers for storing data values. In Python, you don't need to declare variables explicitly - they are created automatically when you assign a value to them.\n\nPython has several built-in data types:\n• Integers (int): Whole numbers like 42, -17, 0\n• Floats (float): Decimal numbers like 3.14, -2.5\n• Strings (str): Text like \"Hello\", 'Python'\n• Booleans (bool): True or False values",
            codeExample: `# Creating variables
name = "Alice"        # String
age = 25             # Integer  
height = 5.6         # Float
is_student = True    # Boolean

# You can check the type of a variable
print(type(name))        # <class 'str'>
print(type(age))         # <class 'int'>
print(type(height))      # <class 'float'>
print(type(is_student))  # <class 'bool'>`,
            keyPoints: [
              "Variables are created when you assign a value",
              "Python is dynamically typed - no need to declare types",
              "Use descriptive variable names for better code readability",
              "Variable names are case-sensitive",
              "Cannot start with numbers or contain spaces"
            ]
          }
        },
        {
          id: "functions",
          title: "Functions",
          description: "Create reusable code blocks with functions",
          exercises: 4,
          maxXP: 40,
          completed: false,
          content: {
            theory: "Functions are reusable blocks of code that perform specific tasks. They help organize code, avoid repetition, and make programs more modular and easier to maintain.",
            codeExample: `# Defining a function
def greet(name):
    return f"Hello, {name}!"

# Calling the function
message = greet("Alice")
print(message)  # Output: Hello, Alice!

# Function with multiple parameters
def calculate_area(length, width):
    area = length * width
    return area

result = calculate_area(5, 3)
print(f"Area: {result}")  # Output: Area: 15`,
            keyPoints: [
              "Use 'def' keyword to define functions",
              "Functions can accept parameters and return values",
              "Good function names describe what they do",
              "Functions promote code reusability",
              "Use docstrings to document your functions"
            ]
          }
        },
        {
          id: "loops",
          title: "Loops & Iterations",
          description: "Master for loops, while loops, and iteration patterns",
          exercises: 6,
          maxXP: 60,
          completed: false,
          content: {
            theory: "Loops allow you to repeat code multiple times. Python has two main types of loops: 'for' loops for iterating over sequences, and 'while' loops for repeating until a condition is false.",
            codeExample: `# For loop example
fruits = ["apple", "banana", "orange"]
for fruit in fruits:
    print(f"I like {fruit}")

# While loop example
count = 0
while count < 5:
    print(f"Count: {count}")
    count += 1

# Range function with for loop
for i in range(1, 6):
    print(f"Number: {i}")`,
            keyPoints: [
              "For loops iterate over sequences (lists, strings, etc.)",
              "While loops continue until condition becomes False",
              "Use range() to generate number sequences",
              "Break and continue statements control loop flow",
              "Avoid infinite loops by ensuring conditions change"
            ]
          }
        },
        {
          id: "classes",
          title: "Classes & Objects",
          description: "Object-oriented programming with classes and objects",
          exercises: 5,
          maxXP: 50,
          completed: false,
          content: {
            theory: "Classes are blueprints for creating objects. They encapsulate data (attributes) and functions (methods) that work on that data. This is the foundation of object-oriented programming.",
            codeExample: `# Defining a class
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def introduce(self):
        return f"Hi, I'm {self.name} and I'm {self.age} years old"
    
    def have_birthday(self):
        self.age += 1

# Creating objects
person1 = Person("Alice", 25)
person2 = Person("Bob", 30)

print(person1.introduce())  # Hi, I'm Alice and I'm 25 years old
person1.have_birthday()
print(f"Alice is now {person1.age}")  # Alice is now 26`,
            keyPoints: [
              "Classes define the structure and behavior of objects",
              "__init__ method initializes new objects",
              "self refers to the current instance",
              "Methods are functions defined inside classes",
              "Objects are instances of classes"
            ]
          }
        }
      ]
    },
    "data-science": {
      title: "Data Science",
      description: "Master data analysis and visualization techniques",
      topics: [
        {
          id: "pandas-basics",
          title: "Pandas Fundamentals",
          description: "Learn data manipulation with Pandas DataFrames",
          exercises: 4,
          maxXP: 40,
          completed: false,
          content: {
            theory: "Pandas is the most important library for data manipulation in Python. It provides DataFrames - powerful data structures for handling structured data.",
            codeExample: `import pandas as pd

# Creating a DataFrame
data = {
    'name': ['Alice', 'Bob', 'Charlie'],
    'age': [25, 30, 35],
    'city': ['New York', 'London', 'Tokyo']
}
df = pd.DataFrame(data)

# Basic operations
print(df.head())        # Show first 5 rows
print(df.info())        # Data types and info
print(df.describe())    # Statistical summary`,
            keyPoints: [
              "DataFrames are like Excel spreadsheets in Python",
              "Use .head() and .tail() to preview data",
              "Filter data with boolean indexing",
              "Group data with .groupby()",
              "Handle missing data with .fillna() and .dropna()"
            ]
          }
        }
      ]
    }
  };

  const currentCourse = courseTopicsData[courseId];
  const currentTopic = currentCourse?.topics.find(t => t.id === selectedTopic);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  if (!currentCourse) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#daf0fa] via-[#bceaff] to-[#bceaff] dark:from-[#020b23] dark:via-[#001233] dark:to-[#0a1128]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Course Not Found</h1>
          <button
            onClick={() => {
              window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
              setTimeout(() => navigate('/learn/courses'), 100);
            }}
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  const handleTakeQuiz = () => {
    // Scroll to top before navigating to quiz
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    // Small delay to ensure scroll completes before navigation
    setTimeout(() => {
      navigate(`/learn/courses/${courseId}/quiz`);
    }, 100);
  };

  const handleStartPractice = () => {
    // Scroll to top before navigating to exercises
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    // Small delay to ensure scroll completes before navigation
    setTimeout(() => {
      // Navigate to exercises page (to be implemented)
      navigate(`/learn/exercises/${courseId}`);
    }, 100);
  };

  const handleToggleSidebar = () => {
    console.log('Toggling sidebar from:', sidebarCollapsed, 'to:', !sidebarCollapsed);
    setSidebarCollapsed(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#daf0fa] via-[#bceaff] to-[#bceaff] dark:from-[#020b23] dark:via-[#001233] dark:to-[#0a1128]">
      <ScrollProgress />
      <Navbar />
      
      <div className="flex min-h-screen">
        {/* Desktop Sidebar */}
        <motion.div
          initial={false}
          animate={{
            width: sidebarCollapsed ? "80px" : "320px",
            transition: { duration: 0.3, ease: "easeInOut" }
          }}
          className="hidden lg:flex flex-col bg-white/20 dark:bg-gray-900/40 backdrop-blur-xl border-r border-white/20 dark:border-gray-700/20 relative z-40"
        >
          {/* Sidebar Header */}
          <div className="p-4 border-b border-white/10 dark:border-gray-700/20 pt-24 relative z-50">
            <div className="flex items-center justify-between relative z-50">
              <AnimatePresence mode="wait">
                {!sidebarCollapsed && (
                  <motion.h3
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="font-poppins font-semibold text-gray-900 dark:text-white text-sm"
                  >
                    Course Topics
                  </motion.h3>
                )}
              </AnimatePresence>

              <button
                type="button"
                onClick={handleToggleSidebar}
                onMouseDown={(e) => {
                  console.log('Mouse down on toggle button');
                  e.preventDefault();
                }}
                className="p-3 rounded-lg bg-blue-500/20 dark:bg-blue-600/20 hover:bg-blue-500/30 dark:hover:bg-blue-600/30 transition-all duration-200 border-2 border-blue-500/50 dark:border-blue-400/50 flex-shrink-0 cursor-pointer z-[60] relative shadow-lg active:scale-95"
                aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                {sidebarCollapsed ? (
                  <ChevronRight className="w-5 h-5 text-blue-700 dark:text-blue-300" />
                ) : (
                  <ChevronLeft className="w-5 h-5 text-blue-700 dark:text-blue-300" />
                )}
              </button>
            </div>
          </div>

          {/* Sidebar Content */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-3">
              {currentCourse.topics.map((topic, index) => (
                <motion.button
                  key={topic.id}
                  onClick={() => {
                    setSelectedTopic(topic.id);
                    // Scroll to top when changing topics
                    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                  }}
                  whileHover={{ scale: sidebarCollapsed ? 1.05 : 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`group relative w-full text-left rounded-xl transition-all duration-300 ${
                    selectedTopic === topic.id
                      ? 'bg-blue-500/20 border-2 border-blue-500/50 text-blue-700 dark:text-blue-300'
                      : 'bg-white/50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-600/50 hover:bg-white/70 dark:hover:bg-gray-700/50'
                  } ${sidebarCollapsed ? 'p-3' : 'p-4'}`}
                >
                  <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'gap-3'}`}>
                    <div className={`${sidebarCollapsed ? 'w-10 h-10' : 'w-8 h-8'} rounded-lg flex items-center justify-center ${
                      topic.completed ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                    }`}>
                      {topic.completed ? (
                        <CheckCircle className={`${sidebarCollapsed ? 'w-5 h-5' : 'w-4 h-4'} text-white`} />
                      ) : (
                        <span className={`${sidebarCollapsed ? 'text-sm' : 'text-xs'} font-bold text-gray-600 dark:text-gray-300`}>
                          {index + 1}
                        </span>
                      )}
                    </div>

                    <AnimatePresence mode="wait">
                      {!sidebarCollapsed && (
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.2 }}
                          className="flex-1 min-w-0"
                        >
                          <h4 className="font-medium text-gray-900 dark:text-white mb-1 truncate">
                            {topic.title}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                            {topic.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Tooltip for collapsed state */}
                  {sidebarCollapsed && (
                    <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 dark:bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                      {topic.title}
                    </div>
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="lg:hidden fixed top-24 left-4 z-40 p-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/20 shadow-lg"
        >
          <Menu className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>

        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
                className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              />

              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="lg:hidden fixed left-0 top-0 bottom-0 w-80 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-r border-white/20 dark:border-gray-700/20 z-50"
              >
                {/* Mobile Header */}
                <div className="p-4 border-b border-white/10 dark:border-gray-700/20 pt-24">
                  <div className="flex items-center justify-between">
                    <h3 className="font-poppins font-semibold text-gray-900 dark:text-white">
                      Course Topics
                    </h3>
                    <button
                      onClick={() => setMobileMenuOpen(false)}
                      className="p-2 rounded-lg bg-white/50 dark:bg-gray-800/50 hover:bg-white/70 dark:hover:bg-gray-700/50 transition-all duration-200"
                    >
                      <X className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    </button>
                  </div>
                </div>

                {/* Mobile Content */}
                <div className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-3">
                    {currentCourse.topics.map((topic, index) => (
                      <button
                        key={topic.id}
                        onClick={() => {
                          setSelectedTopic(topic.id);
                          setMobileMenuOpen(false);
                          // Scroll to top when changing topics on mobile
                          window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                        }}
                        className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                          selectedTopic === topic.id
                            ? 'bg-blue-500/20 border-2 border-blue-500/50 text-blue-700 dark:text-blue-300'
                            : 'bg-white/50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-600/50 hover:bg-white/70 dark:hover:bg-gray-700/50'
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            topic.completed ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                          }`}>
                            {topic.completed ? (
                              <CheckCircle className="w-4 h-4 text-white" />
                            ) : (
                              <span className="text-xs font-bold text-gray-600 dark:text-gray-300">
                                {index + 1}
                              </span>
                            )}
                          </div>
                          <h4 className="font-medium text-gray-900 dark:text-white">{topic.title}</h4>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 ml-11">
                          {topic.description}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="flex-1 relative min-w-0">
          <div className="relative z-10 pt-24 pb-12">
            <div className={`container mx-auto max-w-6xl transition-all duration-300 ${
              sidebarCollapsed ? 'px-6' : 'px-6 lg:px-8'
            }`}>
              
              {/* Breadcrumb */}
              <nav className="mb-6 flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 font-medium">
                <span className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">Roadmaps</span>
                <span className="mx-1.5">/</span>
                <span className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
                  {currentCourse.title}
                </span>
                <span className="mx-1.5">/</span>
                <span className="text-gray-900 dark:text-white font-bold">{currentTopic?.title}</span>
              </nav>

              {/* Header */}
              <div className="border-b border-gray-200/20 dark:border-gray-700/30 bg-white/40 dark:bg-gray-900/20 backdrop-blur-sm rounded-2xl p-8 mb-8">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                          <BookOpen className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      
                      <h1 
                        ref={titleRef}
                        className={`Marquee-title-no-border ${isTitleInViewport ? 'in-viewport' : ''} mb-4`}
                      >
                        {currentTopic?.title}
                      </h1>
                      
                      <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed">
                        {currentTopic?.description}
                      </p>
                    </div>
                    
                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 lg:w-64">
                      <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-4 border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                            <Code2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">
                              {currentTopic?.exercises}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Exercises</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-4 border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                            <Trophy className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">
                              {currentTopic?.maxXP}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Max XP</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Content Sections */}
              <div className="space-y-8">
                {/* Theory Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl p-8 shadow-lg border border-white/20 dark:border-gray-700/20"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h2 className="text-2xl font-poppins font-semibold text-gray-900 dark:text-white">Theory</h2>
                  </div>
                  
                  <div className="prose prose-gray dark:prose-invert max-w-none">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                      {currentTopic?.content.theory}
                    </p>
                  </div>
                </motion.div>

                {/* Code Example Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl p-8 shadow-lg border border-white/20 dark:border-gray-700/20"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                      <Code2 className="w-4 h-4 text-green-600 dark:text-green-400" />
                    </div>
                    <h2 className="text-2xl font-poppins font-semibold text-gray-900 dark:text-white">Code Example</h2>
                  </div>

                  <div className="bg-gray-900 rounded-xl p-6 overflow-x-auto">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <pre className="text-sm text-gray-300 font-mono leading-relaxed">
                      <code>{currentTopic?.content.codeExample}</code>
                    </pre>
                  </div>
                </motion.div>

                {/* Key Points Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl p-8 shadow-lg border border-white/20 dark:border-gray-700/20"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                      <Lightbulb className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <h2 className="text-2xl font-poppins font-semibold text-gray-900 dark:text-white">Key Points</h2>
                  </div>

                  <ul className="space-y-3">
                    {currentTopic?.content.keyPoints.map((point, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mt-0.5 shrink-0">
                          <CheckCircle className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                        </div>
                        <span className="text-gray-700 dark:text-gray-300 leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Quick Actions Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl p-8 shadow-lg border border-white/20 dark:border-gray-700/20"
                >
                  <div className="grid md:grid-cols-2 gap-4">
                    <button
                      onClick={handleTakeQuiz}
                      className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl transition-all duration-300 hover:shadow-lg"
                    >
                      <Trophy className="w-5 h-5" />
                      <span className="font-medium">Take Quiz</span>
                    </button>

                    <button className="flex items-center gap-3 p-4 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-xl transition-all duration-300">
                      <FileText className="w-5 h-5" />
                      <span className="font-medium">View Notes</span>
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseTopics;
