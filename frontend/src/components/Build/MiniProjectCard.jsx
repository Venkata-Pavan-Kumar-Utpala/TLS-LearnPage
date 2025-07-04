import React from "react";
import { useNavigate } from "react-router-dom";

const MiniProjectCard = ({ project }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center" style={{ margin: "0 12px" }}>
      <div
        className="bg-[#e8ebf0] dark:bg-slate-800 rounded-2xl shadow hover:shadow-lg transition cursor-pointer flex items-center justify-center"
        style={{
          width: "220px",
          height: "280px",
          boxSizing: "border-box",
          overflow: "hidden",
        }}
        onClick={() => navigate(`/build/mini/${project._id}`)}>
        <img
          src={project.image}
          alt={project.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}/>
      </div>
      {/* Title */}
      <div
        className="mt-4 text-center font-medium text-black dark:text-white"
        style={{
          fontSize: "1.1rem",
          fontFamily: "'Poppins', sans-serif",
          letterSpacing: "0.2px",
        }}>
        {project.title}
      </div>
    </div>
  );
};

export default MiniProjectCard;
