import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import { AuthModalProvider } from './context/AuthModalContext'

// Import motion for animations and useInViewport hook
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import useInViewport from './hooks/useInViewport'
import FloatingCodeWords from './components/FloatingCodeWords'
import LoadingScreen from './components/LoadingScreen'

// Homepage component
const HomePage = () => {
  const navigate = useNavigate()
  const [bottomTextRef, isBottomTextInViewport] = useInViewport()

  // Typewriter effect state
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const fullText = "TECHLEARN"
  const headingRef = useRef(null)

  // Card popup state
  const [selectedCard, setSelectedCard] = useState(null)

  // Card data
  const cardData = {
    LEARN: {
      title: "LEARN",
      description: "Master programming fundamentals with our comprehensive courses",
      features: ["Interactive Tutorials", "Hands-on Projects", "Expert Mentorship", "Progress Tracking"],
      color: "from-blue-400 to-blue-600"
    },
    BUILD: {
      title: "BUILD",
      description: "Create real-world projects and build your portfolio",
      features: ["Project-Based Learning", "Code Reviews", "Industry Standards", "Portfolio Development"],
      color: "from-purple-400 to-purple-600"
    },
    GROW: {
      title: "GROW",
      description: "Advance your career with placement support and networking",
      features: ["Career Guidance", "Interview Prep", "Job Placement", "Professional Network"],
      color: "from-emerald-400 to-emerald-600"
    }
  }

  // Custom viewport detection for typewriter - triggers every time
  useEffect(() => {
    const element = headingRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isTyping) {
          // Start typewriter effect
          setIsTyping(true)
          setDisplayedText("")
          setCurrentIndex(0)
        } else if (!entry.isIntersecting && isTyping) {
          // Reset when out of viewport
          setIsTyping(false)
          setDisplayedText("")
          setCurrentIndex(0)
        }
      },
      {
        threshold: 0.3, // Trigger when 30% of element is visible
        rootMargin: '0px'
      }
    )

    observer.observe(element)
    return () => observer.unobserve(element)
  }, [isTyping])

  // Typewriter animation
  useEffect(() => {
    if (isTyping && currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + fullText[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, 200) // 200ms delay between each character

      return () => clearTimeout(timeout)
    } else if (isTyping && currentIndex >= fullText.length) {
      // Animation complete, but keep isTyping true to prevent retriggering
      // until element leaves viewport
    }
  }, [currentIndex, fullText, isTyping])

  return (
    <div className="bg-transparent dark:bg-transparent relative">
      {/* Extended Floating Code Words Background Effect - Covers hero + code editor */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ height: 'calc(70vh + 600px)' }}>
        <FloatingCodeWords />
      </div>

      {/* Hero Section - Fresh start with perfect centering */}
      <div className="h-[70vh] flex flex-col items-center justify-center px-6 relative">
        {/* Content Container - Above floating words */}
        <div className="relative z-10 flex flex-col items-center justify-center">
          {/* TECHLEARN Heading with True Typewriter Effect */}
          <h1
            ref={headingRef}
            className="Marquee-title-no-border text-6xl md:text-7xl lg:text-8xl xl:text-9xl tracking-[0.15em] text-center mb-6"
            style={{ letterSpacing: '0.15em' }}
          >
            {displayedText}
            {isTyping && currentIndex < fullText.length && (
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-blue-500"
              >
                |
              </motion.span>
            )}
          </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 font-medium text-center mb-8">
          The platform loved by student coders.
        </p>

        {/* Start for Free Button */}
        <button
          onClick={() => navigate('/learn')}
          className="bg-white hover:bg-gray-50 text-gray-900 px-8 py-3 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          Start for Free
        </button>
        </div>
      </div>

      {/* 3D Code Editor Section - Flows right after hero */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        id="code-editor-section"
        className="relative flex justify-center items-center"
        style={{perspective: '1000px'}}
      >
        <motion.div
          initial={{ opacity: 0, rotateX: 45 }}
          whileInView={{ opacity: 1, rotateX: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.5 }}
          className="w-full max-w-4xl mx-6 h-96 md:h-[500px] bg-gray-800 rounded-xl overflow-hidden flex flex-col"
          style={{
            transformOrigin: 'center',
            boxShadow: '0 30px 50px rgba(0, 0, 0, 0.4), 0 -15px 30px rgba(0, 0, 0, 0.25)'
          }}
        >
          {/* Editor Header */}
          <div className="bg-gray-800 px-4 py-3 text-white font-bold flex items-center gap-3">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500 shadow-sm"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-sm"></div>
              <div className="w-3 h-3 rounded-full bg-green-500 shadow-sm"></div>
            </div>
            <span>index.html</span>
          </div>

          {/* Editor Content */}
          <div className="flex-1 p-5 text-gray-300 font-mono text-sm md:text-base overflow-auto whitespace-pre-wrap">
{`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Website</title>
  <style>
    body {
      margin: 0;
      font-family: Arial, sans-serif;
      background-color: #f0f0f0;
      color: #333;
    }
    header, footer {
      background-color: #6200ea;
      color: white;
      padding: 1rem;
      text-align: center;
    }
    main {
      padding: 2rem;
      text-align: center;
    }
    button {
      background-color: #6200ea;
      color: white;
      padding: 0.5rem 1rem;
      border: none;
      cursor: pointer;
      border-radius: 5px;
    }
  </style>
</head>
<body>
  <header>
    <h1>Welcome to My Website</h1>
  </header>
  <main>
    <p>Click the button to see a greeting in the console!</p>
    <button onclick="greetUser('Visitor')">Greet Me</button>
  </main>
  <footer>
    © 2025 My Website
  </footer>
  <script>
    function greetUser(name) {
      console.log(\`Hello, \${name}! Welcome to my website.\`);
    }
  </script>
</body>
</html>`}
          </div>
        </motion.div>
      </motion.div>

      {/* Heading Section - Right after placeholder */}
      <div className="pt-16 pb-8 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="max-w-6xl mx-auto text-center"
        >
          <h2
            ref={bottomTextRef}
            className={`text-xl md:text-2xl lg:text-3xl font-bold ${isBottomTextInViewport ? 'in-viewport' : ''} brand-heading-primary`}
          >
            We turn curious students into confident, real-world coders.
          </h2>
        </motion.div>
      </div>

      {/* Three Cards Section - LEARN, BUILD, GROW */}
      <div className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="h-80 w-full overflow-hidden font-sans flex items-center justify-center"
          >
            <div className="flex h-full w-full">
              {/* LEARN Card */}
              <div
                onClick={() => setSelectedCard('LEARN')}
                className="h-full flex-1 flex items-center justify-center font-semibold tracking-wide transition-all duration-100 ease-linear cursor-pointer text-white hover:flex-[2] hover:shadow-[rgba(255,255,255,0.5)_0px_7px_29px_0px]"
                style={{ backgroundColor: 'rgba(102, 181, 255, 0.35)' }}
              >
                <span className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white drop-shadow-lg brand-heading-primary hover-gradient-text">
                  LEARN
                </span>
              </div>

              {/* BUILD Card */}
              <div
                onClick={() => setSelectedCard('BUILD')}
                className="h-full flex-1 flex items-center justify-center font-semibold tracking-wide transition-all duration-100 ease-linear cursor-pointer text-white hover:flex-[2] hover:shadow-[rgba(255,255,255,0.5)_0px_7px_29px_0px]"
                style={{ backgroundColor: 'rgba(51, 140, 255, 0.35)' }}
              >
                <span className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white drop-shadow-lg brand-heading-primary hover-gradient-text">
                  BUILD
                </span>
              </div>

              {/* GROW Card */}
              <div
                onClick={() => setSelectedCard('GROW')}
                className="h-full flex-1 flex items-center justify-center font-semibold tracking-wide transition-all duration-100 ease-linear cursor-pointer text-white hover:flex-[2] hover:shadow-[rgba(255,255,255,0.5)_0px_7px_29px_0px]"
                style={{ backgroundColor: 'rgba(0, 102, 255, 0.35)' }}
              >
                <span className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white drop-shadow-lg brand-heading-primary hover-gradient-text">
                  GROW
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Card Details Popup */}
      <AnimatePresence>
        {selectedCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedCard(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/20 max-w-lg w-full p-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCard(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-200/50 dark:bg-gray-700/50 flex items-center justify-center hover:bg-gray-300/50 dark:hover:bg-gray-600/50 transition-colors"
              >
                <span className="text-gray-600 dark:text-gray-300 text-lg">×</span>
              </button>

            {/* Card Content */}
            <div className="text-center">
              <h3 className={`text-4xl font-bold mb-4 bg-gradient-to-r ${cardData[selectedCard].color} bg-clip-text text-transparent`}>
                {cardData[selectedCard].title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">
                {cardData[selectedCard].description}
              </p>

              {/* Features List */}
              <div className="space-y-3">
                {cardData[selectedCard].features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${cardData[selectedCard].color}`}></div>
                    <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
        )}
      </AnimatePresence>

      {/* Learn Reviews Section */}
      <div className="min-h-screen flex flex-col md:flex-row overflow-hidden">
        {/* Left column scrolling up */}
        <div className="flex-1 flex flex-col justify-start items-center overflow-hidden relative">
          <div className="flex flex-col gap-5 animate-scroll-up">
            <div className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-lg rounded-3xl p-5 min-h-[100px] w-70 shadow-sm border border-white/5 dark:border-gray-700/5">
              <div className="font-bold mb-2 text-gray-800 dark:text-gray-200">Ananya</div>
              <div className="text-gray-600 dark:text-gray-300">I loved the training experience. Super clear and helpful!</div>
            </div>
            <div className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-lg rounded-3xl p-5 min-h-[100px] w-70 shadow-sm border border-white/5 dark:border-gray-700/5">
              <div className="font-bold mb-2 text-gray-800 dark:text-gray-200">Rohan</div>
              <div className="text-gray-600 dark:text-gray-300">Got my dream job thanks to these placement sessions.</div>
            </div>
            <div className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-lg rounded-3xl p-5 min-h-[100px] w-70 shadow-sm border border-white/5 dark:border-gray-700/5">
              <div className="font-bold mb-2 text-gray-800 dark:text-gray-200">Priya</div>
              <div className="text-gray-600 dark:text-gray-300">Mentors are supportive, practical sessions are on point.</div>
            </div>
            <div className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-lg rounded-3xl p-5 min-h-[100px] w-70 shadow-sm border border-white/5 dark:border-gray-700/5">
              <div className="font-bold mb-2 text-gray-800 dark:text-gray-200">Arjun</div>
              <div className="text-gray-600 dark:text-gray-300">Practical sessions rock! I feel so confident now.</div>
            </div>
            <div className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-lg rounded-3xl p-5 min-h-[100px] w-70 shadow-sm border border-white/5 dark:border-gray-700/5">
              <div className="font-bold mb-2 text-gray-800 dark:text-gray-200">Simran</div>
              <div className="text-gray-600 dark:text-gray-300">Worth every penny — best decision ever.</div>
            </div>
            {/* Repeat for seamless scroll */}
            <div className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-lg rounded-3xl p-5 min-h-[100px] w-70 shadow-sm border border-white/5 dark:border-gray-700/5">
              <div className="font-bold mb-2 text-gray-800 dark:text-gray-200">Ananya</div>
              <div className="text-gray-600 dark:text-gray-300">I loved the training experience. Super clear and helpful!</div>
            </div>
          </div>
        </div>

        {/* Center heading */}
        <div className="flex-none flex items-center justify-center px-5 py-5 md:py-0">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center overflow-visible">
            <span className="italic hover-gradient-text pr-2" style={{ display: 'inline-block' }}>learn</span> <span className="hover-gradient-text">REVIEWS</span>
          </h2>
        </div>

        {/* Right column scrolling down */}
        <div className="flex-1 flex flex-col justify-start items-center overflow-hidden relative">
          <div className="flex flex-col gap-5 animate-scroll-down">
            <div className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-lg rounded-3xl p-5 min-h-[100px] w-70 shadow-sm border border-white/5 dark:border-gray-700/5">
              <div className="font-bold mb-2 text-gray-800 dark:text-gray-200">Manoj</div>
              <div className="text-gray-600 dark:text-gray-300">Awesome placement help — landed interviews fast!</div>
            </div>
            <div className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-lg rounded-3xl p-5 min-h-[100px] w-70 shadow-sm border border-white/5 dark:border-gray-700/5">
              <div className="font-bold mb-2 text-gray-800 dark:text-gray-200">Sana</div>
              <div className="text-gray-600 dark:text-gray-300">Concepts were crystal clear. Thank you, team!</div>
            </div>
            <div className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-lg rounded-3xl p-5 min-h-[100px] w-70 shadow-sm border border-white/5 dark:border-gray-700/5">
              <div className="font-bold mb-2 text-gray-800 dark:text-gray-200">Akash</div>
              <div className="text-gray-600 dark:text-gray-300">5 stars. Trainers really care about students.</div>
            </div>
            <div className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-lg rounded-3xl p-5 min-h-[100px] w-70 shadow-sm border border-white/5 dark:border-gray-700/5">
              <div className="font-bold mb-2 text-gray-800 dark:text-gray-200">Divya</div>
              <div className="text-gray-600 dark:text-gray-300">Boosted my confidence and skills for real jobs.</div>
            </div>
            <div className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-lg rounded-3xl p-5 min-h-[100px] w-70 shadow-sm border border-white/5 dark:border-gray-700/5">
              <div className="font-bold mb-2 text-gray-800 dark:text-gray-200">Rahul</div>
              <div className="text-gray-600 dark:text-gray-300">Highly recommended for job-focused training.</div>
            </div>
            {/* Repeat for seamless scroll */}
            <div className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-lg rounded-3xl p-5 min-h-[100px] w-70 shadow-sm border border-white/5 dark:border-gray-700/5">
              <div className="font-bold mb-2 text-gray-800 dark:text-gray-200">Manoj</div>
              <div className="text-gray-600 dark:text-gray-300">Awesome placement help — landed interviews fast!</div>
            </div>
          </div>
        </div>
      </div>

      {/* Placement Partner Universities Section */}
      <div className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black dark:text-white mb-4">
              Placement Partner Universities
            </h2>
          </motion.div>

          {/* University Logos */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex justify-center"
          >
            <img
              src="/placement-light.png"
              alt="Placement Partner Universities - Vidya Jyothi Institute of Technology, VNR Vignana Jyothi Institute of Engineering and Technology, Mahindra University"
              className="w-full max-w-5xl h-auto object-contain dark:hidden"
            />
            {/* Dark mode image - will be added when you provide it */}
            <img
              src="/placement-dark.png"
              alt="Placement Partner Universities - Vidya Jyothi Institute of Technology, VNR Vignana Jyothi Institute of Engineering and Technology, Mahindra University"
              className="w-full max-w-5xl h-auto object-contain hidden dark:block"
            />
          </motion.div>
        </div>
      </div>
    </div>
  )
}

const BuildPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for consistency
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingScreen showMessage={false} size={48} duration={800} />;
  }

  return (
    <div className="min-h-screen pt-24 pb-16 flex items-center justify-center bg-transparent dark:bg-transparent">
      <div className="max-w-md mx-auto text-center">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Build Page</h1>
        <p className="text-gray-600 dark:text-gray-300">Coming soon...</p>
      </div>
    </div>
  );
};

const CareersPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for consistency
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingScreen showMessage={false} size={48} duration={800} />;
  }

  return (
    <div className="min-h-screen pt-24 pb-16 flex items-center justify-center bg-transparent dark:bg-transparent">
      <div className="max-w-md mx-auto text-center">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Careers Page</h1>
        <p className="text-gray-600 dark:text-gray-300">Coming soon...</p>
      </div>
    </div>
  );
};



// Import Learn components
import LearnMain from './pages/Learn/LearnMain'
import Courses from './pages/Learn/Courses'
import AllCourses from './pages/Learn/AllCourses'
import CourseDetails from './pages/Learn/CourseDetails'
import CourseQuiz from './pages/Learn/CourseQuiz'
import CourseTopics from './pages/Learn/CourseTopics'
import LiveBatchDetails from './pages/Learn/LiveBatchDetails'

// Import Exercise components
import Exercises from './pages/Learn/Exercises'
import ExercisesList from './pages/Learn/ExercisesList'
import ExerciseDetail from './pages/Learn/ExerciseDetail'

// Import Certification components
import Certification from './pages/Learn/Certification'
import CertificationPayment from './pages/Learn/CertificationPayment'

// Import Compiler component
import OnlineCompiler from './pages/Learn/OnlineCompiler'



// Auth components are now handled by modals in AuthModalProvider
// Login and Register pages are deprecated

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AuthModalProvider>
          <Router>
            <ScrollToTop />
            <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#daf0fa] via-[#bceaff] to-[#bceaff] dark:from-[#020b23] dark:via-[#001233] dark:to-[#0a1128] transition-all duration-300">
              <Navbar />
              <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/learn" element={<LearnMain />} />
                <Route path="/learn/courses" element={<Courses />} />
                <Route path="/learn/courses/all" element={<AllCourses />} />
                <Route path="/learn/courses/:courseId" element={<CourseDetails />} />
                <Route path="/learn/courses/:courseId/topics" element={<CourseTopics />} />
                <Route path="/learn/courses/:courseId/quiz" element={<CourseQuiz />} />
                <Route path="/learn/batches/:batchId" element={<LiveBatchDetails />} />
                <Route path="/learn/exercises" element={<Exercises />} />
                <Route path="/learn/exercises/:courseId" element={<ExercisesList />} />
                <Route path="/learn/exercises/:courseId/:exerciseId" element={<ExerciseDetail />} />
                <Route path="/learn/certification" element={<Certification />} />
                <Route path="/learn/certification/payment" element={<CertificationPayment />} />
                <Route path="/learn/compiler" element={<OnlineCompiler />} />

                <Route path="/build" element={<BuildPage />} />
                <Route path="/careers" element={<CareersPage />} />
                {/* Login and Register routes removed - now handled by modals */}
              </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </AuthModalProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
