import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router";

const Header = ({ message, paths, toggleModal }) => {
  const { isAuthenticated, user } = useSelector((state) => state.userData);
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const isActive = (path) => location.pathname === `/${path}`;

  return (
    <header className="bg-white p-4 fixed top-0 left-0 right-0 z-50 shadow-sm backdrop-blur-sm bg-white/90 ">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4 ">
          <img
            src="image.png"
            alt="Teamwork"
            className="w-80 h-10 object-contain hidden lg:block transition-transform hover:scale-110 "
          />
          <h1 className="text-orange-500 text-xl md:text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
            {message}
          </h1>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {paths.map((path) => (
            <button
              key={path.path}
              onClick={() => navigate(`/${path.path}`)}
              className={`transition-all duration-300 relative group ${
                isActive(path.path)
                  ? "text-orange-500 font-bold"
                  : "text-gray-800"
              } hover:text-orange-500 hover:scale-105`}
            >
              {path.name}
              <span
                className={`absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full ${
                  isActive(path.path) ? "w-full" : ""
                }`}
              ></span>
            </button>
          ))}
          {isAuthenticated && (
            <button
              onClick={toggleModal}
              className="flex items-center transform hover:scale-110 transition-transform duration-300"
            >
              <img
                src={"profile.png"}
                alt="Profile"
                className="w-8 h-8 rounded-full border-2 border-orange-500 hover:border-orange-600 shadow-md"
              />
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={handleToggleMenu}
            className="text-orange-500 hover:text-orange-600 focus:outline-none p-2 transition-colors duration-300"
          >
            <svg
              className="w-6 h-6 transform transition-transform duration-300 hover:rotate-180"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-sm shadow-xl animate-fadeIn">
          <div className="flex flex-col p-4 space-y-3">
            {paths.map((path) => (
              <button
                key={path.path}
                onClick={() => {
                  navigate(`/${path.path}`);
                  setIsMenuOpen(false);
                }}
                className={`text-orange-500 hover:bg-orange-50 py-2 px-4 rounded-lg transition-all duration-300 hover:translate-x-2 ${
                  isActive(path.path) ? "font-bold" : ""
                }`}
              >
                {path.name}
              </button>
            ))}
            {isAuthenticated && (
              <button
                onClick={() => {
                  toggleModal();
                  setIsMenuOpen(false);
                }}
                className="text-orange-500 flex items-center hover:bg-orange-50 py-2 px-4 rounded-lg transition-all duration-300 hover:translate-x-2"
              >
                <img
                  src="profile.png"
                  alt="P"
                  className="w-8 h-8 rounded-full border-2 border-orange-500 mr-2 shadow-md"
                />
                Profile
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
