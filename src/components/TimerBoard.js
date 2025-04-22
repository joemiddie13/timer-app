import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTimer } from "../features/timers/TimerSlice";
import "./TimerBoard.css";

function TimerBoard() {
  const timers = useSelector((state) => state.timers);
  const dispatch = useDispatch();

  const handleAddTimer = () => {
    const label = prompt("Enter a timer label:") || "New Timer";
    dispatch(addTimer({ label }));
  };

  // Calculate total timers for stretch challenge
  const totalTimers = timers.length;

  return (
    <div className="timer-board">
      <div className="timer-board-header">
        <h2>All Timers <span className="timer-count">{totalTimers}</span></h2>
        <button className="add-timer-btn" onClick={handleAddTimer}>Add Timer</button>
      </div>
      
      {timers.length === 0 ? (
        <div className="empty-state">
          <p>No timers yet. Add your first timer to get started!</p>
        </div>
      ) : (
        <ul className="timer-list">
          {timers.map((timer) => (
            <li key={timer.id} className={`timer-item ${timer.isRunning ? 'running' : 'paused'}`}>
              <div className="timer-color" style={{ backgroundColor: timer.color }}></div>
              <div className="timer-details">
                <strong>{timer.label}</strong>
                <div className="timer-stats">
                  <span className="elapsed">Elapsed: {Math.floor(timer.elapsed / 1000)}s</span>
                  <span className="status-badge">{timer.isRunning ? 'Running' : 'Paused'}</span>
                </div>
                {timer.notes && <div className="timer-notes">{timer.notes}</div>}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TimerBoard; 