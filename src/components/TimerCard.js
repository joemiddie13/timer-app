import React from "react";
import { useDispatch } from "react-redux";
import { pauseTimer, resumeTimer, resetTimer, removeTimer } from "../features/timers/TimerSlice";
import "./TimerCard.css";

const TimerCard = ({ timer }) => {
  const dispatch = useDispatch();

  const handlePause = () => dispatch(pauseTimer(timer.id));
  const handleResume = () => dispatch(resumeTimer(timer.id));
  const handleReset = () => dispatch(resetTimer(timer.id));
  const handleDelete = () => dispatch(removeTimer(timer.id));

  // Format time nicely
  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`timer-card ${timer.isRunning ? 'running' : 'paused'}`}>
      <div className="timer-card-header" style={{ borderColor: timer.color }}>
        <h3>{timer.label}</h3>
        <div className="timer-actions">
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
        <div className="time-display">{formatTime(timer.elapsed)}</div>
        <div className="status-indicator">
          {timer.isRunning ? "Running" : "Paused"}
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