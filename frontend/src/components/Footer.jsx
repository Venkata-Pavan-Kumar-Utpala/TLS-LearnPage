import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-[#04143b] text-white relative overflow-hidden">
      {/* Top Section with Centered Columns */}
      <div className="py-16 pb-64 flex flex-col items-center">
        <div className="w-full max-w-5xl flex flex-col md:flex-row justify-center items-start md:space-x-32 text-center md:text-left">
          {/* CONNECT Section */}
          <div className="flex-1 mb-10 md:mb-0">
            <h3 className="font-bold text-white mb-4 text-lg uppercase tracking-wide">CONNECT</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white text-base transition-colors duration-300"
                >
                  YouTube
                </a>
              </li>
              <li>
                <a
                  href="https://whatsapp.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white text-base transition-colors duration-300"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white text-base transition-colors duration-300"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>

          {/* LEARN Section */}
          <div className="flex-1 mb-10 md:mb-0">
            <h3 className="font-bold text-white mb-4 text-lg uppercase tracking-wide">LEARN</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/courses"
                  className="text-gray-300 hover:text-white text-base transition-colors duration-300"
                >
                  Paid Courses
                </Link>
              </li>
              <li>
                <Link
                  to="/resources"
                  className="text-gray-300 hover:text-white text-base transition-colors duration-300"
                >
                  Free Resources
                </Link>
              </li>
              <li>
                <Link
                  to="/blogs"
                  className="text-gray-300 hover:text-white text-base transition-colors duration-300"
                >
                  Blogs
                </Link>
              </li>
            </ul>
          </div>

          {/* COMPANY Section */}
          <div className="flex-1">
            <h3 className="font-bold text-white mb-4 text-lg uppercase tracking-wide">COMPANY</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-gray-300 hover:text-white text-base transition-colors duration-300"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  className="text-gray-300 hover:text-white text-base transition-colors duration-300"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-300 hover:text-white text-base transition-colors duration-300"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Logo Section - Overlapping, spans full width */}
      <div className="absolute bottom-0 left-0 w-full pointer-events-none select-none">
        <img
          src="/logo-no-bg.jpg"
          alt="TechLearn Solutions"
          className="w-full h-44 md:h-60 object-cover object-bottom"
          draggable="false"
        />
      </div>
    </footer>
  )
}

export default Footer
