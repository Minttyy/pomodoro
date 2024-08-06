const bells = new Audio("./sounds/bell.wav");
const startBtn = document.querySelector(".btn-start");
const pauseBtn = document.querySelector(".btn-pause");
const resetBtn = document.querySelector(".btn-reset");
const session = document.querySelector(".minutes");
let myInterval;
let state = true;
let isReset = false;
let isPaused = false;
let totalSeconds;

const updateSeconds = () => {
  const minuteDiv = document.querySelector(".minutes");
  const secondDiv = document.querySelector(".seconds");

  totalSeconds--;

  let minutesLeft = Math.floor(totalSeconds / 60);
  let secondsLeft = totalSeconds % 60;

  if (secondsLeft < 10) {
    secondDiv.textContent = "0" + secondsLeft;
  } else {
    secondDiv.textContent = secondsLeft;
  }
  minuteDiv.textContent = `${minutesLeft}`;

  if (minutesLeft === 0 && secondsLeft === 0) {
    bells.play();
    clearInterval(myInterval);
  }
};

const updateDisplay = () => {
  myInterval = setInterval(updateSeconds, 1000);
};

const runTimer = () => {
  const sessionAmount = Number.parseInt(session.textContent);
  isReset = false;
  document.querySelector(".btn-reset").style.display = "block";
  document.querySelector(".btn-pause").style.display = "block";
  document.querySelector(".btn-start").style.display = "none";

  if (state) {
    state = false;
    totalSeconds = sessionAmount * 60;
    updateDisplay();
  } else {
    clearInterval(myInterval);
    alert("Session has already started");
  }
};

const pauseTimer = () => {
  const minuteDiv = document.querySelector(".minutes");
  const secondDiv = document.querySelector(".seconds");

  if (!isPaused) {
    isPaused = true;
    clearInterval(myInterval);
    pauseBtn.textContent = "RESUME";
  } else {
    isPaused = false;
    pauseBtn.textContent = "PAUSE";
    updateDisplay();
  }
};

const resetTimer = () => {
  document.querySelector(".btn-start").style.display = "block";
  document.querySelector(".btn-pause").style.display = "none";

  if (!isReset) {
    const minuteDiv = document.querySelector(".minutes");
    const secondDiv = document.querySelector(".seconds");

    minuteDiv.textContent = "25";
    secondDiv.textContent = "00";

    myInterval = clearInterval(myInterval);
    state = true;
    isReset = true;
    document.querySelector(".btn-reset").style.display = "none";
  }
};

startBtn.addEventListener("click", runTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);
