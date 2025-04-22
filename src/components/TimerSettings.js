import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { exportTimerData, importTimerData } from '../app/localStorage';
import { startAutoSave } from '../app/store';
import './TimerSettings.css';

const TimerSettings = ({ store }) => {
  const [isAutoSaveEnabled, setIsAutoSaveEnabled] = useState(true);
  const [autoSaveInterval, setAutoSaveInterval] = useState(60); // In seconds
  const [showSaveIndicator, setShowSaveIndicator] = useState(false);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  
  // Toggle auto-save
  const toggleAutoSave = () => {
    setIsAutoSaveEnabled(!isAutoSaveEnabled);
    
    if (!isAutoSaveEnabled) {
      // Enable auto-save with current interval
      startAutoSave(autoSaveInterval * 1000);
    } else {
      // Disable auto-save by calling with a very large interval
      startAutoSave(Number.MAX_SAFE_INTEGER);
    }
  };
  
  // Change auto-save interval
  const changeAutoSaveInterval = (e) => {
    const seconds = parseInt(e.target.value, 10);
    setAutoSaveInterval(seconds);
    
    // Only update if auto-save is enabled
    if (isAutoSaveEnabled) {
      startAutoSave(seconds * 1000);
    }
  };
  
  // Handle export button click
  const handleExport = () => {
    const state = store.getState();
    exportTimerData(state);
  };
  
  // Handle import button click
  const handleImportClick = () => {
    fileInputRef.current.click();
  };
  
  // Handle file selection for import
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    try {
      const data = await importTimerData(file);
      
      // Check if the imported data has the expected structure
      if (!data.timers || !Array.isArray(data.timers)) {
        alert('Invalid timer data format');
        return;
      }
      
      // Dispatch an action to replace state with imported data
      // Note: We'd need to create this action in the TimerSlice
      dispatch({ type: 'timers/importTimers', payload: data.timers });
      
      // Show success message
      alert('Timers imported successfully!');
    } catch (error) {
      alert(`Import failed: ${error.message}`);
    } finally {
      // Reset file input
      e.target.value = null;
    }
  };
  
  // Set up listener for save indicator
  useEffect(() => {
    const handleSaved = () => {
      setShowSaveIndicator(true);
      setTimeout(() => setShowSaveIndicator(false), 1000);
    };
    
    window.addEventListener('timer-state-saved', handleSaved);
    window.addEventListener('timer-snapshot-saved', handleSaved);
    
    return () => {
      window.removeEventListener('timer-state-saved', handleSaved);
      window.removeEventListener('timer-snapshot-saved', handleSaved);
    };
  }, []);
  
  return (
    <div className="timer-settings">
      <div className="settings-header">
        <h3>Settings</h3>
        {showSaveIndicator && <span className="save-indicator">Saved!</span>}
      </div>
      
      <div className="settings-option">
        <label>
          <input 
            type="checkbox" 
            checked={isAutoSaveEnabled} 
            onChange={toggleAutoSave} 
          />
          Auto-save timer snapshots
        </label>
      </div>
      
      {isAutoSaveEnabled && (
        <div className="settings-option interval-option">
          <label>
            Save every
            <select value={autoSaveInterval} onChange={changeAutoSaveInterval}>
              <option value="10">10 seconds</option>
              <option value="30">30 seconds</option>
              <option value="60">1 minute</option>
              <option value="300">5 minutes</option>
            </select>
          </label>
        </div>
      )}
      
      <div className="settings-actions">
        <button onClick={handleExport} className="export-btn">
          Export Timers
        </button>
        <button onClick={handleImportClick} className="import-btn">
          Import Timers
        </button>
        <input 
          type="file" 
          accept=".json" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          style={{ display: 'none' }} 
        />
      </div>
    </div>
  );
};

export default TimerSettings; 