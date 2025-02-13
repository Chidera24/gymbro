import React from 'react';
import WorkoutHistory from './WorkoutHistory';
import './Progress.css';

const Progress = () => {
    return (
        <>
            <div className="bg-texture"></div>
            <div className="vignette"></div>
            <div className="container">
                <h1 className="page-title">Your Progress</h1>
                <div className="progress-content">
                    {/* Workout History Section */}
                    <section className="history-section">
                        <WorkoutHistory />
                    </section>
                </div>
            </div>
        </>
    );
};

export default Progress; 