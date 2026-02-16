// Get video ID from URL query parameter
const params = new URLSearchParams(window.location.search);
const videoId = params.get('video');

if (videoId) {
  const embedLink = `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1`;
  document.getElementById("videoArea").innerHTML =
    `<iframe src="${embedLink}" frameborder="0" allowfullscreen></iframe>`;
}

// --- TIMER FUNCTIONS ---
let time = localStorage.getItem('remainingTime') 
           ? parseInt(localStorage.getItem('remainingTime')) 
           : 25 * 60; // 25 minutes if no saved time

let timer;

function startTimer() {
  if (timer) return; // avoid multiple timers
  timer = setInterval(() => {
    time--;
    updateDisplay();
    localStorage.setItem('remainingTime', time); // keep updating
    if (time <= 0) clearInterval(timer);
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
  timer = null;
  time = 25 * 60;
  localStorage.setItem('remainingTime', time); // reset saved time
  updateDisplay();
}

function updateDisplay() {
  const minutes = Math.floor(time / 60).toString().padStart(2, '0');
  const seconds = (time % 60).toString().padStart(2, '0');
  document.getElementById("time").textContent = `${minutes}:${seconds}`;
}