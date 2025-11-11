import React from "react";

const Sidebar = ({ activeCategory, onCategoryChange }) => {
  const categories = [
    { id: "sorting", name: "Sorting" },
    { id: "searching", name: "Searching" },
    { id: "trees", name: "Trees" },
    { id: "graphs", name: "Graphs" },
  ];

  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen shadow-xl">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4 text-gray-300 uppercase tracking-wide">
          Categories
        </h2>
        <nav className="space-y-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                activeCategory === category.id
                  ? "bg-blue-600 text-white shadow-lg transform scale-105"
                  : "bg-gray-700 text-gray-200 hover:bg-gray-600 hover:text-white"
              }`}
            >
              <span className="font-medium">{category.name}</span>
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;

