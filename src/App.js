import React, { useState } from 'react';
import WorkoutLogger from './components/WorkoutLogger';
import Sidebar from './components/Sidebar';
import Ticker from './components/Ticker';
import './App.css';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="App">
      {/* Ticker */}
      <Ticker />

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
      />
      
      {/* Main Content */}
      <main className="main-content">
        <WorkoutLogger />
      </main>
    </div>
  );
}

export default App; 