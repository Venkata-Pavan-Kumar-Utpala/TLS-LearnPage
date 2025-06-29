import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

const Book3D = () => {
  const bookRef = useRef(null);
  const coverRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Set initial 3D properties
    gsap.set(coverRef.current, {
      transformOrigin: "left center",
      backfaceVisibility: "hidden",
      rotateY: 0
    });
  }, []);

  const handleBookClick = () => {
    if (!isOpen) {
      // Open the book
      gsap.to(coverRef.current, {
        rotateY: -150,
        duration: 1.2,
        ease: "power2.inOut",
        transformOrigin: "left center"
      });
      setIsOpen(true);
    } else {
      // Close the book
      gsap.to(coverRef.current, {
        rotateY: 0,
        duration: 1.2,
        ease: "power2.inOut",
        transformOrigin: "left center"
      });
      setIsOpen(false);
    }
  };

  const handleBookHover = () => {
    if (!isOpen) {
      gsap.to(coverRef.current, {
        rotateY: -15,
        duration: 0.3,
        ease: "power2.out",
        transformOrigin: "left center"
      });
    }
  };

  const handleBookLeave = () => {
    if (!isOpen) {
      gsap.to(coverRef.current, {
        rotateY: 0,
        duration: 0.3,
        ease: "power2.out",
        transformOrigin: "left center"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-8">
      <div className="perspective-[1000px] cursor-pointer">
        <div
          ref={bookRef}
          className="relative w-64 h-80 md:w-80 md:h-96 transform-gpu preserve-3d transition-transform duration-300 hover:scale-105"
          onClick={handleBookClick}
          onMouseEnter={handleBookHover}
          onMouseLeave={handleBookLeave}
        >
          {/* Book Base/Pages */}
          <div className="absolute inset-0 bg-white rounded-r-lg shadow-2xl transform translate-z-[-2px]">
            {/* Page stack effect */}
            <div className="absolute inset-0 bg-gray-50 rounded-r-lg transform translate-z-[-1px] translate-x-[2px]"></div>
            <div className="absolute inset-0 bg-gray-100 rounded-r-lg transform translate-z-[-2px] translate-x-[4px]"></div>
            
            {/* Page content */}
            <div className="p-6 h-full flex flex-col justify-between">
              <div>
                <div className="space-y-3">
                  <div className="h-2 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-2 bg-gray-300 rounded w-full"></div>
                  <div className="h-2 bg-gray-300 rounded w-5/6"></div>
                  <div className="h-2 bg-gray-300 rounded w-2/3"></div>
                </div>
                
                <div className="mt-8 space-y-2">
                  <div className="h-2 bg-gray-200 rounded w-full"></div>
                  <div className="h-2 bg-gray-200 rounded w-4/5"></div>
                  <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-2 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-2 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto flex items-center justify-center">
                  <span className="text-2xl">📚</span>
                </div>
              </div>
            </div>
          </div>

          {/* Book Cover */}
          <div
            ref={coverRef}
            className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-lg shadow-2xl backface-hidden transform-gpu preserve-3d"
            style={{ 
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '30px 30px'
            }}
          >
            {/* Cover Content */}
            <div className="p-8 h-full flex flex-col justify-between text-white">
              <div>
                <div className="border-2 border-white/30 rounded p-4 mb-6">
                  <h1 className="text-2xl md:text-3xl font-bold font-serif leading-tight">
                    The Art of
                    <br />
                    <span className="italic">Programming</span>
                  </h1>
                </div>
                
                <div className="space-y-1 text-sm opacity-80">
                  <div className="h-1 bg-white/40 rounded w-3/4"></div>
                  <div className="h-1 bg-white/40 rounded w-1/2"></div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-lg font-semibold opacity-90">
                  Interactive Guide
                </div>
                <div className="text-sm opacity-70 mt-1">
                  Click to explore
                </div>
              </div>
            </div>

            {/* Book spine effect */}
            <div className="absolute left-0 top-0 w-2 h-full bg-gradient-to-b from-blue-800 to-blue-900 rounded-l-lg"></div>
          </div>

          {/* Book binding */}
          <div className="absolute left-0 top-4 bottom-4 w-1 bg-gradient-to-b from-blue-900 to-blue-800 rounded-full shadow-inner"></div>
          <div className="absolute left-0 top-8 bottom-8 w-0.5 bg-blue-900 rounded-full"></div>
        </div>

        {/* Instructions */}
        <div className="text-center mt-8 text-gray-600">
          <p className="text-sm">
            {isOpen ? 'Click again to close' : 'Click or hover to open the book'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Book3D;
