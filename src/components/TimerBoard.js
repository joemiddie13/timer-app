import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTimer } from "../features/timers/TimerSlice";
import TimerCard from "./TimerCard";
import "./TimerBoard.css";

function TimerBoard() {
  const timers = useSelector((state) => state.timers);
  const dispatch = useDispatch();
  const [totalElapsedTime, setTotalElapsedTime] = useState(0);

  const handleAddTimer = () => {
    const label = prompt("Enter a timer label:") || "New Timer";
    dispatch(addTimer({ label }));
  };

  // Calculate total timers and running timers for stretch challenge
  const totalTimers = timers.length;
  const runningTimers = timers.filter(t => t.isRunning).length;
  
  // Use effect to update the total elapsed time in real-time
  useEffect(() => {
    // Calculate initial total of elapsed time
    let initialTotal = timers.reduce((total, timer) => {
      return total + timer.elapsed;
    }, 0);
    
    setTotalElapsedTime(initialTotal);
    
    // Set up interval to update total time for running timers
    const intervalId = setInterval(() => {
      const now = Date.now();
      const total = timers.reduce((sum, timer) => {
        if (timer.isRunning) {
          // For running timers, add elapsed time plus time since timer started
          return sum + timer.elapsed + (now - timer.startTime);
        }
        // For paused timers, just add the elapsed time
        return sum + timer.elapsed;
      }, 0);
      
      setTotalElapsedTime(total);
    }, 1000);
    
    // Clean up interval on unmount
    return () => clearInterval(intervalId);
  }, [timers]); // Re-run when timers array changes
  
  // Format total elapsed time
  const formatTotalTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${seconds}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    } else {
      return `${seconds}s`;
    }
  };

  return (
    <div className="timer-board">
      <div className="timer-board-header">
        <div>
          <h2>All Timers <span className="timer-count">{totalTimers}</span></h2>
          {totalTimers > 0 && (
            <div className="timer-stats-bar">
              <span className="running-count">
                {runningTimers} active
              </span>
              <span className="total-elapsed">
                Total time: {formatTotalTime(totalElapsedTime)}
              </span>
            </div>
          )}
        </div>
        <button className="add-timer-btn" onClick={handleAddTimer}>Add Timer</button>
      </div>
      
      {timers.length === 0 ? (
        <div className="empty-state">
          <p>No timers yet. Add your first timer to get started!</p>
        </div>
      ) : (
        <div className="timer-cards-container">
          {timers.map((timer) => (
            <TimerCard key={timer.id} timer={timer} />
          ))}
        </div>
      )}
    </div>
  );
}

export default TimerBoard; 