import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import { AuthModalProvider } from './context/AuthModalContext'

// Import motion for animations and useInViewport hook
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import useInViewport from './hooks/useInViewport'

// Homepage component
const HomePage = () => {
  const navigate = useNavigate()
  const [headingRef, isHeadingInViewport] = useInViewport()
  const [bottomTextRef, isBottomTextInViewport] = useInViewport()

  return (
    <div className="bg-transparent dark:bg-transparent">
      {/* Top Section - Header, Subtitle, Button */}
      <div className="min-h-screen flex flex-col items-center justify-center px-6 relative">
        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-12 z-10"
        >
          <h1
            ref={headingRef}
            className={`Marquee-title-no-border text-6xl md:text-7xl lg:text-8xl xl:text-9xl tracking-[0.15em] mb-6 ${isHeadingInViewport ? 'in-viewport' : ''}`}
            style={{
              letterSpacing: '0.15em'
            }}
          >
            TECHLEARN
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 font-medium mb-8">
            The platform loved by student coders.
          </p>

          {/* Start for Free Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            onClick={() => navigate('/learn')}
            className="bg-white hover:bg-gray-50 text-gray-900 px-8 py-3 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Start for Free
          </motion.button>
        </motion.div>


      </div>

      {/* Second Page - 3D Code Editor continues here */}
      <div className="min-h-screen relative flex justify-center items-center" style={{perspective: '1000px'}}>
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
      </div>

      {/* Heading Section - Right after placeholder */}
      <div className="pt-4 pb-8 flex justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center"
        >
          <h2
            ref={bottomTextRef}
            className={`Marquee-title-no-border ${isBottomTextInViewport ? 'in-viewport' : ''} max-w-6xl mx-auto`}
          >
            We turn curious students into confident, real-world coders.
          </h2>
        </motion.div>
      </div>

      {/* Three Cards Section - LEARN, BUILD, GROW */}
      <div className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* LEARN Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative"
            >
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 dark:border-gray-700/20 h-80 w-full">
                {/* Empty placeholder content */}
              </div>
              <div className="text-center mt-6">
                <h3 className="text-2xl md:text-3xl font-bold text-blue-900 dark:text-blue-100 italic">
                  LEARN
                </h3>
              </div>
            </motion.div>

            {/* BUILD Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative"
            >
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 dark:border-gray-700/20 h-80 w-full">
                {/* Empty placeholder content */}
              </div>
              <div className="text-center mt-6">
                <h3 className="text-2xl md:text-3xl font-bold text-blue-900 dark:text-blue-100 italic">
                  BUILD
                </h3>
              </div>
            </motion.div>

            {/* GROW Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative"
            >
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 dark:border-gray-700/20 h-80 w-full">
                {/* Empty placeholder content */}
              </div>
              <div className="text-center mt-6">
                <h3 className="text-2xl md:text-3xl font-bold text-blue-900 dark:text-blue-100 italic">
                  GROW
                </h3>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Learn Reviews Section */}
      <div className="min-h-screen flex flex-col md:flex-row overflow-hidden">
        {/* Left column scrolling up */}
        <div className="flex-1 flex flex-col justify-start items-center overflow-hidden relative">
          <div className="flex flex-col gap-5 animate-scroll-up">
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl p-5 min-h-[100px] w-70 shadow-xl border border-white/20 dark:border-gray-700/20">
              <div className="font-bold mb-2 text-gray-800 dark:text-gray-200">Ananya</div>
              <div className="text-gray-600 dark:text-gray-300">I loved the training experience. Super clear and helpful!</div>
            </div>
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl p-5 min-h-[100px] w-70 shadow-xl border border-white/20 dark:border-gray-700/20">
              <div className="font-bold mb-2 text-gray-800 dark:text-gray-200">Rohan</div>
              <div className="text-gray-600 dark:text-gray-300">Got my dream job thanks to these placement sessions.</div>
            </div>
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl p-5 min-h-[100px] w-70 shadow-xl border border-white/20 dark:border-gray-700/20">
              <div className="font-bold mb-2 text-gray-800 dark:text-gray-200">Priya</div>
              <div className="text-gray-600 dark:text-gray-300">Mentors are supportive, practical sessions are on point.</div>
            </div>
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl p-5 min-h-[100px] w-70 shadow-xl border border-white/20 dark:border-gray-700/20">
              <div className="font-bold mb-2 text-gray-800 dark:text-gray-200">Arjun</div>
              <div className="text-gray-600 dark:text-gray-300">Practical sessions rock! I feel so confident now.</div>
            </div>
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl p-5 min-h-[100px] w-70 shadow-xl border border-white/20 dark:border-gray-700/20">
              <div className="font-bold mb-2 text-gray-800 dark:text-gray-200">Simran</div>
              <div className="text-gray-600 dark:text-gray-300">Worth every penny — best decision ever.</div>
            </div>
            {/* Repeat for seamless scroll */}
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl p-5 min-h-[100px] w-70 shadow-xl border border-white/20 dark:border-gray-700/20">
              <div className="font-bold mb-2 text-gray-800 dark:text-gray-200">Ananya</div>
              <div className="text-gray-600 dark:text-gray-300">I loved the training experience. Super clear and helpful!</div>
            </div>
          </div>
        </div>

        {/* Center heading */}
        <div className="flex-none flex items-center justify-center px-5 py-5 md:py-0">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-900 dark:text-blue-100 text-center">
            <span className="italic">learn</span> REVIEWS
          </h2>
        </div>

        {/* Right column scrolling down */}
        <div className="flex-1 flex flex-col justify-start items-center overflow-hidden relative">
          <div className="flex flex-col gap-5 animate-scroll-down">
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl p-5 min-h-[100px] w-70 shadow-xl border border-white/20 dark:border-gray-700/20">
              <div className="font-bold mb-2 text-gray-800 dark:text-gray-200">Manoj</div>
              <div className="text-gray-600 dark:text-gray-300">Awesome placement help — landed interviews fast!</div>
            </div>
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl p-5 min-h-[100px] w-70 shadow-xl border border-white/20 dark:border-gray-700/20">
              <div className="font-bold mb-2 text-gray-800 dark:text-gray-200">Sana</div>
              <div className="text-gray-600 dark:text-gray-300">Concepts were crystal clear. Thank you, team!</div>
            </div>
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl p-5 min-h-[100px] w-70 shadow-xl border border-white/20 dark:border-gray-700/20">
              <div className="font-bold mb-2 text-gray-800 dark:text-gray-200">Akash</div>
              <div className="text-gray-600 dark:text-gray-300">5 stars. Trainers really care about students.</div>
            </div>
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl p-5 min-h-[100px] w-70 shadow-xl border border-white/20 dark:border-gray-700/20">
              <div className="font-bold mb-2 text-gray-800 dark:text-gray-200">Divya</div>
              <div className="text-gray-600 dark:text-gray-300">Boosted my confidence and skills for real jobs.</div>
            </div>
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl p-5 min-h-[100px] w-70 shadow-xl border border-white/20 dark:border-gray-700/20">
              <div className="font-bold mb-2 text-gray-800 dark:text-gray-200">Rahul</div>
              <div className="text-gray-600 dark:text-gray-300">Highly recommended for job-focused training.</div>
            </div>
            {/* Repeat for seamless scroll */}
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl p-5 min-h-[100px] w-70 shadow-xl border border-white/20 dark:border-gray-700/20">
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

const BuildPage = () => (
  <div className="min-h-screen pt-24 pb-16 flex items-center justify-center bg-transparent dark:bg-transparent">
    <div className="max-w-md mx-auto text-center">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Build Page</h1>
      <p className="text-gray-600 dark:text-gray-300">Coming soon...</p>
    </div>
  </div>
)

const CareersPage = () => (
  <div className="min-h-screen pt-24 pb-16 flex items-center justify-center bg-transparent dark:bg-transparent">
    <div className="max-w-md mx-auto text-center">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Careers Page</h1>
      <p className="text-gray-600 dark:text-gray-300">Coming soon...</p>
    </div>
  </div>
)



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
