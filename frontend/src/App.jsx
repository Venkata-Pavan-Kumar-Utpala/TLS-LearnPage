import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

// Temporary components for testing
const HomePage = () => (
  <div className="min-h-screen pt-24 pb-16">
    {/* Empty homepage - ready for content */}
  </div>
)

const LearnPage = () => (
  <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
    <div className="max-w-md mx-auto text-center">
      <h1 className="text-3xl font-bold mb-6">Learn Page</h1>
      <p className="text-gray-600">This will be our main Learn page!</p>
    </div>
  </div>
)

const BuildPage = () => (
  <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
    <div className="max-w-md mx-auto text-center">
      <h1 className="text-3xl font-bold mb-6">Build Page</h1>
      <p className="text-gray-600">Coming soon...</p>
    </div>
  </div>
)

const CareersPage = () => (
  <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
    <div className="max-w-md mx-auto text-center">
      <h1 className="text-3xl font-bold mb-6">Careers Page</h1>
      <p className="text-gray-600">Coming soon...</p>
    </div>
  </div>
)

const LoginPage = () => (
  <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
    <div className="max-w-md mx-auto text-center">
      <h1 className="text-3xl font-bold mb-6">Login Page</h1>
      <p className="text-gray-600">Coming soon...</p>
    </div>
  </div>
)

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/learn" element={<LearnPage />} />
            <Route path="/build" element={<BuildPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  )
}

export default App
