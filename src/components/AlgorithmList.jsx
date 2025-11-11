import React from "react";

const AlgorithmList = ({ category }) => {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full text-center border-2 border-gray-200">
        <div className="mb-4">
          <svg
            className="mx-auto h-16 w-16 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-700 mb-2">
          Select an algorithm
        </h2>
        <p className="text-gray-500">
          Choose an algorithm from the {category} category to visualize
        </p>
      </div>
    </div>
  );
};

export default AlgorithmList;

