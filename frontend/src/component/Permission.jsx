import React from "react";

import { loading } from "../feature/userSlice"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
  
import { useSelector } from "react-redux";

const Permission = () => {
  const { isVerified } = useSelector(
    (state) => state.userData
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(loading(false));
    navigate('/')
  };



  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <div className="mb-6">
            <svg
              className="w-16 h-16 mx-auto text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          
        </div>
        <h2 className="text-2xl font-bold mb-4 text-orange-800">
          You are not Admin member
        </h2>
        <p className="text-gray-600 mb-6">clients are not allowed to visit this page</p>

        <button onClick={handleLogout} className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300">
          Go to Home Page
        </button>
      </div>
    </div>
  );
};

export default Permission;
