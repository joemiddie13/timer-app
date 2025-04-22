/**
 * Formats milliseconds into a human-readable time string
 * 
 * @param {number} ms - Milliseconds to format
 * @param {Object} options - Formatting options
 * @param {boolean} options.showHours - Always show hours even if zero (default: true)
 * @param {boolean} options.showMilliseconds - Include milliseconds in output (default: false)
 * @param {string} options.locale - Locale for number formatting (default: 'en-US')
 * @returns {string} Formatted time string (HH:MM:SS or MM:SS format)
 */
export function formatTime(ms, options = {}) {
  const {
    showHours = true,
    showMilliseconds = false,
    locale = 'en-US'
  } = options;

  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const milliseconds = ms % 1000;

  // Use Intl.NumberFormat for proper zero-padding with locale support
  const format = new Intl.NumberFormat(locale, { 
    minimumIntegerDigits: 2
  });
  
  let formattedTime = '';

  // Add hours if they exist or if showHours option is true
  if (hours > 0 || showHours) {
    formattedTime += `${format.format(hours)}:`;
  }

  // Always add minutes and seconds
  formattedTime += `${format.format(minutes)}:${format.format(seconds)}`;

  // Optionally add milliseconds
  if (showMilliseconds) {
    formattedTime += `.${Math.floor(milliseconds).toString().padStart(3, '0')}`;
  }

  return formattedTime;
}

/**
 * Formats milliseconds into a more human-readable format for display
 * like "2h 15m 30s" instead of "02:15:30"
 *
 * @param {number} ms - Milliseconds to format
 * @returns {string} Formatted time string like "2h 15m 30s"
 */
export function formatTimeHuman(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  
  if (hours > 0) {
    return `${hours}h ${minutes}m ${seconds}s`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  } else {
    return `${seconds}s`;
  }
} 