const time = document.getElementById('time');
const timeFormat = document.getElementById('timeformat');

const showTime = () => {
    const date = new Date();
    let hr = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();

    const format = hr >= 12 ? 'PM' : 'AM';
    hr = hr % 12 || 12;

    const formattedHour = hr < 10 ? `0${hr}` : hr;
    const formattedMin = min < 10 ? `0${min}` : min;
    const formattedSec = sec < 10 ? `0${sec}` : sec;

    time.textContent = `${formattedHour}:${formattedMin}:${formattedSec}`;
    timeFormat.textContent = format;
};

showTime();
setInterval(showTime, 1000);
