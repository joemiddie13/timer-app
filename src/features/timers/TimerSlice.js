import { createSlice } from "@reduxjs/toolkit";
import { createTimer } from "./createTimer";

const timersSlice = createSlice({
  name: "timers",
  initialState: [],
  reducers: {
    addTimer: (state, action) => {
      state.unshift(createTimer(action.payload));
    },
    pauseTimer: (state, action) => {
      const timer = state.find(t => t.id === action.payload);
      if (timer && timer.isRunning) {
        timer.elapsed += Date.now() - timer.startTime;
        timer.isRunning = false;
      }
    },
    resumeTimer: (state, action) => {
      const timer = state.find(t => t.id === action.payload);
      if (timer && !timer.isRunning) {
        timer.startTime = Date.now();
        timer.isRunning = true;
      }
    },
    resetTimer: (state, action) => {
      const timer = state.find(t => t.id === action.payload);
      if (timer) {
        timer.elapsed = 0;
        timer.startTime = Date.now();
        timer.isRunning = false;
      }
    },
    removeTimer: (state, action) => {
      return state.filter(timer => timer.id !== action.payload);
    },
    sortTimers: (state) => {
      state.sort((a, b) => {
        if (a.isRunning && b.isRunning) {
          return b.startTime - a.startTime;
        }
        if (a.isRunning) return -1;
        if (b.isRunning) return 1;
        return b.elapsed - a.elapsed;
      });
    },
    importTimers: (state, action) => {
      return action.payload;
    },
    updateRunningTimers: (state) => {
      const now = Date.now();
      state.forEach(timer => {
        if (timer.isRunning) {
          if (now - timer.startTime > 5000) {
            timer.elapsed += 1000;
            timer.startTime = now;
          }
        }
      });
    }
  },
});

export const { 
  addTimer, 
  pauseTimer, 
  resumeTimer, 
  resetTimer, 
  removeTimer,
  sortTimers,
  importTimers,
  updateRunningTimers
} = timersSlice.actions;

export default timersSlice.reducer;
