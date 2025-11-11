import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";
import "./styles/layout.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import HomePage from "./pages/HomePage";
import SortingPage from "./pages/SortingPage";
import SearchingPage from "./pages/SearchingPage";
import TreesPage from "./pages/TreesPage";
import GraphsPage from "./pages/GraphsPage";
import LoginPage from "./pages/LoginPage";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [activeCategory, setActiveCategory] = useState("sorting");

  const handleSignInClick = () => {
    setShowLogin(true);
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setShowLogin(false);
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  const handleBackToHome = () => {
    setShowLogin(false);
  };

  const renderPage = () => {
    switch (activeCategory) {
      case "sorting":
        return <SortingPage />;
      case "searching":
        return <SearchingPage />;
      case "trees":
        return <TreesPage />;
      case "graphs":
        return <GraphsPage />;
      default:
        return <SortingPage />;
    }
  };

  // Show homepage if not authenticated
  if (!isAuthenticated && !showLogin) {
    return (
      <div className="min-h-screen bg-gray-100">
        <HomePage onSignInClick={handleSignInClick} />
      </div>
    );
  }

  // Show login page
  if (showLogin) {
    return (
      <div className="min-h-screen bg-gray-100">
        <LoginPage onBack={handleBackToHome} onLoginSuccess={handleLoginSuccess} />
      </div>
    );
  }

  // Show DSA Visualizer (main app) after authentication
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar onSignInClick={handleSignInClick} />
      <div className="flex flex-1">
        <Sidebar
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />
        <main className="flex-1 bg-gray-50 overflow-y-auto">{renderPage()}</main>
      </div>
    </div>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(<App />);
