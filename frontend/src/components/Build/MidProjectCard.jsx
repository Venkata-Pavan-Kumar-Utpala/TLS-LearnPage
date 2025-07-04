import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import SignInPopup from "../../utils/SignInPopup";
// Import midProjects from MidProjectDetail
import { midProjects } from "../../pages/Build/MidProjectDetail";

const MidProjectCard = ({ project, setShowPopup }) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [showSignInPopup, setShowSignInPopup] = useState(false);

  const isMLProject = project.title === "Machine Learning Predictor";

  const handleClick = () => {
    if (isMLProject) return; // Do nothing for ML Predictor

    if (project.free) {
      navigate(`/build/midproject/${project._id}`, { state: { project } });
    } else if (!user && project.locked) {
      setShowSignInPopup(true);
    } else if (!user?.isClubMember && project.locked) {
      // Find the full project details from midProjects by title
      const fullProject = midProjects.find(p => p.title === project.title);
      navigate(`/payment?projectId=${project._id}&type=mid`, { state: { project: fullProject || project } });
    }
  };

  return (
    <>
      <div 
        className={`group cursor-pointer w-full ${isMLProject ? "pointer-events-none" : ""}`} 
        onClick={handleClick}
      >
        <div
          className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-slate-700 mb-3"
          style={{
            aspectRatio: "316/432",
            maxWidth: "316px",
            margin: "1rem",
          }}>
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {/* Coming Soon overlay for Machine Learning Predictor */}
          {isMLProject && (
            <div className="absolute inset-0 bg-white/80 dark:bg-[#001233]/80 backdrop-blur-[2px] flex items-center justify-center z-20">
              <span className="text-lg font-bold text-gray-900 dark:text-white text-center px-4">
                Coming Soon...<br />Stay Tuned!
              </span>
            </div>
          )}
          {project.free ? (
            <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[0.65rem] font-bold bg-gradient-to-r from-[#10b981] via-[#059669] to-[#047857] text-white shadow-lg z-10 leading-none">
              Free
            </span>
          ) : project.locked ? (
            <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[0.65rem] font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-[#007bff] text-white shadow-lg z-10 leading-none">
              Club
            </span>
          ) : null}
          {Array.isArray(project.tags) && project.tags.length > 0 && (
            <div className="absolute bottom-2 left-2 flex flex-wrap gap-1">
              {project.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-[0.6rem] font-semibold px-2 py-[2px] bg-[#bceaff] dark:bg-slate-900/80 rounded-full text-[#0600a6] dark:text-white shadow-sm"
                  style={{ fontFamily: "'Poppins', sans-serif" }}>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="px-1 flex flex-col items-center text-center w-full">
          <h3
            className="font-bold mb-1 leading-tight text-black dark:text-white w-full text-center"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "1rem",
            }}>
            {project.title}
          </h3>
          {project.description && (
            <p className="text-[0.95rem] text-gray-600 dark:text-gray-300 mb-1 leading-snug line-clamp-2 w-full text-center">
              {project.description}
            </p>
          )}
          {/* Removed Free/₹XXX/price below the title */}
        </div>
      </div>
      <SignInPopup open={showSignInPopup} onClose={() => setShowSignInPopup(false)} />
    </>
  );
};

export default MidProjectCard;
