import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { useAuthModalContext } from '../context/AuthModalContext'
import { useAuth } from '../context/AuthContext'
import XPBadge from './XPBadge'

const Navbar = () => {
  const { theme, toggleTheme } = useTheme()
  const { openLogin } = useAuthModalContext()
  const { isAuthenticated, user, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  // Handle scroll to hide/show navbar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const isDarkMode = theme === 'dark'

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <nav className="flex justify-between items-center px-4 md:px-15 py-2.5 md:py-8 bg-transparent relative z-[1000]">
        {/* Logo */}
        <div className="logo">
          <Link to="/" className="logo">
            <img
              src="/logoo.png"
              alt="Light Logo"
              className={`h-12 md:h-19 w-auto transition-all duration-300 ${isDarkMode ? 'hidden' : 'inline'}`}
            />
            <img
              src="/logoo2.png"
              alt="Dark Logo"
              className={`h-12 md:h-19 w-auto transition-all duration-300 ${isDarkMode ? 'inline' : 'hidden'}`}
            />
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center" style={{ gap: '62px' }}>
          <Link
            to="/learn"
            className={`relative text-[15px] font-extralight transition-colors duration-300 hover:after:w-full after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-px after:bg-current after:transition-all after:duration-300 ${
              isDarkMode
                ? 'text-[#e0e6f5] hover:text-white'
                : 'text-[#00184f]'
            }`}
          >
            Learn
          </Link>
          <Link
            to="/build"
            className={`relative text-[15px] font-extralight transition-colors duration-300 hover:after:w-full after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-px after:bg-current after:transition-all after:duration-300 ${
              isDarkMode
                ? 'text-[#e0e6f5] hover:text-white'
                : 'text-[#00184f]'
            }`}
          >
            Build
          </Link>
          <Link
            to="/careers"
            className={`relative text-[15px] font-extralight transition-colors duration-300 hover:after:w-full after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-px after:bg-current after:transition-all after:duration-300 ${
              isDarkMode
                ? 'text-[#e0e6f5] hover:text-white'
                : 'text-[#00184f]'
            }`}
          >
            Careers
          </Link>
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <span className={`text-[15px] font-extralight ${
                isDarkMode ? 'text-[#e0e6f5]' : 'text-[#00184f]'
              }`}>
                Hi, {user?.firstName || user?.email || 'User'}
              </span>
              <button
                onClick={logout}
                className={`relative text-[15px] font-extralight transition-colors duration-300 hover:after:w-full after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-px after:bg-current after:transition-all after:duration-300 ${
                  isDarkMode
                    ? 'text-[#e0e6f5] hover:text-white'
                    : 'text-[#00184f]'
                }`}
              >
                Log Out
              </button>
            </div>
          ) : (
            <button
              onClick={openLogin}
              className={`relative text-[15px] font-extralight transition-colors duration-300 hover:after:w-full after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-px after:bg-current after:transition-all after:duration-300 ${
                isDarkMode
                  ? 'text-[#e0e6f5] hover:text-white'
                  : 'text-[#00184f]'
              }`}
            >
              Log In
            </button>
          )}

          {/* XP Badge */}
          <XPBadge />

          {/* Dark Mode Toggle - Desktop */}
          <button
            onClick={toggleTheme}
            className={`text-[15px] transition-colors duration-300 ${
              isDarkMode
                ? 'text-[#e0e6f5] hover:text-white'
                : 'text-[#00184f]'
            }`}
            aria-label="Toggle dark mode"
          >
            <i className={`fas ${isDarkMode ? 'fa-sun' : 'fa-moon'}`}></i>
          </button>
        </nav>

        {/* Mobile Menu Toggle */}
        <div
          className={`md:hidden flex justify-center items-center cursor-pointer transition-all duration-300 ${
            isMenuOpen ? 'flex-col gap-[5px]' : 'gap-[5px]'
          }`}
          onClick={toggleMenu}
        >
          <span className={`w-[6px] h-[6px] rounded-full transition-all duration-300 ${
            isDarkMode ? 'bg-[#e0e6f5]' : 'bg-black'
          }`}></span>
          <span className={`w-[6px] h-[6px] rounded-full transition-all duration-300 ${
            isDarkMode ? 'bg-[#e0e6f5]' : 'bg-black'
          }`}></span>
          <span className={`w-[6px] h-[6px] rounded-full transition-all duration-300 ${
            isDarkMode ? 'bg-[#e0e6f5]' : 'bg-black'
          }`}></span>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      <nav className={`md:hidden ${isMenuOpen ? 'flex' : 'hidden'} absolute top-full left-0 w-screen flex-col gap-2 px-5 py-2 shadow-lg z-[999] transition-all duration-300 ${
        isDarkMode
          ? 'bg-gradient-to-r from-[#0a1128] via-[#001233] to-[#0a1128]'
          : 'bg-gradient-to-r from-[#daf0fa] via-[#bceaff] to-[#bceaff]'
      }`} style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
        <Link
          to="/learn"
          onClick={closeMenu}
          className={`relative block py-2.5 text-[14px] transition-colors duration-300 hover:after:w-full after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-px after:bg-current after:transition-all after:duration-300 ${
            isDarkMode
              ? 'text-[#e0e6f5] hover:text-white'
              : 'text-black hover:text-[#333]'
          }`}
        >
          Learn
        </Link>
        <Link
          to="/build"
          onClick={closeMenu}
          className={`relative block py-2.5 text-[14px] transition-colors duration-300 hover:after:w-full after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-px after:bg-current after:transition-all after:duration-300 ${
            isDarkMode
              ? 'text-[#e0e6f5] hover:text-white'
              : 'text-black hover:text-[#333]'
          }`}
        >
          Build
        </Link>
        <Link
          to="/careers"
          onClick={closeMenu}
          className={`relative block py-2.5 text-[14px] transition-colors duration-300 hover:after:w-full after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-px after:bg-current after:transition-all after:duration-300 ${
            isDarkMode
              ? 'text-[#e0e6f5] hover:text-white'
              : 'text-black hover:text-[#333]'
          }`}
        >
          Careers
        </Link>
        {isAuthenticated ? (
          <div className="py-2.5">
            <div className={`text-[14px] mb-2 ${
              isDarkMode ? 'text-[#e0e6f5]' : 'text-black'
            }`}>
              Hi, {user?.firstName || user?.email || 'User'}
            </div>
            <button
              onClick={() => {
                closeMenu();
                logout();
              }}
              className={`relative block py-2.5 text-[14px] transition-colors duration-300 hover:after:w-full after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-px after:bg-current after:transition-all after:duration-300 ${
                isDarkMode
                  ? 'text-[#e0e6f5] hover:text-white'
                  : 'text-black hover:text-[#333]'
              }`}
            >
              Log Out
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
              closeMenu();
              openLogin();
            }}
            className={`relative block py-2.5 text-[14px] transition-colors duration-300 hover:after:w-full after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-px after:bg-current after:transition-all after:duration-300 ${
              isDarkMode
                ? 'text-[#e0e6f5] hover:text-white'
                : 'text-black hover:text-[#333]'
            }`}
          >
            Log In
          </button>
        )}

        {/* XP Badge - Mobile */}
        <div className="py-2">
          <XPBadge />
        </div>

        {/* Dark Mode Toggle - Mobile */}
        <button
          onClick={toggleTheme}
          className={`text-[15px] transition-colors duration-300 ${
            isDarkMode
              ? 'text-[#e0e6f5] hover:text-white'
              : 'text-[#00184f]'
          }`}
          aria-label="Toggle dark mode"
        >
          <i className={`fas ${isDarkMode ? 'fa-sun' : 'fa-moon'}`}></i>
        </button>
      </nav>
    </header>
  )
}

export default Navbar
