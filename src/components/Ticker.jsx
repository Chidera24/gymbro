import React from 'react';
import './Ticker.css';

const Ticker = () => {
    return (
        <div className="ticker-container">
            <div className="ticker-wrapper">
                <div className="ticker-track">
                    <div className="ticker-item">
                        <span className="ticker-label">CHST</span>
                        <span className="ticker-value">Bench +10lb</span>
                        <span className="ticker-change positive">↑ 3.5%</span>
                    </div>
                    <div className="ticker-item">
                        <span className="ticker-label">PULL</span>
                        <span className="ticker-value">Form</span>
                        <span className="ticker-change positive">↑ 2.9%</span>
                    </div>
                    <div className="ticker-item">
                        <span className="ticker-label">LEGS</span>
                        <span className="ticker-value">Squat PR</span>
                        <span className="ticker-change positive">↑ 5.0%</span>
                    </div>
                    {/* Duplicate items for seamless loop */}
                    <div className="ticker-item">
                        <span className="ticker-label">CHST</span>
                        <span className="ticker-value">Bench +10lb</span>
                        <span className="ticker-change positive">↑ 3.5%</span>
                    </div>
                    <div className="ticker-item">
                        <span className="ticker-label">PULL</span>
                        <span className="ticker-value">Form</span>
                        <span className="ticker-change positive">↑ 2.9%</span>
                    </div>
                    <div className="ticker-item">
                        <span className="ticker-label">LEGS</span>
                        <span className="ticker-value">Squat PR</span>
                        <span className="ticker-change positive">↑ 5.0%</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Ticker; 