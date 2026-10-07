// Variables to keep track of time
let seconds = 0;
let minutes = 0;
let hours = 0;

// Variable to hold the timer interval ID
let timerInterval = null;

// Function to update the stopwatch time display
function updateDisplay() {
  // Add leading zero if the number is single digit (e.g., 5 becomes "05")
  let h = hours < 10 ? "0" + hours : hours;
  let m = minutes < 10 ? "0" + minutes : minutes;
  let s = seconds < 10 ? "0" + seconds : seconds;

  // Display the formatted time string
  document.getElementById("display").innerText = h + ":" + m + ":" + s;
}

// Function to start the stopwatch
function startTimer() {
  // If the timer is not already running, start it
  if (timerInterval === null) {
    timerInterval = setInterval(function () {
      seconds++;

      // Convert 60 seconds to 1 minute
      if (seconds === 60) {
        seconds = 0;
        minutes++;
      }

      // Convert 60 minutes to 1 hour
      if (minutes === 60) {
        minutes = 0;
        hours++;
      }

      // Update the screen display
      updateDisplay();
    }, 1000); // Runs every 1 second (1000 milliseconds)
  }
}

// Function to stop/pause the stopwatch
function stopTimer() {
  clearInterval(timerInterval); // Stop the interval
  timerInterval = null; // Reset interval variable
}

// Function to reset the stopwatch to 00:00:00
function resetTimer() {
  stopTimer(); // First, stop the timer if running
  
  // Reset time variables back to zero
  seconds = 0;
  minutes = 0;
  hours = 0;
  
  // Refresh display
  updateDisplay();
}