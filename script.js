// Wait for the page to load
document.addEventListener("DOMContentLoaded", () => {
  // Video Add Button
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

  let embedLink = `https://www.youtube.com/embed/${videoId}`;

  // Add the video iframe (CSS will handle size)
  document.getElementById("videoArea").innerHTML =
    `<iframe src="${embedLink}" frameborder="0" allowfullscreen></iframe>`;

  // Hide the input box container
  document.querySelector('.video-container').style.display = 'none';
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