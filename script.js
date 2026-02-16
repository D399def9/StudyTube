// Wait for the page to load
document.addEventListener("DOMContentLoaded", () => {
  const addButton = document.getElementById("addBtn");
  if (addButton) {
    addButton.addEventListener("click", addVideo);
  }

  // Initialize timer display
  updateDisplay();
});

// --- VIDEO FUNCTIONS ---
function addVideo() {
  let link = document.getElementById("videoLink").value.trim();
  let videoId = extractVideoID(link);

  if (!videoId) {
    alert("Invalid YouTube link");
    return;
  }

  // Save current timer state to localStorage
  localStorage.setItem('remainingTime', time);

  // Redirect to focused video page with video ID
  window.location.href = `index2.html?video=${videoId}`;
}

function extractVideoID(url) {
  const regExp =
    /^.*(youtu\.be\/|v\/|watch\?v=|embed\/)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

// --- TIMER FUNCTIONS ---
let time = 25 * 60; // 25 minutes
let timer;

function startTimer() {
  if (timer) return; // avoid multiple timers
  timer = setInterval(() => {
    time--;
    updateDisplay();
    if (time <= 0) clearInterval(timer);
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
  timer = null;
  time = 25 * 60;
  updateDisplay();
}

function updateDisplay() {
  const minutes = Math.floor(time / 60).toString().padStart(2, '0');
  const seconds = (time % 60).toString().padStart(2, '0');
  document.getElementById("time").textContent = `${minutes}:${seconds}`;
}