import { configureStore } from "@reduxjs/toolkit";
import timersReducer from "../features/timers/TimerSlice";
import { loadState, saveState } from "./localStorage";

// Simple logging middleware
const loggerMiddleware = store => next => action => {
  console.group(`Redux Action: ${action.type}`);
  console.log('Payload:', action.payload);
  console.log('Previous State:', store.getState());
  const result = next(action);
  console.log('New State:', store.getState());
  console.groupEnd();
  return result;
};

// Load state from localStorage (if available)
const preloadedState = loadState();

// Create the Redux store
export const store = configureStore({
  reducer: {
    timers: timersReducer,
  },
  preloadedState,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(loggerMiddleware),
});

// Save state to localStorage whenever store changes
let saveTimeout;
store.subscribe(() => {
  // Debounce the save operation to avoid excessive writes
  if (saveTimeout) {
    clearTimeout(saveTimeout);
  }
  
  saveTimeout = setTimeout(() => {
    const state = store.getState();
    saveState({ timers: state.timers });
  }, 300); // Save after 300ms of inactivity
});

// Set up auto-save for timer snapshots (stretch challenge)
let snapshotInterval;
export const startAutoSave = (interval = 60000) => { // Default to 1 minute
  if (snapshotInterval) {
    clearInterval(snapshotInterval);
  }
  
  snapshotInterval = setInterval(() => {
    const state = store.getState();
    saveState({ timers: state.timers });
    console.log('Timer state auto-saved at', new Date().toLocaleTimeString());
    
    // Dispatch an event that can be used for visual feedback
    window.dispatchEvent(new CustomEvent('timer-snapshot-saved'));
  }, interval);
  
  return () => clearInterval(snapshotInterval); // Return cleanup function
};

// Start auto-save right away (can be toggled off by components)
startAutoSave(); 