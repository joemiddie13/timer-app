import { createTimer } from './createTimer';

// Example of a default timer
export const defaultTimer = createTimer();

// Example of a customized timer
export const customTimer = createTimer({
  label: "Coding",
  color: "#e74c3c",
  notes: "Working on the Redux timer app"
});

// Example of what a paused timer would look like
export const pausedTimer = {
  ...createTimer({ label: "Reading" }),
  elapsed: 3600000, // 1 hour in milliseconds
  isRunning: false
};

// Example of how we might restart a timer
export function restartTimer(timer) {
  return {
    ...timer,
    startTime: Date.now(),
    elapsed: 0,
    isRunning: true
  };
}

// Example of how we might pause a timer
export function pauseTimer(timer) {
  // If already paused, do nothing
  if (!timer.isRunning) return timer;
  
  // Calculate time that passed and add to existing elapsed time
  const currentElapsed = timer.elapsed + (Date.now() - timer.startTime);
  
  return {
    ...timer,
    elapsed: currentElapsed,
    isRunning: false
  };
}

// Example of how we might resume a timer
export function resumeTimer(timer) {
  // If already running, do nothing
  if (timer.isRunning) return timer;
  
  return {
    ...timer,
    startTime: Date.now(),
    isRunning: true
  };
} 