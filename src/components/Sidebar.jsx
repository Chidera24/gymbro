import React from 'react';
import './Sidebar.css';

const Sidebar = ({ isOpen, onClose }) => {
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
                    <a href="#" className="nav-item active">
                        <span className="material-icons-round">home</span>
                        Home
                    </a>
                    <a href="#" className="nav-item">
                        <span className="material-icons-round">insights</span>
                        Progress
                    </a>
                    <a href="#" className="nav-item">
                        <span className="material-icons-round">calendar_today</span>
                        Schedule
                    </a>
                    <a href="#" className="nav-item">
                        <span className="material-icons-round">settings</span>
                        Settings
                    </a>
                </nav>

                <div className="sidebar-footer">
                    <a href="#" className="nav-item">
                        <span className="material-icons-round">help_outline</span>
                        Help & Support
                    </a>
                    <a href="#" className="nav-item">
                        <span className="material-icons-round">logout</span>
                        Logout
                    </a>
                </div>
            </div>
        </>
    );
};

export default Sidebar; 