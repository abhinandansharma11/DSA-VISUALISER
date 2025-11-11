import React from "react";

const Navbar = ({ onSignInClick }) => {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-wide">DSA Visualizer</h1>
        <button
          onClick={onSignInClick}
          className="px-6 py-2 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
        >
          Sign In
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

