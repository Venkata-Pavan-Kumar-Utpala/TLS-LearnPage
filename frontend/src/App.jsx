import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { ThemeProvider } from './context/ThemeContext'

// Temporary components for testing
const HomePage = () => (
  <div className="min-h-screen pt-24 pb-16 bg-transparent dark:bg-transparent">
    {/* Empty homepage - ready for content */}
  </div>
)

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

const LoginPage = () => (
  <div className="min-h-screen pt-24 pb-16 flex items-center justify-center bg-transparent dark:bg-transparent">
    <div className="max-w-md mx-auto text-center">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Login Page</h1>
      <p className="text-gray-600 dark:text-gray-300">Coming soon...</p>
    </div>
  </div>
)

// Import LearnMain component
import LearnMain from './pages/Learn/LearnMain'

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#daf0fa] via-[#bceaff] to-[#bceaff] dark:from-[#020b23] dark:via-[#001233] dark:to-[#0a1128] transition-all duration-300">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/learn" element={<LearnMain />} />
              <Route path="/build" element={<BuildPage />} />
              <Route path="/careers" element={<CareersPage />} />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App
