let time = 25 * 60;
let timer;

function updateDisplay() {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  document.getElementById("time").textContent =
    `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

function startTimer() {
  if (timer) return;

  timer = setInterval(() => {
    if (time > 0) {
      time--;
      updateDisplay();
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
  timer = null;
  time = 25 * 60;
  updateDisplay();
}

function saveNotes() {
  const notes = document.getElementById("notes").value;
  localStorage.setItem("studyNotes", notes);
  alert("Notes saved!");
}

window.onload = () => {
  const saved = localStorage.getItem("studyNotes");
  if (saved) document.getElementById("notes").value = saved;
  updateDisplay();
};