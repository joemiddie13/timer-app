import { configureStore } from "@reduxjs/toolkit";
import timersReducer from "../features/timers/TimerSlice";

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

export const store = configureStore({
  reducer: {
    timers: timersReducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(loggerMiddleware),
}); 