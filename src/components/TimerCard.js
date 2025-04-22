import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { pauseTimer, resumeTimer, resetTimer, removeTimer } from "../features/timers/TimerSlice";
import "./TimerCard.css";

const TimerCard = ({ timer }) => {
  const dispatch = useDispatch();
  const [displayTime, setDisplayTime] = useState(timer.elapsed);
  const [updateInterval, setUpdateInterval] = useState(1000); // Default: update every second

  // Set up interval for real-time updates
  useEffect(() => {
    let intervalId = null;

    if (timer.isRunning) {
      intervalId = setInterval(() => {
        const now = Date.now();
        const newElapsed = now - timer.startTime + timer.elapsed;
        setDisplayTime(newElapsed);
      }, updateInterval);
    } else {
      setDisplayTime(timer.elapsed);
    }

    // Clean up interval when component unmounts or timer stops running
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [timer.isRunning, timer.startTime, timer.elapsed, updateInterval]);

  const handlePause = () => dispatch(pauseTimer(timer.id));
  const handleResume = () => dispatch(resumeTimer(timer.id));
  const handleReset = () => dispatch(resetTimer(timer.id));
  const handleDelete = () => dispatch(removeTimer(timer.id));

  // Toggle update interval (stretch challenge)
  const toggleUpdateSpeed = () => {
    setUpdateInterval(prev => prev === 1000 ? 100 : 1000);
  };

  // Format time nicely with hours, minutes, seconds, and milliseconds
  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    // Use Intl.NumberFormat for proper zero-padding
    const format = new Intl.NumberFormat('en-US', { minimumIntegerDigits: 2 });
    
    if (hours > 0) {
      return `${hours}:${format.format(minutes)}:${format.format(seconds)}`;
    } else {
      return `${format.format(minutes)}:${format.format(seconds)}`;
    }
  };

  // Check if timer has been running for more than 5 minutes (300,000 ms)
  const isLongRunning = timer.isRunning && displayTime > 300000;

  return (
    <div className={`timer-card ${timer.isRunning ? 'running' : 'paused'} ${isLongRunning ? 'long-running' : ''}`}>
      <div className="timer-card-header" style={{ borderColor: timer.color }}>
        <h3>{timer.label}</h3>
        <div className="timer-actions">
          <button 
            className="speed-toggle" 
            onClick={toggleUpdateSpeed} 
            title={updateInterval === 1000 ? "Switch to faster updates" : "Switch to normal updates"}
          >
            {updateInterval === 1000 ? "1s" : "0.1s"}
          </button>
          <button 
            className="delete-btn" 
            onClick={handleDelete} 
            title="Delete timer"
          >
            &times;
          </button>
        </div>
      </div>
      
      <div className="timer-body">
        <div className="time-display">{formatTime(displayTime)}</div>
        <div className="status-indicator">
          {timer.isRunning ? "Running" : "Paused"}
          {isLongRunning && <span className="long-running-indicator"> (Long running)</span>}
        </div>
        
        {timer.notes && <div className="timer-notes">{timer.notes}</div>}
        
        <div className="timer-controls">
          {timer.isRunning ? (
            <button 
              className="control-btn pause" 
              onClick={handlePause}
            >
              Pause
            </button>
          ) : (
            <button 
              className="control-btn resume" 
              onClick={handleResume}
            >
              Resume
            </button>
          )}
          <button 
            className="control-btn reset" 
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimerCard; 