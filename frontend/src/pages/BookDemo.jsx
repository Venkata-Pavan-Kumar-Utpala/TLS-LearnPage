import React from 'react';
import Book3D from '../components/Book3D';

const BookDemo = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="text-center py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          3D Book Animation
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto px-4">
          Interactive 3D book built with React, Tailwind CSS, and GSAP. 
          Features realistic opening animation with 3D transforms and shadows.
        </p>
      </div>

      {/* Book Component */}
      <Book3D />

      {/* Features */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Features
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="text-blue-600 text-2xl mb-3">🎨</div>
            <h3 className="font-semibold text-gray-800 mb-2">3D Transforms</h3>
            <p className="text-gray-600 text-sm">
              Uses CSS 3D transforms and perspective for realistic depth and rotation effects.
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="text-green-600 text-2xl mb-3">⚡</div>
            <h3 className="font-semibold text-gray-800 mb-2">GSAP Animation</h3>
            <p className="text-gray-600 text-sm">
              Smooth animations powered by GSAP with custom easing and timing functions.
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="text-purple-600 text-2xl mb-3">📱</div>
            <h3 className="font-semibold text-gray-800 mb-2">Responsive</h3>
            <p className="text-gray-600 text-sm">
              Fully responsive design that works perfectly on all screen sizes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDemo;
