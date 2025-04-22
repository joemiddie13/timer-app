/**
 * Loads the timer state from localStorage
 * @returns {Object|undefined} The parsed state or undefined if not found
 */
export const loadState = () => {
  try {
    const saved = localStorage.getItem("timers");
    return saved ? JSON.parse(saved) : undefined;
  } catch (e) {
    console.error("Load error:", e);
    return undefined;
  }
};

/**
 * Saves the timer state to localStorage
 * @param {Object} state - The state to save
 */
export const saveState = (state) => {
  try {
    const json = JSON.stringify(state);
    localStorage.setItem("timers", json);
    
    // Dispatch a custom event that we can listen for to show a visual indicator
    window.dispatchEvent(new CustomEvent('timer-state-saved'));
  } catch (e) {
    console.error("Save error:", e);
  }
};

/**
 * Exports the timer state as a JSON file for download
 * @param {Object} state - The state to export
 */
export const exportTimerData = (state) => {
  try {
    const json = JSON.stringify(state, null, 2); // Pretty print with 2-space indentation
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    // Create a temporary link and trigger the download
    const link = document.createElement('a');
    link.href = url;
    link.download = `timers-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (e) {
    console.error("Export error:", e);
  }
};

/**
 * Imports timer data from a JSON file
 * @param {File} file - The JSON file to import
 * @returns {Promise<Object>} A promise that resolves to the parsed timer data
 */
export const importTimerData = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        resolve(data);
      } catch (e) {
        reject(new Error("Invalid JSON file"));
      }
    };
    
    reader.onerror = () => reject(new Error("Error reading file"));
    reader.readAsText(file);
  });
}; 