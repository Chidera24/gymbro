import React, { useState } from 'react';
import './WorkoutHistory.css';

const WorkoutHistory = ({ entries = [] }) => {
    const [filterSplit, setFilterSplit] = useState('all');
    const [sortOrder, setSortOrder] = useState('desc'); // 'desc' or 'asc'

    // Get unique workout splits for filter options
    const uniqueSplits = ['all', ...new Set(entries.map(entry => entry.workoutSplit))];

    // Filter and sort entries
    const filteredEntries = entries
        .filter(entry => filterSplit === 'all' || entry.workoutSplit === filterSplit)
        .sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
        });

    // Group entries by date
    const groupedEntries = filteredEntries.reduce((groups, entry) => {
        const date = new Date(entry.date).toLocaleDateString();
        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(entry);
        return groups;
    }, {});

    return (
        <div className="workout-history">
            <div className="workout-history-header">
                <h2>Workout History</h2>
                <div className="workout-history-controls">
                    <select 
                        value={filterSplit}
                        onChange={(e) => setFilterSplit(e.target.value)}
                        className="workout-filter"
                    >
                        {uniqueSplits.map(split => (
                            <option key={split} value={split}>
                                {split.charAt(0).toUpperCase() + split.slice(1)}
                            </option>
                        ))}
                    </select>
                    <button
                        className="sort-button"
                        onClick={() => setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc')}
                        title={`Sort by date ${sortOrder === 'desc' ? 'oldest first' : 'newest first'}`}
                    >
                        <span className="material-icons-round">
                            {sortOrder === 'desc' ? 'arrow_downward' : 'arrow_upward'}
                        </span>
                    </button>
                </div>
            </div>

            {filteredEntries.length === 0 ? (
                <div className="workout-entry empty-state">
                    <p>No workouts found{filterSplit !== 'all' ? ` for ${filterSplit} days` : ''}.</p>
                </div>
            ) : (
                Object.entries(groupedEntries).map(([date, dayEntries]) => (
                    <div key={date} className="workout-day">
                        <div className="workout-day-header">
                            <h3>{date}</h3>
                            <span className="workout-count">
                                {dayEntries.length} workout{dayEntries.length !== 1 ? 's' : ''}
                            </span>
                        </div>
                        <div className="workout-entries">
                            {dayEntries.map(entry => (
                                <div key={entry.id} className="workout-entry">
                                    <div className="workout-entry-header">
                                        <span className="workout-entry-split">
                                            {entry.workoutSplit}
                                        </span>
                                        <span className="workout-entry-time">
                                            {new Date(entry.date).toLocaleTimeString([], {
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </span>
                                    </div>
                                    <div className="workout-entry-details">
                                        <h4>{entry.exerciseName}</h4>
                                        <div className="workout-entry-stats">
                                            {entry.sets && entry.reps && (
                                                <span className="stat">
                                                    {entry.sets}×{entry.reps}
                                                </span>
                                            )}
                                            {entry.weight && (
                                                <span className="stat">
                                                    {entry.weight} lbs
                                                </span>
                                            )}
                                            {entry.muscleGroup && (
                                                <span className="stat muscle-group">
                                                    {entry.muscleGroup}
                                                </span>
                                            )}
                                        </div>
                                        {entry.notes && (
                                            <p className="workout-entry-notes">
                                                {entry.notes}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default WorkoutHistory; 