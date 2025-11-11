import React from "react";
import AlgorithmList from "../components/AlgorithmList";

const TreesPage = () => {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Tree Algorithms</h2>
      <AlgorithmList category="Trees" />
    </div>
  );
};

export default TreesPage;

