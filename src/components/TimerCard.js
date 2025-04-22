import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { 
  pauseTimer, 
  resumeTimer, 
  resetTimer, 
  removeTimer, 
  restartTimer, 
  renameTimer,
  setTimerCategory
} from "../features/timers/TimerSlice";
import { formatTime } from "../utils/formatTime";
import "./TimerCard.css";

// Available categories
const CATEGORIES = ["General", "Work", "Study", "Break", "Exercise", "Personal"];

const TimerCard = ({ timer }) => {
  const dispatch = useDispatch();
  const [displayTime, setDisplayTime] = useState(timer.elapsed);
  const [updateInterval, setUpdateInterval] = useState(1000); // Default: update every second
  const [isEditing, setIsEditing] = useState(false);
  const [editedLabel, setEditedLabel] = useState(timer.label);

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

  // Update editedLabel when timer.label changes (from Redux)
  useEffect(() => {
    setEditedLabel(timer.label);
  }, [timer.label]);

  const handlePause = () => dispatch(pauseTimer(timer.id));
  const handleResume = () => dispatch(resumeTimer(timer.id));
  const handleReset = () => dispatch(resetTimer(timer.id));
  const handleRestart = () => dispatch(restartTimer(timer.id));
  const handleDelete = () => dispatch(removeTimer(timer.id));

  const handleLabelClick = () => {
    setIsEditing(true);
  };

  const handleLabelChange = (e) => {
    setEditedLabel(e.target.value);
  };

  const handleLabelSubmit = () => {
    if (editedLabel.trim() !== '') {
      dispatch(renameTimer({ id: timer.id, newLabel: editedLabel }));
    } else {
      setEditedLabel(timer.label); // Reset to original if empty
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleLabelSubmit();
    } else if (e.key === 'Escape') {
      setEditedLabel(timer.label); // Reset to original
      setIsEditing(false);
    }
  };

  const handleCategoryChange = (e) => {
    dispatch(setTimerCategory({ id: timer.id, category: e.target.value }));
  };

  // Toggle update interval (stretch challenge)
  const toggleUpdateSpeed = () => {
    setUpdateInterval(prev => prev === 1000 ? 100 : 1000);
  };

  // Check if timer has been running for more than 5 minutes (300,000 ms)
  const isLongRunning = timer.isRunning && displayTime > 300000;
  
  // Check if timer has reached over an hour (stretch challenge for Part 7)
  const isOverHour = displayTime >= 3600000;

  return (
    <div className={`timer-card ${timer.isRunning ? 'running' : 'paused'} ${isLongRunning ? 'long-running' : ''} ${isOverHour ? 'over-hour' : ''}`}>
      <div className="timer-card-header" style={{ borderColor: timer.color }}>
        {isEditing ? (
          <div className="label-edit">
            <input
              type="text"
              value={editedLabel}
              onChange={handleLabelChange}
              onBlur={handleLabelSubmit}
              onKeyDown={handleKeyDown}
              autoFocus
              className="label-input"
            />
          </div>
        ) : (
          <h3 onDoubleClick={handleLabelClick} className="editable-label" title="Double-click to edit">
            {timer.label}
          </h3>
        )}
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
        <div className="timer-category">
          <select 
            value={timer.category} 
            onChange={handleCategoryChange}
            className="category-select"
          >
            {CATEGORIES.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        
        <div 
          className="time-display" 
          title={`Raw time: ${displayTime}ms`}
        >
          {formatTime(displayTime, { 
            showHours: true,
            showMilliseconds: false,
            locale: navigator.language
          })}
        </div>
        <div className="status-indicator">
          {timer.isRunning ? "Running" : "Paused"}
          {isLongRunning && <span className="long-running-indicator"> (Long running)</span>}
          {isOverHour && <span className="over-hour-indicator"> (Over 1 hour)</span>}
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
          <button 
            className="control-btn restart" 
            onClick={handleRestart}
            title="Restart timer from zero"
          >
            Restart
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimerCard; 