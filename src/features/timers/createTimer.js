/**
 * Creates a new timer object with a unique ID and starting properties
 * 
 * @param {Object} options - Timer creation options
 * @param {string} options.label - Name of the timer
 * @param {string} options.color - Optional color for the timer
 * @param {string} options.notes - Optional notes about the timer
 * @param {string} options.category - Optional category for the timer
 * @returns {Object} A new timer object
 */
export function createTimer({
  label = "Untitled Timer",
  color = "#3498db",
  notes = "",
  category = "General"
} = {}) {
  // Using a more sophisticated ID generation approach
  // Still using Date.now() as the base but adding a random suffix for better uniqueness
  const id = `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  
  // Ensure category is never undefined
  const safeCategory = category || "General";
  
  return {
    id,
    label,
    color,
    notes,
    category: safeCategory,
    startTime: Date.now(),
    elapsed: 0,
    isRunning: true,
  };
} 