import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import WorkoutLogger from './components/WorkoutLogger';
import Progress from './components/Progress';
import Sidebar from './components/Sidebar';
import './App.css';

// Wrapper component to handle navigation
const AppContent = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    setIsSidebarOpen(false);
  };

  return (
    <div className="App">
      {/* Menu Button */}
      <button 
        className="menu-button"
        onClick={() => setIsSidebarOpen(true)}
        aria-label="Open menu"
      >
        <span className="material-icons-round">menu</span>
      </button>

      {/* Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)}
        onNavigate={handleNavigation}
      />

      <div className="ticker-bar">
        <div className="ticker-item">
          <span>CHST</span>
          <span className="ticker-value">Bench +10lb</span>
          <span className="ticker-change">↑ 3.5%</span>
        </div>
        <div className="ticker-item">
          <span>PULL</span>
          <span className="ticker-value">Form</span>
          <span className="ticker-change">↑ 2.9%</span>
        </div>
      </div>
      
      {/* Main Content */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<WorkoutLogger />} />
          <Route path="/progress" element={<Progress />} />
        </Routes>
      </main>
    </div>
  );
};

// Main App component with Router
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App; 