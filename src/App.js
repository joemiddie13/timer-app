import './App.css';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateRunningTimers } from './features/timers/TimerSlice';
import Header from './components/Header';
import TimerBoard from './components/TimerBoard';
import TimerSettings from './components/TimerSettings';
import ThemeToggle from './components/ThemeToggle';
import { store } from './app/store';

function App() {
  const dispatch = useDispatch();
  
  // When the app starts, update running timers to handle time that passed while app was closed
  useEffect(() => {
    dispatch(updateRunningTimers());
  }, [dispatch]);
  
  return (
    <div className="app">
      <Header />
      <main className="app-content">
        <TimerSettings store={store} />
        <TimerBoard />
      </main>
      <ThemeToggle />
    </div>
  );
}

export default App;
