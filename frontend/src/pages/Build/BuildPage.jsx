import React, { useState } from "react";
import MiniProjectCard from "../../components/Build/MiniProjectCard";
import MajorProjectCard from "../../components/Build/MajorProjectCard";
import MidLevelProjectsAnimatedLayout from "../../components/Build/MidLevelProjectsAnimatedLayout";
import { useNavigate } from "react-router-dom";
import AccessPopup from "../../utils/accessPopup.jsx";
import useMiniProjects from "../../hooks/useMiniProjects";
import useMidProjects from "../../hooks/useMidProjects";
import useMajorProjects from "../../hooks/useMajorProjects";
import LoadingScreen from "../../components/Loader/Loader3D";

const BuildPage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const { miniProjects, loading, error } = useMiniProjects();
  const { midProjects, loading: loadingMid, error: errorMid } = useMidProjects();
  const { majorProjects, loading: loadingMajor, error: errorMajor } = useMajorProjects();

  const safeMidProjects = Array.isArray(midProjects) ? midProjects : [];
  const safeMajorProjects = Array.isArray(majorProjects) ? majorProjects : [];

  const allowedTitles = [
    "E-commerce Product Listing Page",
    "Data Visualization Dashboard",
    "Social Media Feed with API",
    "Expense Tracker with Analytics",
    "Recipe Finder App",
    "Machine Learning Predictor"
  ];

  let filteredProjects = safeMidProjects.filter(project => allowedTitles.includes(project.title));
  const mlIndex = filteredProjects.findIndex(p => p.title === "Machine Learning Predictor");
  if (mlIndex !== -1) {
    const [mlProject] = filteredProjects.splice(mlIndex, 1);
    filteredProjects.push(mlProject);
  }

  const processedMidProjects = filteredProjects.map((project, index) => ({
    ...project,
    free: index < 2,
    locked: index >= 2,
    price: index < 2 ? "Free" : "₹XXX",
  }));

  return (
    <main className="max-w-7xl mx-auto px-2 sm:px-4 md:px-8 pt-0 pb-16" style={{ fontFamily: "system-ui, 'Inter', sans-serif" }}>
      {/* Hero/Header Section */}
      <div className="w-full flex flex-row items-center justify-between min-h-screen px-1 sm:px-4">
        {/* Left: Huge Heading */}
        <div className="flex-1"> {/* Added a div to wrap the headings and paragraph for proper flex alignment */}
          <h1
            className="
              header-gradient
              mb-2 md:mb-4 lowercase leading-none text-5xl md:text-8xl lg:text-9xl
              dark:text-transparent
              dark:bg-gradient-to-r dark:from-blue-400 dark:via-indigo-300 dark:to-purple-300
              dark:bg-clip-text
            "
            style={{ fontFamily: "'Poppins', sans-serif", lineHeight: 1 }}>
            build
          </h1>
          <h1
            className="
              header-gradient
              mt-2 md:mt-4 uppercase leading-none text-5xl md:text-8xl lg:text-9xl
              dark:text-transparent
              dark:bg-gradient-to-r dark:from-blue-400 dark:via-indigo-300 dark:to-purple-300
              dark:bg-clip-text
            "
            style={{ fontFamily: "'Poppins', sans-serif", lineHeight: 1 }}>
            PROJECTS
          </h1>
          <p
            className="
              mt-6 mb-3 sm:mb-6 text-[#1356D3] text-base md:text-2xl lg:text-3xl
              dark:text-blue-300
            "
            style={{ fontFamily: "system-ui, 'Inter', sans-serif" }}>
            Whoa! You're dangerously close to becoming a real coder
          </p>
        </div>
        {/* Right: Huge GIF */}
        <div className="flex-shrink-0 ml-2 sm:ml-8 flex items-center justify-center h-full">
          {/* Light mode GIF */}
          <img
            src="https://i.postimg.cc/k4MzD8PC/blue-cup-unscreen.gif"
            alt="Blue Cup"
            className="w-32 h-32 xs:w-48 xs:h-48 sm:w-64 sm:h-64 md:w-[350px] md:h-[350px] lg:w-[420px] lg:h-[420px] object-contain rounded-2xl block dark:hidden"
            style={{
              background: "transparent",
            }}
          />
          {/* Dark mode GIF */}
          <img
            src="/assets/blue_cup_light.gif"
            alt="Blue Cup Light"
            className="w-32 h-32 xs:w-48 xs:h-48 sm:w-64 sm:h-64 md:w-[350px] md:h-[350px] lg:w-[420px] lg:h-[420px] object-contain rounded-2xl hidden dark:block"
            style={{
              background: "transparent",
            }}
          />
        </div>
      </div>

      {/* Mini Projects Section (starts after 100vh) */}
      <section className="mb-16 max-w-7xl mx-auto px-2 sm:px-4 md:px-8">
        <div style={{ marginBottom: "0.15rem" }}>
          <span
            className="section-header italic text-[#1356D3] dark:text-blue-300"
          >
            mini
          </span>
          <span
            className="section-header ml-2 text-[#1356D3] dark:text-blue-300"
          >
            PROJECTS
          </span>
        </div>
        <div
          className="font-sans text-[#007bff] text-[1.1rem] mb-12 mt-[0.1rem] dark:text-blue-300"
          style={{ fontFamily: "system-ui, 'Inter', sans-serif" }}>
          because crying over big ones is overrated
        </div>

        {loading ? (
          <LoadingScreen 
    message="Loading mini projects..." 
    showMessage={true}
    fullScreen={true}
    size={40}
    duration={800}
  />
        ) : error ? (
          <p style={{ color: "#dc2626" }}>Error: {error}</p>
        ) : (
          <div className="flex flex-nowrap gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 md:grid-cols-3 sm:gap-6 sm:overflow-x-visible scrollbar-hide">
            {Array.isArray(miniProjects) &&
              miniProjects
                .filter((project) =>
                  ["Simple Calculator App", "Click Counter App", "Checklist App"].includes(project.title)
                )
                .map((project) => (
                  <div key={project._id} className="flex-shrink-0 w-72 sm:w-auto">
                    <MiniProjectCard project={project} />
                  </div>
                ))}
          </div>
        )}
      </section>

      {/* Mid-Level Projects Section */}
      <section className="mb-16">
        <div style={{ marginBottom: "0.15rem" }}>
          <span className="section-header italic text-[#1356D3] dark:text-blue-300">
            mid
          </span>
          <span className="section-header ml-2 text-[#1356D3] dark:text-blue-300">
            PROJECTS
          </span>
        </div>
        <div
          className="font-sans text-[#007bff] text-[1.1rem] mb-12 mt-[0.1rem] dark:text-blue-300"
          style={{ fontFamily: "system-ui, 'Inter', sans-serif" }}>
          for when you want to flex a little harder
        </div>

        {loadingMid ? (
          <p style={{ color: "#059669" }}>Loading mid projects...</p>
        ) : errorMid ? (
          <p style={{ color: "#dc2626" }}>Error: {errorMid}</p>
        ) : (
          <MidLevelProjectsAnimatedLayout
            projects={processedMidProjects}
            setShowPopup={setShowPopup} />
        )}
      </section>

      {/* Major Projects Section */}
      <section className="mb-12">
        <div style={{ marginBottom: "0.15rem" }}>
          <span className="section-header italic text-[#1356D3] dark:text-blue-300">
            major
          </span>
          <span className="section-header ml-2 text-[#1356D3] dark:text-blue-300">
            PROJECTS
          </span>
        </div>
        <div
          className="font-sans text-[#007bff] text-[1.1rem] mb-12 mt-[0.1rem] dark:text-blue-300"
          style={{ fontFamily: "system-ui, 'Inter', sans-serif" }}>
          for the ultimate show-off (and placements!)
        </div>
        {loadingMajor ? (
          <p style={{ color: "#059669" }}>Loading major projects...</p>
        ) : errorMajor ? (
          <p style={{ color: "#dc2626" }}>Error: {errorMajor}</p>
        ) : (
          <>
            {/* Desktop/tablet layout */}
            <div
              className="hidden md:grid grid-cols-2 gap-10 w-full max-w-5xl mx-auto"
              style={{ minHeight: "740px" }}>
              {/* Left column: two cards, top and bottom */}
              <div className="flex flex-col justify-between h-full gap-10">
                {safeMajorProjects[0] && (
                  <MajorProjectCard project={safeMajorProjects[0]} />
                )}
                {safeMajorProjects[1] && (
                  <MajorProjectCard project={safeMajorProjects[1]} />
                )}
              </div>
              {/* Right column: one card, vertically centered */}
              <div className="flex flex-col justify-center h-full">
                {safeMajorProjects[2] && (
                  <MajorProjectCard project={safeMajorProjects[2]} />
                )}
              </div>
            </div>
            {/* Mobile layout */}
            <div className="md:hidden flex flex-col gap-8 w-full max-w-5xl mx-auto">
              {safeMajorProjects.map((project) => (
                <MajorProjectCard key={project._id} project={project} />
              ))}
            </div>
          </>
        )}
      </section>

      {/* UI Source Library Section */}
      <section
        className="mt-14 py-10"
        style={{
        }}>
        {/* Heading */}
        <div className="mb-10 px-6">
          <span
            className="text-3xl font-semibold italic text-[#007bff] dark:text-blue-300"
            style={{ fontFamily: "'Poppins', sans-serif" }}>
            design
          </span>
          <span
            className="text-3xl font-semibold ml-2 text-[#007bff] dark:text-blue-300"
            style={{ fontFamily: "'Poppins', sans-serif" }}>
            LAB
          </span>
        </div>

        {/* Tile Layout */}
        <div className="w-full flex flex-wrap justify-center gap-4 px-6">
          {[
            "Cards", "Loaders", "Forms", "Buttons", "3D Buttons", "Hover Buttons",
            "Inputs", "Checkboxes", "Toggles", "Tooltips", "Alerts", "Badges",
            "Pagination", "Tabs"
          ].map((label) => (
            <div
              key={label}
              className="px-8 py-3 rounded-full bg-white/60 text-[#0600a6] text-base font-semibold"
              style={{
                fontFamily: "'Poppins', sans-serif",
                minWidth: "120px",
              }}>
              {label}
            </div>
          ))}
        </div>
      </section>

      <AccessPopup open={showPopup} onClose={() => setShowPopup(false)} />
    </main>
  );
};

export default BuildPage;