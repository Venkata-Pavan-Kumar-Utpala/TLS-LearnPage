import HeroSection from '../../components/HeroSection'
import SectionsList from '../../components/SectionsList'
import ScrollProgress from '../../components/ScrollProgress'
import XPTracker from '../../components/XPTracker'

const LearnMain = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Header Section with enhanced styling */}
      <HeroSection />

      {/* XP Tracker */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 mb-8">
        <XPTracker showDetailed={true} />
      </div>

      {/* Main Content with enhanced cards */}
      <SectionsList />
    </div>
  )
}

export default LearnMain
