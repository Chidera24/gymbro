import React, { useState, useEffect, useRef } from 'react';
import { parseWorkoutInput, formatWorkoutData } from '../services/workoutService';
import './WorkoutLogger.css';

const WorkoutLogger = () => {
    const [messages, setMessages] = useState([]);
    const [workoutDescription, setWorkoutDescription] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [voiceError, setVoiceError] = useState('');
    const chatContainerRef = useRef(null);

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!workoutDescription.trim()) return;

        // Add user message to chat
        const userMessage = {
            type: 'user',
            content: workoutDescription,
            timestamp: new Date()
        };
        setMessages(prev => [...prev, userMessage]);
        setWorkoutDescription('');
        setIsProcessing(true);

        try {
            // First ask about feeling
            const feelingMessage = {
                type: 'system',
                content: 'How did you feel during this workout?',
                options: ['Great', 'Mid', 'Bad'],
                expectsResponse: true,
                timestamp: new Date()
            };
            
            setTimeout(() => {
                setMessages(prev => [...prev, feelingMessage]);
                setIsProcessing(false);
            }, 500);

        } catch (error) {
            console.error('Error processing workout:', error);
            setIsProcessing(false);
        }
    };

    const handleFeelingResponse = (feeling) => {
        // Add user's feeling response
        const feelingResponse = {
            type: 'user',
            content: feeling,
            timestamp: new Date()
        };
        setMessages(prev => [...prev, feelingResponse]);

        // Ask for notable reasons
        setTimeout(() => {
            const followUpMessage = {
                type: 'system',
                content: 'Anything notable that made you feel this way?',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, followUpMessage]);
        }, 500);
    };

    return (
        <>
            <div className="bg-texture"></div>
            <div className="vignette"></div>
            <div className="container chat-container">
                <div className="greeting">Welcome back, <span className="name-light">Chidera</span></div>
                
                {/* Chat Messages */}
                <div className="chat-messages" ref={chatContainerRef}>
                    {messages.map((message, index) => (
                        <div key={index} className={`message ${message.type}`}>
                            <div className="message-content">
                                {message.content}
                                {message.options && (
                                    <div className="message-options">
                                        {message.options.map((option, i) => (
                                            <button
                                                key={i}
                                                className="option-button"
                                                onClick={() => handleFeelingResponse(option)}
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="message-timestamp">
                                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                        </div>
                    ))}
                    {isProcessing && (
                        <div className="message system">
                            <div className="message-content">
                                <div className="typing-indicator">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Quick Suggestions */}
                <div className="suggestions">
                    <button 
                        type="button"
                        className="suggestion-chip"
                        onClick={() => {
                            setWorkoutDescription("Crushed leg day! Did squats 3x12 @ 225lbs, leg press 4x10 @ 360lbs.");
                            setTimeout(() => handleSubmit({ preventDefault: () => {} }), 100);
                        }}
                    >
                        Leg Day
                    </button>
                    <button 
                        type="button"
                        className="suggestion-chip"
                        onClick={() => {
                            setWorkoutDescription("Hit a new PR on bench press today! Push day with bench press 5x5 @ 185lbs.");
                            setTimeout(() => handleSubmit({ preventDefault: () => {} }), 100);
                        }}
                    >
                        New PR
                    </button>
                    <button 
                        type="button"
                        className="suggestion-chip"
                        onClick={() => {
                            setWorkoutDescription("Quick upper body session - push ups 3x20, shoulder press 3x12 @ 95lbs.");
                            setTimeout(() => handleSubmit({ preventDefault: () => {} }), 100);
                        }}
                    >
                        Quick Session
                    </button>
                    <button 
                        type="button"
                        className="suggestion-chip"
                        onClick={() => {
                            setWorkoutDescription("Rest day today. Did 30 minutes of stretching and mobility work.");
                            setTimeout(() => handleSubmit({ preventDefault: () => {} }), 100);
                        }}
                    >
                        Rest Day
                    </button>
                </div>

                {/* Input Form */}
                <form onSubmit={handleSubmit} className="input-form">
                    <div className="input-section">
                        <button 
                            type="button"
                            className={`mic-button ${isListening ? 'listening' : ''}`}
                            onClick={() => {}} // Voice input functionality to be implemented
                            disabled={isListening}
                        >
                            <span className="material-icons-round">
                                {isListening ? 'mic_none' : 'mic'}
                            </span>
                        </button>
                        <div className="input-wrapper">
                            <input 
                                type="text" 
                                className="text-input" 
                                placeholder={isListening ? 'Listening...' : 'Tell me about your session...'}
                                value={workoutDescription}
                                onChange={(e) => setWorkoutDescription(e.target.value)}
                            />
                        </div>
                        <button 
                            type="submit"
                            className="send-button"
                            disabled={isProcessing || !workoutDescription.trim()}
                        >
                            <span className="material-icons-round">
                                {isProcessing ? 'more_horiz' : 'arrow_forward'}
                            </span>
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default WorkoutLogger; 