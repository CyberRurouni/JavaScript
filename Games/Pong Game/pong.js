import Ball from "./ball.js";
import Paddle from "./paddle.js";

/////////// Game Container
const gameContainer = document.querySelector(".game-container");

/////////// Ball
const ball = new Ball(document.querySelector(".ball"));
//////////// Paddles
const playerPaddle = new Paddle(document.querySelector(".paddle-left"));
const compPaddle = new Paddle(document.querySelector(".paddle-right"));

////////////// Score
const playerScore = document.querySelector(".score-1");
const compScore = document.querySelector(".score-2");

////// Custom Cursor
const cursor = document.createElement("div");
cursor.classList.add("cursor");
gameContainer.appendChild(cursor);

// Update cursor position
document.addEventListener("mousemove", (e) => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});

/////////// levels & Hover Message
const difficultyButtons = document.querySelectorAll(".difficulty-button");
let compPaddleSpeed = 0.009;
let selectedDifficulty = null;
const hoverMessage = document.createElement("div");
hoverMessage.classList.add("hover-message");
document.body.appendChild(hoverMessage);

difficultyButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const difficulty = button.dataset.difficulty;
    selectedDifficulty = difficulty;
    difficultyButtons.forEach((btn) => btn.classList.remove("selected"));
    button.classList.add("selected");
    startButton.disabled = false;
    switch (difficulty) {
      case "easy":
        compPaddleSpeed = 0.005;
        break;
      case "normal":
        compPaddleSpeed = 0.009;
        break;
      case "hard":
        compPaddleSpeed = 0.02;
        break;
      case "impossible":
        compPaddleSpeed = 1;
        break;
    }
    console.log(compPaddleSpeed);
  });
  button.addEventListener("mouseenter", () => {
    const message = button.dataset.message;
    hoverMessage.textContent = message;
    hoverMessage.style.opacity = "1";
    const rect = button.getBoundingClientRect();
    hoverMessage.style.left = `${rect.left + rect.width / 2}px`;
    hoverMessage.style.top = `${rect.top - 40}px`;
  });

  button.addEventListener("mouseleave", () => {
    hoverMessage.style.opacity = "0";
  });
});

/////// Game Starting and Ending functions & Variables
const startScreen = document.querySelector(".start-screen");
const startButton = document.querySelector(".start-button");
const playGuard = document.querySelector(".play-guard");
const endScreen = document.querySelector(".end-screen");
const winnerMessage = document.querySelector(".winner-message");
const restartButton = document.querySelector(".restart-button");
const cursorEl = document.querySelector(".cursor");
let isGameStarted = false;

const winNumber = document.querySelector(".win-number");
const valueText = document.querySelector(".value-text");
const gameInfo = document.querySelector(".game-info");
const sliderProgress = document.querySelector(".slider-progress");

const updateSlider = () => {
  const value = winNumber.value;
  const min = winNumber.min;
  const max = winNumber.max;
  const percentage = ((value - min) / (max - min)) * 100;

  // Update the progress bar width
  sliderProgress.style.width = `${percentage}%`;

  // Update the displayed values
  valueText.textContent = value;
  gameInfo.textContent = `First to ${value} points wins!`;
};

winNumber.addEventListener("input", updateSlider);
updateSlider(); // Initial state
const startGame = () => {
  if (selectedDifficulty) {
    startScreen.classList.add("hide");
    playGuard.style.display = "block";
    // cursorEl.style.display = "none";
    cursor.style.opacity = "0.5";

    ball.reset();
    lastRTime = null;
    isGameStarted = true;

    setTimeout(() => {
      window.requestAnimationFrame(gameLoop);
    }, 500);
  }
};

startButton.addEventListener("click", startGame);

const endGame = () => {
  playGuard.style.display = "none";
  cursor.style.opacity = "1";
  endScreen.classList.add("show");
  isGameStarted = false;
  if (parseInt(playerScore.textContent) === parseInt(winNumber.value)) {
    winnerMessage.textContent = "You Win!";
  } else {
    winnerMessage.textContent = "Computer Wins!";
  }
};

restartButton.addEventListener("click", () => {
  endScreen.classList.remove("show");
  startScreen.classList.remove("hide");
  playerScore.textContent = "0";
  compScore.textContent = "0";
  // startGame();
});

const checkScore = () => {
  if (
    parseInt(playerScore.textContent) === parseInt(winNumber.value) ||
    parseInt(compScore.textContent) === parseInt(winNumber.value)
  ) {
    endGame();
  }
};

/////////  Game Loop
let lastRTime = 0;
const MAX_DELTA_TIME = 50; // Maximum delta time to prevent large jumps

const gameLoop = (cTime) => {
  if (lastRTime !== null && isGameStarted) {
    // Limit delta time to prevent physics issues on lag
    const deltaTime = Math.min(cTime - lastRTime, MAX_DELTA_TIME);

    // Update ball position and handle collisions
    ball.move(deltaTime, [playerPaddle.rect(), compPaddle.rect()]);

    // Handle scoring
    ball.scoreIncrement(playerScore, compScore);
    checkScore();

    // Update game aesthetics
    const hue = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--hue")
    );
    document.documentElement.style.setProperty("--hue", hue + deltaTime * 0.01);

    // Update computer paddle
    if (compPaddleSpeed === 1) {
      compPaddle.position = ball.y;
    } else {
      compPaddle.moveCompPaddle(deltaTime, ball.y, compPaddleSpeed);
    }
  }

  lastRTime = cTime;

  if (isGameStarted) {
    window.requestAnimationFrame(gameLoop);
  }
};
/////// Paddle Movement
window.addEventListener("mousemove", (e) => {
  if (isGameStarted) {
    playerPaddle.position = (e.y / window.innerHeight) * 100;
  }
});
