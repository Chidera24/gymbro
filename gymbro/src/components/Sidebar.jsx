import React from 'react';
import './Sidebar.css';

const Sidebar = ({ isOpen, onClose, onNavigate }) => {
    return (
        <>
            {/* Overlay */}
            <div 
                className={`sidebar-overlay ${isOpen ? 'active' : ''}`}
                onClick={onClose}
            />
            
            {/* Sidebar */}
            <div className={`sidebar ${isOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <button 
                        className="close-button" 
                        onClick={onClose}
                        aria-label="Close menu"
                    >
                        <span className="material-icons-round">close</span>
                    </button>
                    <div className="user-info">
                        <div className="user-avatar">
                            <span className="material-icons-round">account_circle</span>
                        </div>
                        <div className="user-details">
                            <h3>Chidera</h3>
                            <p>Fitness Enthusiast</p>
                        </div>
                    </div>
                </div>

                <nav className="sidebar-nav">
                    <button 
                        className="nav-item"
                        onClick={() => onNavigate('/')}
                    >
                        <span className="material-icons-round">fitness_center</span>
                        Workouts
                    </button>
                    <button 
                        className="nav-item"
                        onClick={() => onNavigate('/progress')}
                    >
                        <span className="material-icons-round">insights</span>
                        Progress
                    </button>
                    <button 
                        className="nav-item"
                        onClick={() => onNavigate('/schedule')}
                    >
                        <span className="material-icons-round">calendar_today</span>
                        Schedule
                    </button>
                    <button 
                        className="nav-item"
                        onClick={() => onNavigate('/statistics')}
                    >
                        <span className="material-icons-round">leaderboard</span>
                        Statistics
                    </button>
                    <button 
                        className="nav-item"
                        onClick={() => onNavigate('/settings')}
                    >
                        <span className="material-icons-round">settings</span>
                        Settings
                    </button>
                </nav>

                <div className="sidebar-footer">
                    <button 
                        className="nav-item"
                        onClick={() => onNavigate('/help')}
                    >
                        <span className="material-icons-round">help_outline</span>
                        Help & Support
                    </button>
                    <button className="nav-item">
                        <span className="material-icons-round">logout</span>
                        Logout
                    </button>
                </div>
            </div>
        </>
    );
};

export default Sidebar; 