import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTimer } from "../features/timers/TimerSlice";
import TimerCard from "./TimerCard";
import { formatTimeHuman } from "../utils/formatTime";
import "./TimerBoard.css";

// Available categories (should match those in TimerCard)
const CATEGORIES = ["All", "General", "Work", "Study", "Break", "Exercise", "Personal"];

function TimerBoard() {
  const timers = useSelector((state) => state.timers);
  const dispatch = useDispatch();
  const [totalElapsedTime, setTotalElapsedTime] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleAddTimer = () => {
    const label = prompt("Enter a timer label:") || "New Timer";
    const category = prompt("Enter a category (General, Work, Study, Break, Exercise, Personal):") || "General";
    dispatch(addTimer({ label, category }));
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // Filter timers by selected category
  const filteredTimers = selectedCategory === "All" 
    ? timers 
    : timers.filter(timer => timer.category === selectedCategory);

  // Calculate total timers and running timers for stretch challenge
  const totalTimers = filteredTimers.length;
  const runningTimers = filteredTimers.filter(t => t.isRunning).length;
  
  // Use effect to update the total elapsed time in real-time
  useEffect(() => {
    // Calculate initial total of elapsed time
    let initialTotal = filteredTimers.reduce((total, timer) => {
      return total + timer.elapsed;
    }, 0);
    
    setTotalElapsedTime(initialTotal);
    
    // Set up interval to update total time for running timers
    const intervalId = setInterval(() => {
      const now = Date.now();
      const total = filteredTimers.reduce((sum, timer) => {
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
  }, [filteredTimers]); // Re-run when timers array changes

  // Count timers by category for the category summary
  const timersByCategory = timers.reduce((acc, timer) => {
    const category = timer.category || "General"; // Use "General" as default for undefined categories
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="timer-board">
      <div className="timer-board-header">
        <div>
          <h2>All Timers <span className="timer-count">{totalTimers}</span></h2>
          <div className="category-filter">
            <label htmlFor="category-select">Filter by: </label>
            <select 
              id="category-select"
              value={selectedCategory} 
              onChange={handleCategoryChange}
              className="category-filter-select"
            >
              {CATEGORIES.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          
          {totalTimers > 0 && (
            <div className="timer-stats-bar">
              <span className="running-count">
                {runningTimers} active
              </span>
              <span className="total-elapsed" title={`Raw time: ${totalElapsedTime}ms`}>
                Total time: {formatTimeHuman(totalElapsedTime)}
              </span>
            </div>
          )}
          
          {/* Category summary */}
          <div className="category-summary">
            {Object.entries(timersByCategory).map(([category, count]) => (
              <span key={category} className="category-badge" onClick={() => setSelectedCategory(category)}>
                {category}: {count}
              </span>
            ))}
          </div>
        </div>
        <button className="add-timer-btn" onClick={handleAddTimer}>Add Timer</button>
      </div>
      
      {totalTimers === 0 ? (
        <div className="empty-state">
          <p>No timers yet. Add your first timer to get started!</p>
        </div>
      ) : (
        <div className="timer-cards-container">
          {filteredTimers.map((timer) => (
            <TimerCard key={timer.id} timer={timer} />
          ))}
        </div>
      )}
    </div>
  );
}

export default TimerBoard; 