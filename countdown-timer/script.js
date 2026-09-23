const minutesInput = document.getElementById('minutesInput');
const secondsInput = document.getElementById('secondsInput');
const timeDisplay = document.getElementById('timeDisplay');
const startButton = document.getElementById('startButton');
const pauseButton = document.getElementById('pauseButton');
const resetButton = document.getElementById('resetButton');

let remainingSeconds = getInputSeconds();
let timerId = null;

function getInputSeconds() {
    const minutes = Number(minutesInput.value) || 0;
    const seconds = Number(secondsInput.value) || 0;
    return minutes * 60 + seconds;
}

function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function showTime() {
    timeDisplay.textContent = formatTime(remainingSeconds);
}

function startTimer() {
    if (timerId !== null || remainingSeconds === 0) {
        return;
    }

    timerId = setInterval(() => {
        remainingSeconds -= 1;
        showTime();

        if (remainingSeconds === 0) {
            clearInterval(timerId);
            timerId = null;
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerId);
    timerId = null;
}

function resetTimer() {
    pauseTimer();
    remainingSeconds = getInputSeconds();
    showTime();
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
minutesInput.addEventListener('change', resetTimer);
secondsInput.addEventListener('change', resetTimer);

showTime();
