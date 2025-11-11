import React from "react";
import AlgorithmList from "../components/AlgorithmList";

const GraphsPage = () => {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Graph Algorithms</h2>
      <AlgorithmList category="Graphs" />
    </div>
  );
};

export default GraphsPage;

