import React from "react";
import AlgorithmList from "../components/AlgorithmList";

const SearchingPage = () => {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Searching Algorithms</h2>
      <AlgorithmList category="Searching" />
    </div>
  );
};

export default SearchingPage;

